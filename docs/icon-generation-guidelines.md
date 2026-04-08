# App Icon Generation Guidelines

ZOOCHI 系アプリのアイコンを画像生成 AI（Nano Banana 等）で作成する際のガイドライン。  
プロンプト設計、後処理、Apple Icon Composer への組み込みまでをカバーする。

## 前提

- 画像生成は Gemini の Nano Banana を使用（ワンプロンプト、ネガティブプロンプト非対応）
- Apple Icon Composer でレイヤー合成するため、シンボルのみ生成する
- iOS / macOS のアピアランスモード（Light / Dark / Tinted）対応を考慮する

## プロンプト設計の原則

### 1. 生成するのはシンボルだけ

Icon Composer で背景レイヤーは別途設定する。プロンプトには以下を必ず含める。

```
designed as a foreground symbol layer for Apple Icon Composer.
No app icon frame, no squircle shape.
Only the symbol elements centered on a plain solid gray (#808080) background with generous padding.
1024x1024 pixels.
```

- 背景は `#808080` の単色グレー。透過処理時に明暗どちらの要素も識別でき、色域選択で一発で抜ける
- squircle やアイコン枠は絶対に指定しない

### 2. スタイル指定

ZOOCHI のサイトデザインと統一するために、以下のスタイル指示を必ず含める。

```
Flat clean vector style suitable for SVG tracing, toy-like and friendly.
Not photorealistic, not skeuomorphic, no paper textures, no glossy reflections,
no gradients, no metallic effects, no actual readable text,
no watermarks, no sparkle decorations.
Use only thick rounded shapes and solid filled areas,
no outlines, no strokes, no border lines on any element.
```

#### やってはいけないスタイル指定

| 指定 | 問題 |
|---|---|
| `metallic` / `shiny` | 他のフラット要素と質感が不統一になる |
| `outline` / `stroke` / `border` | 枠線が中途半端に描かれるアーティファクトが頻発する |
| `thin lines` | Liquid Glass の光反射で潰れる |
| `gradient within cards` | グレースケール変換時に視認性が低下する |
| `realistic` / `skeuomorphic` | サイトのトイライクなトーンと合わない |

### 3. 色数を制限する

- シンボル内の色は 3〜4 色以内に明示的に指定する
- 各色の Hex コードをプロンプトに書く
- 背景色と同系色のアクセントは避ける（例: オレンジ背景にオレンジの鎖）

```
Keep the color count minimal: white, dark charcoal, and [accent color] only.
```

### 4. アピアランスモード対応

Apple HIG に準拠するため、以下を含める。

```
Ensure strong brightness contrast between all elements
so the design remains readable when converted to grayscale.
```

- Tinted モードではグレースケール化される。明度差がはっきりしないと潰れる
- 白（明）/ ダークチャコール（暗）/ アクセント色（中間）の 3 段階が理想

### 5. 構図とサイズ

- 正方形キャンバスに収まる構図にする。横長すぎ・縦長すぎは避ける
- `filling most of the canvas` や `fills at least 80 percent of the canvas area` で余白を抑制する
- 傾きが必要なら後処理で回転するほうが確実。プロンプトで `tilted` を指定すると全体のバランスが崩れやすい

## プロンプトテンプレート

```
[シンボルの具体的な描写], designed as a foreground symbol layer for Apple Icon Composer on a [背景色] background. [要素ごとの詳細な描写、色は Hex コード付き]. Use only thick rounded shapes and solid filled areas, no outlines, no strokes, no border lines on any element. Keep the color count minimal: [使用色の列挙] only. Ensure strong brightness contrast between all elements so the design remains readable when converted to grayscale. Flat clean vector style suitable for SVG tracing, toy-like and friendly. Not photorealistic, not skeuomorphic, no paper textures, no glossy reflections, no gradients, no metallic effects, no actual readable text, no watermarks, no sparkle decorations. No app icon frame, no squircle shape. Only the symbol elements centered on a plain solid gray (#808080) background with generous padding. 1024x1024 pixels.
```

## 生成後の後処理

### 1. 背景透過（defringe 付き）

単純な色域選択だとエッジにグレーのフリンジが残る。以下の defringe 処理を行う。

```python
from PIL import Image
import math

img = Image.open("input.png").convert("RGBA")
pixels = img.load()
w, h = img.size
bg = (128, 128, 128)

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        dist = math.sqrt((r - bg[0])**2 + (g - bg[1])**2 + (b - bg[2])**2)
        if dist < 45:
            pixels[x, y] = (0, 0, 0, 0)
        elif dist < 70:
            alpha_ratio = (dist - 45) / 25.0
            new_a = int(alpha_ratio * 255)
            if alpha_ratio > 0:
                nr = min(255, max(0, int((r - bg[0] * (1 - alpha_ratio)) / alpha_ratio)))
                ng = min(255, max(0, int((g - bg[1] * (1 - alpha_ratio)) / alpha_ratio)))
                nb = min(255, max(0, int((b - bg[2] * (1 - alpha_ratio)) / alpha_ratio)))
            else:
                nr, ng, nb = 0, 0, 0
            pixels[x, y] = (nr, ng, nb, new_a)

img.save("output.png")
```

- `dist < 45`: 背景として完全透明化
- `45 <= dist < 70`: エッジのアンチエイリアスピクセルを半透明化し、背景色成分を除去
- この処理により、どんな背景色に載せてもグレーの滲みが出ない

### 2. Nano Banana の透かし除去

Nano Banana は右下にキラキラマークの透かしを入れる。除去は限定的な領域のみ行い、シンボル本体を巻き込まないこと。

```python
# 右下隅の非常に限定的な領域のみ
for y in range(int(h * 0.88), h):
    for x in range(int(w * 0.85), w):
        r, g, b, a = pixels[x, y]
        if a > 0:
            pixels[x, y] = (0, 0, 0, 0)
```

- 範囲を広げすぎるとシンボルの白枠などを消してしまうので注意
- シンボルが右下に寄っている場合は、色判定を追加して本体を除外する

### 3. 色の差し替え

生成後にアクセント色を変更したい場合、色相で判定して置換する。

```python
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a > 0 and b > 180 and r < 120 and g > 100:  # 水色判定
            pixels[x, y] = (253, 224, 71, a)  # 黄色に差し替え
```

### 4. 回転

傾きはプロンプトではなく後処理で付ける。

```python
rotated = img.rotate(10, expand=True, resample=Image.BICUBIC, fillcolor=(0, 0, 0, 0))
```

- `expand=True` で回転後に切れないようにする
- `BICUBIC` で高品質リサンプリング
- 角度の目安: サイトのバッジが 3〜5 度。シンボル単体なら 5〜10 度程度

## 各アプリのカラー設定

| アプリ | テーマ色 | バッジ背景 | アクセント |
|---|---|---|---|
| Etymo | `#34d399` → `#059669` | 緑グラデーション | 緑 |
| Space Pin | `#6366f1` → `#4f46e5` | 紫青グラデーション | 赤（ピン） |
| Auto Image Layout | `#fb923c` → `#ea580c` | オレンジグラデーション | 黄 `#FDE047`（鎖・エフェクト） |
| Palette Pixelizer | `#a855f7` → `#9333ea` | 紫グラデーション | 未定 |

## 避けるべきアプローチ（過去の失敗から）

### 押しピンの表現

- 横から見た押しピンは「刺さっている感」を出すのが難しい。浮いた位置に描画されやすい
- 上から見た画鋲（丸）は通知バッジに見える
- **解決策**: 押しピンは小さめに、ノートの端に配置。位置の過度な指定は避けてAIに任せる

### ビフォーアフター構図

- 左→右の変換フロー図は横長になり、正方形アイコンに収まらない
- **解決策**: 結果の状態だけを見せる。プロセスではなく完成形

### 鎖リンクの向き

- `horizontal chain-link` と指定すると水平に描かれ、縦に並んだカードの接続に見えない
- **解決策**: `vertical chain-link ... oriented vertically connecting the top card to the bottom card, upright, not rotated or diagonal` と向きを明示

### 複数色の黄色

- 付箋の外枠・内面・テキスト線をすべて黄色系にすると、明度差がなくぼやける
- **解決策**: 外枠はテーマ色、内面は白〜クリーム、テキスト線はダークチャコール

## ファイル管理

- 生成元画像: `~/Downloads/` に Gemini が保存
- 透過処理済み: `/tmp/[AppName]_icon_transparent.png`
- 傾き付き: `/tmp/[AppName]_icon_tilted.png`
- サイト表示用: `assets/[app-name]-icon.png`
- Icon Composer 用: 各アプリリポジトリの `Support/` ディレクトリ
