#!/usr/bin/env bash
set -euo pipefail

BASE_REF="${VERSION_GUARD_BASE:-origin/main}"
HEAD_REF="${VERSION_GUARD_HEAD:-HEAD}"
APP_SUBMODULES=(
  "apps-src/auto-image-layout"
  "apps-src/palette-pixelizer"
)

if [[ "${BASE_REF}" =~ ^0+$ ]]; then
  BASE_REF="${HEAD_REF}^"
fi

if ! git rev-parse --verify "${BASE_REF}^{tree}" >/dev/null 2>&1; then
  echo "Base ref not found: ${BASE_REF}. Fetch origin/main or set VERSION_GUARD_BASE." >&2
  exit 1
fi

version_of() {
  local path="$1"
  local sha="$2"

  git -C "${path}" fetch --quiet origin "${sha}" 2>/dev/null || git -C "${path}" fetch --quiet origin main
  git -C "${path}" show "${sha}:package.json" | node -e "let input='';process.stdin.on('data',c=>input+=c);process.stdin.on('end',()=>console.log(JSON.parse(input).version));"
}

version_gt() {
  node - "$1" "$2" <<'NODE'
const current = process.argv[2].split('.').map(Number)
const base = process.argv[3].split('.').map(Number)

for (let index = 0; index < Math.max(current.length, base.length); index += 1) {
  const currentPart = current[index] ?? 0
  const basePart = base[index] ?? 0

  if (currentPart > basePart) {
    process.exit(0)
  }

  if (currentPart < basePart) {
    process.exit(1)
  }
}

process.exit(1)
NODE
}

is_release_file() {
  local file="$1"

  [[ "${file}" =~ ^src/ ]] ||
    [[ "${file}" =~ ^public/ ]] ||
    [[ "${file}" == "index.html" ]] ||
    [[ "${file}" == "vite.config.ts" ]] ||
    [[ "${file}" =~ ^tsconfig(\.[^.]+)?\.json$ ]]
}

has_release_changes() {
  local path="$1"
  local old_sha="$2"
  local new_sha="$3"
  local file=""

  git -C "${path}" fetch --quiet origin "${old_sha}" "${new_sha}" 2>/dev/null || git -C "${path}" fetch --quiet origin main

  while IFS= read -r file; do
    if is_release_file "${file}"; then
      return 0
    fi
  done < <(git -C "${path}" diff --name-only "${old_sha}" "${new_sha}")

  return 1
}

checked=0
failed=0

for path in "${APP_SUBMODULES[@]}"; do
  old_sha="$(git ls-tree "${BASE_REF}" "${path}" | awk '{print $3}')"
  if [[ -n "${VERSION_GUARD_HEAD:-}" ]]; then
    new_sha="$(git ls-tree "${HEAD_REF}" "${path}" | awk '{print $3}')"
  else
    new_sha="$(git -C "${path}" rev-parse HEAD)"
  fi

  if [[ -z "${old_sha}" || -z "${new_sha}" || "${old_sha}" == "${new_sha}" ]]; then
    continue
  fi

  if ! has_release_changes "${path}" "${old_sha}" "${new_sha}"; then
    echo "${path}: submodule changed without release-relevant files; version bump not required."
    continue
  fi

  checked=$((checked + 1))
  old_version="$(version_of "${path}" "${old_sha}")"
  new_version="$(version_of "${path}" "${new_sha}")"

  if version_gt "${new_version}" "${old_version}"; then
    echo "${path}: version bump verified ${old_version} -> ${new_version}"
  else
    echo "${path}: submodule changed without version bump (${old_version} -> ${new_version})" >&2
    failed=1
  fi
done

if [[ "${failed}" -ne 0 ]]; then
  echo "Bump the app package version before updating app-pages submodule pointers." >&2
  exit 1
fi

if [[ "${checked}" -eq 0 ]]; then
  echo "No versioned app submodule pointers with release-relevant changes changed."
fi
