# Riku Miura - Profile Site

三浦陸の個人プロフィールサイトのソースコードです。

## 概要

- **サイト**: [rikumiura.com](https://rikumiura.com)
- **タイプ**: 静的サイト（HTML/CSS/JavaScript）
- **ホスティング**: AWS (S3 + CloudFront + Route53)
- **デザイン**: ミニマルフラットデザイン

## 特徴

- 📱 **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- ⚡ **高速表示**: CDN配信、画像最適化、パフォーマンス重視
- ♿ **アクセシビリティ**: WCAG準拠、キーボード操作対応
- 🎨 **ミニマルデザイン**: Inter/Noto Sans JP フォント、クリーンなレイアウト
- 🔍 **SEO最適化**: メタデータ、セマンティックHTML、構造化データ

## 技術構成

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox/Grid、CSS Custom Properties、レスポンシブ
- **JavaScript**: バニラJS、スムーススクロール、インタラクション制御

### 開発ツール
- **Vite**: ビルドツール、開発サーバー
- **ESLint**: JavaScript構文チェック
- **Stylelint**: CSS構文チェック  
- **Prettier**: コード整形
- **html-validate**: HTML検証

### インフラ（AWS）
- **S3**: 静的ホスティング
- **CloudFront**: CDN、HTTPS配信
- **Route53**: DNS管理

## ディレクトリ構成

```
/
├── src/                    # ソースファイル
│   ├── css/               # スタイルシート
│   │   ├── normalize.css  # ブラウザ標準化
│   │   ├── style.css     # メインスタイル
│   │   └── responsive.css # レスポンシブ対応
│   ├── js/               # JavaScript
│   │   ├── main.js       # メイン機能
│   │   └── smooth-scroll.js # スクロール制御
│   └── images/           # 画像リソース
│       ├── projects/     # プロジェクト画像
│       └── icons/        # アイコン
├── projects/             # サブディレクトリページ
├── docs/                 # ドキュメント
│   ├── design/          # 設計文書
│   └── tasks/           # タスク管理
├── dist/                # ビルド出力（本番用）
└── index.html           # メインページ
```

## 開発環境セットアップ

### 前提条件
- Node.js 18+
- npm 9+

### インストール

```bash
# リポジトリクローン
git clone https://github.com/riku-miura/personal_page.git
cd personal_page

# 依存関係インストール
npm install
```

### 開発サーバー起動

```bash
# Vite開発サーバー（推奨）
npm run dev

# または Python簡易サーバー
npm run serve
```

開発サーバーが起動したら [http://localhost:5173](http://localhost:5173) (Vite) または [http://localhost:8000](http://localhost:8000) (Python) にアクセス。

## ビルド・デプロイ

### ローカルビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果確認
npm run preview
```

### AWS デプロイ

```bash
# 本番デプロイ（AWS CLI設定済みの場合）
npm run deploy
```

**環境変数が必要**:
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFrontディストリビューションID

## 品質管理

### コード検証

```bash
# JavaScript構文チェック
npm run lint

# CSS構文チェック
npm run lint:css

# HTMLバリデーション
npm run validate:html

# コード整形
npm run format
```

### パフォーマンス目標

- First Contentful Paint < 1.5秒
- Largest Contentful Paint < 2.5秒  
- Cumulative Layout Shift < 0.1
- Total Blocking Time < 300ms

## ブラウザ対応

- Chrome/Edge: 最新2バージョン
- Firefox: 最新2バージョン
- Safari: 最新2バージョン
- モバイル: iOS Safari, Android Chrome

## ライセンス

MIT License

## 作者

**Riku Miura** (三浦陸)  
- Website: [rikumiura.com](https://rikumiura.com)
- Email: contact@rikumiura.com
- GitHub: [@riku-miura](https://github.com/riku-miura)

---

Generated with ❤️ using modern web technologies