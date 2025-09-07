# TASK-101: HTML構造実装 - 最小実装（Green）

## 実装の目的
テストが通る最小限のHTML構造を実装し、TDDのGreenフェーズを完了する。

## 実装内容

### 1. セマンティックHTML構造の実装
現在のindex.htmlを要件に従って更新し、以下の要素を実装：

- main要素の追加
- footer要素の追加  
- profile、projects、social sectionの追加
- 構造化データ（JSON-LD）の追加

### 2. SEOメタデータの強化
- 構造化データの実装
- メタデータの最適化

### 3. アクセシビリティ対応
- 適切な見出し階層
- ARIA属性の設定
- セマンティック要素の適切な使用

## 実装するHTML構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- 基本メタデータ -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="三浦陸のプロフィールサイト - Webデベロッパー">
  <meta name="keywords" content="三浦陸, Riku Miura, Webデベロッパー, フロントエンド, ポートフォリオ">
  <meta name="author" content="Riku Miura">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Riku Miura - Profile">
  <meta property="og:description" content="三浦陸のプロフィールサイト">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://rikumiura.com">
  <meta property="og:image" content="https://rikumiura.com/assets/images/og-image.jpg">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Riku Miura - Profile">
  <meta name="twitter:description" content="三浦陸のプロフィールサイト">
  <meta name="twitter:image" content="https://rikumiura.com/assets/images/og-image.jpg">
  
  <title>Riku Miura - Profile</title>
  
  <!-- Preload critical fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  
  <!-- 構造化データ -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "三浦陸",
    "alternateName": "Riku Miura", 
    "jobTitle": "Web Developer",
    "url": "https://rikumiura.com",
    "sameAs": [
      "https://github.com/riku-miura",
      "https://note.com/riku_miura",
      "https://zenn.dev/riku_miura",
      "https://twitter.com/riku_miura"
    ]
  }
  </script>
</head>
<body>
  <header>
    <nav role="navigation" aria-label="メインナビゲーション">
      <ul>
        <li><a href="#profile">プロフィール</a></li>
        <li><a href="#projects">成果物</a></li>  
        <li><a href="#social">SNS</a></li>
      </ul>
    </nav>
  </header>
  
  <main role="main">
    <!-- プロフィールセクション -->
    <section id="profile" aria-labelledby="profile-heading">
      <h1 id="profile-heading">三浦陸 (Riku Miura)</h1>
      <p>Webデベロッパー</p>
      <p>フロントエンドを中心とした開発を行っています。</p>
      <img src="/assets/images/profile.jpg" alt="三浦陸のプロフィール写真" loading="lazy">
    </section>
    
    <!-- 成果物セクション -->
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">成果物</h2>
      <div class="projects-grid">
        <article class="project-item">
          <h3>プロジェクト1</h3>
          <p>プロジェクトの説明です。</p>
          <a href="https://github.com/riku-miura/project1" rel="external">GitHub</a>
          <a href="/projects/project1/">詳細</a>
        </article>
      </div>
    </section>
    
    <!-- SNSセクション -->
    <section id="social" aria-labelledby="social-heading">
      <h2 id="social-heading">SNS</h2>
      <ul class="social-links">
        <li>
          <a href="https://note.com/riku_miura" rel="external">
            <img src="/assets/images/icons/note.svg" alt="note" loading="lazy">
            note
          </a>
        </li>
        <li>
          <a href="https://zenn.dev/riku_miura" rel="external">
            <img src="/assets/images/icons/zenn.svg" alt="Zenn" loading="lazy">
            Zenn
          </a>
        </li>
        <li>
          <a href="https://twitter.com/riku_miura" rel="external">
            <img src="/assets/images/icons/twitter.svg" alt="X (Twitter)" loading="lazy">
            X
          </a>
        </li>
      </ul>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2024 Riku Miura. All rights reserved.</p>
    <p>Built with modern web technologies.</p>
  </footer>

  <!-- Main JavaScript -->
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

この実装により以下のテストが通過するはずです：

✅ main要素の存在  
✅ footer要素の存在  
✅ profile sectionの存在  
✅ projects sectionの存在  
✅ social sectionの存在  
✅ 構造化データ（JSON-LD）の存在  

## 実装のポイント

### 1. セマンティック要素の適切な使用
- `<header>`: サイトヘッダー
- `<nav>`: ナビゲーション（role属性追加）
- `<main>`: メインコンテンツ（role属性追加）
- `<section>`: 論理的なセクション分割
- `<article>`: 独立したコンテンツ（プロジェクト項目）
- `<footer>`: サイトフッター

### 2. アクセシビリティ対応
- 適切な見出し階層（h1→h2→h3）
- ARIA属性の使用（role, aria-label, aria-labelledby）
- 画像のalt属性設定
- 外部リンクのrel="external"属性

### 3. SEO対応
- 構造化データ（JSON-LD形式）
- 適切なメタデータ
- セマンティックHTML構造

### 4. パフォーマンス対応
- 画像の遅延読み込み（loading="lazy"）
- フォントのpreconnect
- 外部リソースの最適化

この最小実装により、テストが通過し、要件を満たす基本的なHTML構造が完成します。