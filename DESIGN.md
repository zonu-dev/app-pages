---
version: alpha
name: ZOOCHI Static Pages
description: Design system for user-facing static pages and browser tool pages in the ZOOCHI app family.
colors:
  primary: "#38bdf8"
  secondary: "#34d399"
  tertiary: "#6366f1"
  neutral: "#f4f7f9"
  background: "#f4f7f9"
  background-dot: "#94a3b8"
  surface: "#ffffff"
  surface-soft: "#f8fafc"
  surface-dark: "#1e293b"
  text: "#1e293b"
  text-strong: "#0f172a"
  muted: "#64748b"
  muted-light: "#94a3b8"
  line: "#cbd5e1"
  line-hover: "#475569"
  on-dark: "#ffffff"
  home-accent: "#38bdf8"
  home-accent-deep: "#0f172a"
  home-soft: "#e0f2fe"
  home-soft-border: "#bae6fd"
  home-ink: "#0369a1"
  rooted-accent: "#34d399"
  rooted-accent-deep: "#047857"
  rooted-soft: "#ecfdf5"
  rooted-soft-border: "#bbf7d0"
  rooted-ink: "#047857"
  spacepin-accent: "#6366f1"
  spacepin-accent-deep: "#4f46e5"
  spacepin-soft: "#eef2ff"
  spacepin-soft-border: "#c7d2fe"
  spacepin-ink: "#4f46e5"
  auto-accent: "#fb923c"
  auto-accent-deep: "#ea580c"
  auto-soft: "#fff7ed"
  auto-soft-border: "#fed7aa"
  auto-ink: "#ea580c"
  palette-accent: "#8b5cf6"
  palette-accent-deep: "#7c3aed"
  palette-soft: "#f5f3ff"
  palette-soft-border: "#ddd6fe"
  palette-ink: "#6d28d9"
  stealth-accent: "#3b6270"
  stealth-accent-deep: "#233744"
  stealth-soft: "#e3ecf1"
  stealth-soft-border: "#9eb5c0"
  stealth-ink: "#233744"
  champions-accent: "#3ba8ff"
  amber: "#fbbf24"
  marshmallow-pink: "#ff80a1"
  danger: "#dc2626"
typography:
  display-lg:
    fontFamily: Zen Maru Gothic
    fontSize: 48px
    fontWeight: 900
    lineHeight: "1.08"
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Zen Maru Gothic
    fontSize: 36px
    fontWeight: 900
    lineHeight: "1.12"
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Zen Maru Gothic
    fontSize: 24px
    fontWeight: 900
    lineHeight: "1.15"
    letterSpacing: -0.03em
  title-md:
    fontFamily: Zen Maru Gothic
    fontSize: 20px
    fontWeight: 900
    lineHeight: "1.3"
  body-md:
    fontFamily: Zen Maru Gothic
    fontSize: 16px
    fontWeight: 700
    lineHeight: "1.7"
  body-sm:
    fontFamily: Zen Maru Gothic
    fontSize: 14px
    fontWeight: 700
    lineHeight: "1.55"
  label-md:
    fontFamily: Zen Maru Gothic
    fontSize: 14px
    fontWeight: 900
    lineHeight: "1"
    letterSpacing: 0.02em
  caption:
    fontFamily: Zen Maru Gothic
    fontSize: 12px
    fontWeight: 700
    lineHeight: "1.45"
rounded:
  xs: 6px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 40px
  full: 999px
spacing:
  micro: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  section: 40px
  page-y: 48px
  container-home: 896px
  container-document: 768px
components:
  page-body:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
  hero-title:
    textColor: "{colors.text-strong}"
    typography: "{typography.display-lg}"
  app-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xxl}"
    padding: "{spacing.sm}"
  app-card-hero:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
  status-panel:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  action-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.line-hover}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  action-button-home-hover:
    backgroundColor: "{colors.home-accent}"
    textColor: "{colors.on-dark}"
  action-button-rooted-hover:
    backgroundColor: "{colors.rooted-accent}"
    textColor: "{colors.text-strong}"
  action-button-spacepin-hover:
    backgroundColor: "{colors.spacepin-accent}"
    textColor: "{colors.on-dark}"
  action-button-auto-hover:
    backgroundColor: "{colors.auto-accent}"
    textColor: "{colors.text-strong}"
  action-button-palette-hover:
    backgroundColor: "{colors.palette-accent}"
    textColor: "{colors.on-dark}"
  action-button-stealth-hover:
    backgroundColor: "{colors.stealth-accent}"
    textColor: "{colors.on-dark}"
  language-switcher:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  language-current-home:
    backgroundColor: "{colors.home-accent}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
  document-shell:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.xxl}"
    padding: "{spacing.xxl}"
  document-section-badge:
    backgroundColor: "{colors.home-accent}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
  theme-chip-home:
    backgroundColor: "{colors.home-soft}"
    textColor: "{colors.home-ink}"
    rounded: "{rounded.md}"
  theme-chip-rooted:
    backgroundColor: "{colors.rooted-soft}"
    textColor: "{colors.rooted-ink}"
    rounded: "{rounded.md}"
  theme-chip-spacepin:
    backgroundColor: "{colors.spacepin-soft}"
    textColor: "{colors.spacepin-ink}"
    rounded: "{rounded.md}"
  theme-chip-auto:
    backgroundColor: "{colors.auto-soft}"
    textColor: "{colors.auto-ink}"
    rounded: "{rounded.md}"
  theme-chip-palette:
    backgroundColor: "{colors.palette-soft}"
    textColor: "{colors.palette-ink}"
    rounded: "{rounded.md}"
  theme-chip-stealth:
    backgroundColor: "{colors.stealth-soft}"
    textColor: "{colors.stealth-ink}"
    rounded: "{rounded.md}"
  contact-panel:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.xxl}"
    padding: "{spacing.xxl}"
  contact-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
---

# ZOOCHI Static Pages Design System

## Overview

ZOOCHI の公開ページは、明るいライトテーマ、丸い面、太い文字、短い段差影で構成する。業務システム風の無機質さではなく、親しみがあり少しおもちゃ的な UI を保つ。

デザインの主役は、薄いドット背景、白いカード面、はっきりした境界線、プロダクトごとのアクセント色である。ページごとの差分は色と文言で出し、骨格やコンポーネント文法は変えない。

公開ページのコピーは常にユーザー向けにする。リポジトリ名、内部実装、開発フロー、localhost 限定 UI などの開発事情をページ本文に出さない。

## Colors

基本面はニュートラルで固定する。`background` は薄いブルーグレー、`surface` は白、`surface-soft` はカード内の補助面、`surface-dark` は問い合わせフッターなどの締め色に使う。

製品差分は `*-accent`, `*-accent-deep`, `*-soft`, `*-soft-border`, `*-ink` の 5 点セットで管理する。通常本文や大きな面にアクセント色を広げすぎず、主に次の場所で使う。

- ブランドピル、番号バッジ、ステータス、タグの淡色面
- アプリバッジや小さな装飾面
- CTA やリストリンクの hover / active 状態
- フォーカスや選択状態の控えめな補助色

CTA は通常時に白基調を保つ。常時ベタ塗りの強いボタンを並べず、hover 時だけテーマ色へ反転させる。

## Typography

ベースフォントは `Zen Maru Gothic`。見出しは `900`、本文は `700` を基準にし、軽いウェイトで細く見せない。

見出しは短く、説明を詰め込まない。トップページの大見出し、アプリ名、文書タイトルは丸い書体でも締まって見えるように太く組む。本文は行間を広めに取り、1 から 2 行で要点を言い切る。

ボタン、バッジ、ステータスなどの小さな文字は `label-md` または `caption` を使い、可読性を優先して十分な太さを持たせる。

## Layout

全体は 1 カラム中心で、横幅は狭めに保つ。トップページの最大幅は `container-home`、文書ページの最大幅は `container-document` を基準にする。

余白は `16`, `20`, `24`, `32`, `40` のリズムを使う。320px 幅でも横スクロールを出さない。モバイルは 1 カラム、広い画面では必要に応じて 2 カラムにする。

文書ページは `document-toolbar`, `document-header`, `document-shell`, `doc-footer` の順に置く。文書本文は大きな白カード 1 枚にまとめ、セクションごとに番号バッジと見出しを並べる。

ツールページは first screen に収まる情報量を優先する。PC では「設定 + プレビュー」の 2 カラムを基本にし、モバイルでは短く整理された 1 カラムにする。設定カードを増やしすぎず、segmented control、2 列グリッド、横スクロール可能な一覧などで密度を調整する。

## Elevation & Depth

奥行きはぼかした大きな影ではなく、短い段差影で作る。カードは `0 6px 0 var(--shadow)`、ボタンは `0 4px 0 var(--button-shadow)` を基準にする。

押下時は `translateY(4px)` で沈ませ、影を消す。hover 時は `translateY(-1px)` から `translateY(-2px)` 程度に留める。長いフェード、大きい移動、重いドロップシャドウは使わない。

背景は `background` にドット状の radial gradient を重ね、さらに淡い白グラデーションを `body::before` で重ねる。背景は主張させすぎず、カード面と本文を主役にする。

## Shapes

形は丸く、境界線ははっきりさせる。薄い 1px 線だけのフラット UI には寄せない。

- 言語切替、ピル、丸アイコン: `full`
- ボタン、ステータス、リストリンク: `md`
- アプリバッジ、補助カード、問い合わせリンク: `lg`
- カード外枠、文書シェル、濃色フッター: `xxl`

カード系は原則 `16px` 未満の角丸にしない。線は 2px から 3px を基準にし、極細線で区切らない。

## Components

### Language Switcher

公開ページの言語セットは `en`, `ja`, `ko`, `zh-Hans`, `vi`, `id` で揃える。選択肢の表示は言語コードのみとし、独自ドロップダウンに拡張する場合も native `select` を状態のソースとして残す。

見た目は白地のピル、左に丸い国旗、右に小さなシェブロン。通常時は `line` の枠と段差影、hover 時は neutral な枠色で統一する。

### App Cards

アプリカードは白面、3px ボーダー、太い角丸、短い段差影で作る。上部ヒーロー面は `surface-soft` を基本にし、左にアプリアイコンバッジ、右にアプリ名と短い説明を置く。

下部にはステータスパネルと action button を縦積みする。カードの並び順はモバイル 1 カラム時の表示順を基準にする。

### Action Buttons

通常時は白地、2px 枠、右端に丸い矢印アイコンを置く。hover 時だけ製品色へ反転し、ラベルを白または高コントラスト色へ切り替える。

ナビゲーション系の矢印は文字ではなく、CSS `mask-image` または inline SVG data URI で実装する。hover 時の右アイコンには短い `icon-rattle` を使ってよい。

### Document Pages

文書ヘッダーは CSS Grid で構成し、アイコンを左列、タイトルと日付を右列に置く。日付はラベルなしの小さな文字だけにする。

文書セクションは左に番号、右に見出しを置く。本文は少し下げて開始し、箇条書きは淡い面にまとめる。セクション間は `2px dashed rgba(148, 163, 184, 0.36)` の破線で区切る。

### Contact Areas

トップページの問い合わせは `surface-dark` の濃色面で締める。問い合わせリンクは白カードとして並べ、メールと Marshmallow を基本セットにする。

ツールページでは大きな濃色フッター面を無理に持ち込まなくてよい。本文の流れを邪魔しない軽いフッター行と、問い合わせモーダルで十分な場合がある。

### Tool Controls

フォーム、custom select、custom color picker、drag handle などは native control が持っていた主要機能を落とさない。custom select はキーボード操作、外側クリックで閉じる挙動、現在値表示を備える。

text input に button 用の段差影や押下演出を当てない。値を入力する面と、クリックして命令する面は見た目で区別する。

## Do's and Don'ts

- Do: 既存の `assets/style.css` と同じ CSS 変数、クラス文法、余白を再利用する
- Do: 新規公開ページでは全ロケールを同時に更新する
- Do: 製品差分はテーマ変数、アイコン、短いコピーで出す
- Do: `prefers-reduced-motion` を尊重し、動きは 0.6 秒以下に収める
- Do: PC と narrow viewport の両方で見た目を確認する
- Don't: ダークモード前提、ガラスモーフィズム、無彩色フラット UI に寄せる
- Don't: CTA を複数色のグラデーションボタンだらけにする
- Don't: 情報整理のためだけに薄い内側パネルを増やしすぎる
- Don't: 公開ページに開発者向け用語や内部事情を出す
- Don't: `?view=mobile` や localhost 限定 UI を本番レイアウト判定の唯一の根拠にする
