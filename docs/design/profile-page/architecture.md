# プロフィールページ アーキテクチャ設計

## システム概要
三浦陸の個人プロフィールサイト。成果物、SNSリンクを含む静的な1ページサイトをAWS上で配信する。

## アーキテクチャパターン
- **パターン**: Static Site Generation (SSG) + CDN配信
- **理由**: 
  - 静的コンテンツのため高速表示が可能
  - AWSインフラでスケーラブル且つ低コスト
  - SEO最適化が容易
  - メンテナンス性が高い

## インフラ構成

### AWS構成
```
[ユーザー] → [Route53] → [CloudFront] → [S3 Static Hosting]
```

**Route53 (DNS管理)**
- ドメイン: `rikumiura.com`
- DNS設定でCloudFrontディストリビューションにルーティング

**CloudFront (CDN + HTTPS)**
- HTTPS化
- 全世界エッジロケーションでキャッシュ配信
- 高速レスポンス & セキュリティ

**S3 (静的ホスティング)**
- 静的ファイル配置 (HTML, CSS, JS, 画像)
- サブディレクトリ方式対応 (`/project1`, `/project2`)

## フロントエンド アーキテクチャ

### 技術選定
- **HTML5**: セマンティックマークアップ
- **CSS3**: 
  - フレックスボックス/グリッドレイアウト
  - CSSカスタムプロパティ（CSS変数）
  - メディアクエリによるレスポンシブ対応
- **JavaScript**: 
  - バニラJS（軽量化優先）
  - スムーススクロール機能
  - インタラクション制御

### ファイル構成
```
/
├── index.html              # メインページ
├── css/
│   ├── normalize.css       # ブラウザ標準化
│   ├── style.css          # メインスタイル
│   └── responsive.css      # レスポンシブ対応
├── js/
│   ├── main.js            # メイン機能
│   └── smooth-scroll.js    # スクロール制御
├── images/
│   ├── profile.jpg        # プロフィール画像
│   ├── projects/          # プロジェクト画像
│   └── icons/             # アイコン
└── projects/               # サブディレクトリ
    ├── project1/
    └── project2/
```

## データ構造

### コンテンツ構成
1. **ヘッダーセクション**
   - 名前・肩書き
   - 簡単な自己紹介
   - プロフィール画像

2. **成果物セクション**
   - プロジェクト一覧
   - GitHubリンク
   - デモ・詳細ページリンク

3. **SNSセクション**
   - note, Zenn, X(Twitter)へのリンク
   - 各プラットフォームのアイコン

## デザインシステム

### 色彩設計
```css
:root {
  --primary-color: #000000;     /* 黒文字 */
  --background-color: #ffffff;  /* 白背景 */
  --accent-color: #666666;      /* グレーアクセント */
  --link-color: #0066cc;        /* リンク色 */
}
```

### タイポグラフィ
- **英語**: Inter フォント
- **日本語**: Noto Sans JP
- **階層**: H1-H3見出し + 本文
- **行間**: 1.6-1.8（可読性優先）

### レスポンシブ ブレークポイント
```css
/* モバイルファースト */
@media (min-width: 768px)  { /* タブレット */ }
@media (min-width: 1024px) { /* デスクトップ */ }
@media (min-width: 1200px) { /* 大画面 */ }
```

## パフォーマンス設計

### 最適化戦略
- **画像**: WebP形式 + 遅延読み込み
- **CSS**: クリティカルCSS インライン化
- **JavaScript**: 非同期読み込み
- **フォント**: font-display: swap
- **キャッシュ**: CloudFront長期キャッシュ

### 目標指標
- **First Contentful Paint**: < 1.5秒
- **Largest Contentful Paint**: < 2.5秒
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 300ms

## セキュリティ設計

### HTTPS配信
- CloudFrontによる強制HTTPS
- セキュリティヘッダー設定
- CSP (Content Security Policy) 実装

### プライバシー考慮
- 外部トラッキング最小化
- Cookie使用なし
- 個人情報の適切な取り扱い

## 運用・保守設計

### デプロイ戦略
```
[ローカル開発] → [Git Push] → [AWS CLI] → [S3同期] → [CloudFront無効化]
```

### 監視
- CloudWatch でアクセスログ監視
- Route53 ヘルスチェック
- CloudFront エラー監視

### バックアップ
- S3バージョニング有効化
- 定期的なコンテンツバックアップ