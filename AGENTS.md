# AGENTS.md

プロジェクト固有ルール:

- このリポジトリは、ZOOCHI アプリのユーザー向け静的ページを管理する。
- コピーとナビゲーションはユーザー向けに保つ。公開ページにリポジトリ事情や開発フローの詳細を出さない。
- 公開ページのロケールは、Etymo と同じ `en`, `ja`, `ko`, `zh-Hans`, `vi`, `id` に揃える。
- 公開ページを追加・変更するときは、タスクで明示されていない限り、すべてのロケール版を一緒に更新する。
- 言語切替、トップページへのリンク、フッターの戻り導線はロケール間で一貫させる。
- 公開パスを変更するときも、既存の `apps/*.html` リダイレクトページは残す。
- ビジュアルデザイン、レイアウト、CSS、コンポーネント styling、公開ページを変更するときは、先に `DESIGN.md` を読み、トークンとガイダンスに沿わせる。
- `assets/style.css` の共有デザイン値を変更するときは、デザインの source of truth を最新に保つため `DESIGN.md` も一緒に更新する。
- ページごとにスタイルを重複させず、共有スタイルはできるだけ `assets/style.css` に寄せる。
- 文書ページは、英語を `index.html`、その他のロケールを `index.<locale>.html` に置く。
- トップページは、日本語を `index.html`、英語を `index.en.html`、その他のロケールを `index.<locale>.html` に置く。
- `apps-src/*` は個別アプリの git submodule。変更するときは、その配下の `AGENTS.md` と `AI_AGENT_WEB_GUIDELINES.md` も読む。
- `apps-src/*` のツール UI を変更するときは、表示文言を `src/i18n.ts` の全ロケールで揃える。
- `apps-src/*` のツールはフロントエンド専用に保つ。バックエンド、認証、DB は明示要求がない限り追加しない。
- `apps-src/*` の公開配信は `npm run build:app-pages` の `/apps/<app-name>/` base path を前提にする。asset、canonical、OG、Twitter card、structured data、robots、sitemap の公開 URL を同じ subpath に揃える。
- ルートの GitHub Pages 用成果物は `scripts/build-pages.sh` が `.pages-dist` に生成する。`.pages-dist` と各アプリの `dist` は生成物として扱い、直接編集しない。
- 個別アプリを変更したら、そのアプリのディレクトリで `npm run lint`、`npm run test`、`npm run build` を可能な範囲で実行する。配信形まで確認する場合はルートで `./scripts/build-pages.sh` を実行する。
- ルート静的ページだけの確認は `python3 -m http.server 4173` で行う。配信成果物を確認するときは `python3 -m http.server 4173 --directory .pages-dist` を使う。
