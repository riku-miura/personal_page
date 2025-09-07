# TASK-101: HTML構造実装 - リファクタリング

## リファクタリングの目的
テストが通る状態を維持しながら、コードの品質・保守性・パフォーマンスを向上させる。

## リファクタリング項目

### 1. Critical CSS の最適化
現在のCSSをより効率的に整理し、クリティカルレンダリングパスを最適化する。

### 2. アクセシビリティの強化
ARIA属性の追加、スキップリンクの実装、フォーカス管理の改善。

### 3. SEO要素の強化
構造化データの詳細化、メタデータの最適化。

### 4. パフォーマンス最適化
画像の最適化、リソース読み込みの最適化。

## 実施するリファクタリング

### 1. CSSの構造化とパフォーマンス最適化

現在のインラインCSSを以下の様に最適化：

```html
<!-- Critical CSS - Above the fold content only -->
<style>
/* Reset & Base */
*,*::before,*::after{box-sizing:border-box}
*{margin:0;padding:0}
body{font:400 16px/1.6 'Inter','Noto Sans JP',sans-serif;color:#000;background:#fff}

/* Critical - Header & Navigation */
header{padding:1rem;background:#fff;border-bottom:1px solid #e0e0e0}
nav ul{list-style:none;display:flex;gap:2rem;margin:0;padding:0}
nav a{text-decoration:none;color:#000;font-weight:500}
nav a:hover,nav a:focus{color:#0066cc}

/* Critical - Main layout */
main{max-width:1200px;margin:0 auto;padding:2rem}
section{margin-bottom:4rem}

/* Critical - Typography */
h1{font:700 2.5rem/1.2 'Inter','Noto Sans JP',sans-serif;margin-bottom:1rem}
h2{font:600 2rem/1.3 'Inter','Noto Sans JP',sans-serif;margin-bottom:1.5rem}
h3{font:500 1.5rem/1.4 'Inter','Noto Sans JP',sans-serif;margin-bottom:1rem}
p{margin-bottom:1rem;line-height:1.7}

/* Critical - Focus styles */
:focus{outline:2px solid #0066cc;outline-offset:2px}
</style>

<!-- Preload non-critical CSS -->
<link rel="preload" href="/src/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/src/css/style.css"></noscript>
```

### 2. アクセシビリティ強化

```html
<!-- スキップリンクの追加 -->
<a href="#main-content" class="skip-link">メインコンテンツにスキップ</a>

<!-- より詳細なARIA属性 -->
<nav role="navigation" aria-label="メインナビゲーション">
  <ul role="list">
    <li role="listitem"><a href="#profile" aria-describedby="nav-profile">プロフィール</a></li>
    <li role="listitem"><a href="#projects" aria-describedby="nav-projects">成果物</a></li>  
    <li role="listitem"><a href="#social" aria-describedby="nav-social">SNS</a></li>
  </ul>
</nav>

<!-- landmark roleの明示 -->
<main role="main" id="main-content">
```

### 3. 構造化データの詳細化

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "三浦陸",
  "alternateName": "Riku Miura", 
  "jobTitle": "Web Developer",
  "description": "フロントエンドを中心とした開発を行うWebデベロッパー",
  "url": "https://rikumiura.com",
  "image": "https://rikumiura.com/assets/images/profile.jpg",
  "sameAs": [
    "https://github.com/riku-miura",
    "https://note.com/riku_miura",
    "https://zenn.dev/riku_miura", 
    "https://twitter.com/riku_miura"
  ],
  "knowsAbout": [
    "Web Development",
    "Frontend Development",
    "JavaScript",
    "React",
    "TypeScript",
    "HTML",
    "CSS"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "フリーランス"
  }
}
```

### 4. メタデータの最適化

```html
<!-- より詳細なメタデータ -->
<meta name="description" content="三浦陸のプロフィールサイト。フロントエンド開発を中心としたWebデベロッパーの成果物、技術記事、SNS情報をご紹介します。">
<meta name="keywords" content="三浦陸,Riku Miura,Webデベロッパー,フロントエンド,JavaScript,React,TypeScript,ポートフォリオ">

<!-- 追加のSEO要素 -->
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="googlebot" content="index, follow">
<link rel="canonical" href="https://rikumiura.com">

<!-- 言語設定 -->
<link rel="alternate" hreflang="ja" href="https://rikumiura.com">
<link rel="alternate" hreflang="x-default" href="https://rikumiura.com">
```

### 5. パフォーマンス最適化

```html
<!-- リソースヒント -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 重要リソースのプリロード -->
<link rel="preload" href="/assets/images/profile.webp" as="image" type="image/webp">
<link rel="preload" href="/src/css/fonts.css" as="style">

<!-- 画像の最適化 -->
<img src="/assets/images/profile.webp" 
     srcset="/assets/images/profile-150.webp 150w,
             /assets/images/profile-300.webp 300w,
             /assets/images/profile-450.webp 450w"
     sizes="(max-width: 768px) 150px, 300px"
     alt="三浦陸のプロフィール写真" 
     loading="eager"
     width="300" 
     height="300"
     decoding="async">
```

## リファクタリング後のテスト確認

リファクタリング実施後に以下を確認：

1. **既存テストの通過確認**
   ```bash
   npm run test
   ```

2. **HTMLバリデーション**
   ```bash
   npm run validate:html
   ```

3. **パフォーマンス測定**
   ```bash
   npm run build
   npm run preview
   # Lighthouse でパフォーマンススコア確認
   ```

4. **アクセシビリティ確認**
   - axe DevTools での自動チェック
   - キーボードナビゲーションの手動確認
   - スクリーンリーダーでの読み上げ確認

## リファクタリングの効果

### Before（リファクタリング前）
- CSSサイズ: 約3KB（インライン）
- Lighthouse Performance: 推定85-90
- Lighthouse Accessibility: 推定80-85
- Lighthouse SEO: 推定90-95

### After（リファクタリング後）
- Critical CSSサイズ: 約1KB（インライン）
- 非Critical CSS: 外部ファイル（キャッシュ可能）
- Lighthouse Performance: 目標95+
- Lighthouse Accessibility: 目標95+
- Lighthouse SEO: 目標95+

## 保守性の向上

1. **CSS分離**: インラインCSSを必要最小限に削減
2. **構造化**: セマンティックHTML構造の強化
3. **コメント**: 重要な部分にコメント追加
4. **モジュラー**: 再利用可能なコンポーネント構造

このリファクタリングにより、テスト通過を維持しながら、品質・パフォーマンス・保守性が大幅に向上する。