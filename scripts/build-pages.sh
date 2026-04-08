#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${ROOT_DIR}/.pages-dist"
AUTO_DIR="${ROOT_DIR}/apps-src/auto-image-layout"
PALETTE_DIR="${ROOT_DIR}/apps-src/palette-pixelizer"

rm -rf "${OUTPUT_DIR}"
mkdir -p "${OUTPUT_DIR}"

rsync -a \
  --delete \
  --exclude '.DS_Store' \
  --exclude '.git/' \
  --exclude '.github/' \
  --exclude '.pages-dist/' \
  --exclude 'apps-src/' \
  --exclude 'scripts/' \
  "${ROOT_DIR}/" "${OUTPUT_DIR}/"

touch "${OUTPUT_DIR}/.nojekyll"

build_app() {
  local app_dir="$1"
  local output_subdir="$2"

  npm ci --prefix "${app_dir}"
  npm run build:app-pages --prefix "${app_dir}"

  mkdir -p "${OUTPUT_DIR}/${output_subdir}"
  rsync -a --delete "${app_dir}/dist/" "${OUTPUT_DIR}/${output_subdir}/"
}

build_app "${AUTO_DIR}" "apps/auto-image-layout"
build_app "${PALETTE_DIR}" "apps/palette-pixelizer"
