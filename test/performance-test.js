// パフォーマンス最適化実装テスト
const fs = require('fs');
const path = require('path');

function testPerformanceOptimization() {
  console.log('🧪 パフォーマンス最適化実装テストを開始します...');
  
  const htmlFile = path.join(__dirname, '..', 'index.html');
  const styleFile = path.join(__dirname, '..', 'src', 'css', 'style.css');
  const jsFile = path.join(__dirname, '..', 'src', 'js', 'main.js');
  const fontsFile = path.join(__dirname, '..', 'src', 'css', 'fonts.css');
  
  let passCount = 0;
  let failCount = 0;

  // ファイル存在チェック
  if (!fs.existsSync(htmlFile) || !fs.existsSync(styleFile) || !fs.existsSync(jsFile)) {
    console.error('❌ FAIL: 必要なファイルが存在しません');
    return false;
  }

  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  const styleContent = fs.readFileSync(styleFile, 'utf8');
  const jsContent = fs.readFileSync(jsFile, 'utf8');
  const fontsContent = fs.readFileSync(fontsFile, 'utf8');

  const tests = [
    // フォント最適化
    {
      name: 'font-display: swap設定',
      test: () => fontsContent.includes('font-display: swap'),
      expected: true
    },
    {
      name: 'フォントプリロード設定',
      test: () => htmlContent.includes('rel="preload"') &&
                  htmlContent.includes('as="style"'),
      expected: true
    },
    {
      name: 'DNS prefetch設定',
      test: () => htmlContent.includes('rel="dns-prefetch"') &&
                  htmlContent.includes('fonts.googleapis.com'),
      expected: true
    },
    
    // 画像最適化
    {
      name: 'WebP画像対応（picture要素）',
      test: () => htmlContent.includes('<picture>') &&
                  htmlContent.includes('type="image/webp"'),
      expected: true
    },
    {
      name: '画像遅延読み込み設定',
      test: () => htmlContent.includes('loading="lazy"') ||
                  htmlContent.includes('loading="eager"'),
      expected: true
    },
    {
      name: '画像width・height属性設定',
      test: () => htmlContent.includes('width=') &&
                  htmlContent.includes('height='),
      expected: true
    },
    {
      name: 'レスポンシブ画像（srcset）',
      test: () => htmlContent.includes('srcset') ||
                  htmlContent.includes('sizes'),
      expected: true
    },
    
    // クリティカルCSS最適化
    {
      name: 'クリティカルCSSインライン化',
      test: () => htmlContent.includes('<style>') &&
                  htmlContent.includes('/* Critical') ||
                  htmlContent.includes('/* Above the fold'),
      expected: true
    },
    {
      name: '非クリティカルCSSの遅延読み込み',
      test: () => htmlContent.includes('media="print"') ||
                  htmlContent.includes('onload=') ||
                  htmlContent.includes('preload.*style'),
      expected: true
    },
    {
      name: 'CSS最小化対応',
      test: () => {
        // インラインCSSが最小化されているかチェック
        const inlineCSS = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/);
        if (inlineCSS && inlineCSS[1]) {
          const css = inlineCSS[1];
          // 最小化の兆候: 改行少ない、スペース削減
          const lineCount = css.split('\n').length;
          const hasMinifiedStyles = css.includes('{') && lineCount / css.length < 0.1;
          return hasMinifiedStyles;
        }
        return false;
      },
      expected: true
    },
    
    // リソースヒント最適化
    {
      name: 'preconnect設定（重要ドメイン）',
      test: () => htmlContent.includes('rel="preconnect"') &&
                  htmlContent.includes('crossorigin'),
      expected: true
    },
    {
      name: 'canonical URL設定',
      test: () => htmlContent.includes('rel="canonical"'),
      expected: true
    },
    {
      name: 'viewport meta設定（パフォーマンス考慮）',
      test: () => htmlContent.includes('viewport') &&
                  htmlContent.includes('initial-scale=1.0'),
      expected: true
    },
    
    // JavaScript最適化
    {
      name: 'JSモジュールタイプ指定',
      test: () => htmlContent.includes('type="module"'),
      expected: true
    },
    {
      name: 'パフォーマンス監視実装',
      test: () => jsContent.includes('PerformanceObserver') &&
                  jsContent.includes('Core Web Vitals') ||
                  jsContent.includes('vitals'),
      expected: true
    },
    {
      name: 'メモリ使用量監視',
      test: () => jsContent.includes('performance.memory') &&
                  jsContent.includes('usedJSHeapSize'),
      expected: true
    },
    
    // レイアウトシフト防止
    {
      name: '画像アスペクト比保持',
      test: () => styleContent.includes('aspect-ratio') ||
                  (htmlContent.includes('width=') && htmlContent.includes('height=')),
      expected: true
    },
    {
      name: 'フォント読み込み時のレイアウトシフト防止',
      test: () => styleContent.includes('font-loading') ||
                  styleContent.includes('font-loaded') ||
                  jsContent.includes('font-loading'),
      expected: true
    },
    
    // キャッシュ最適化
    {
      name: 'リソースキャッシュ戦略',
      test: () => htmlContent.includes('cache-control') ||
                  jsContent.includes('cache') ||
                  // Service Worker準備
                  jsContent.includes('serviceWorker'),
      expected: false // 現段階では未実装想定
    },
    
    // Core Web Vitals対応
    {
      name: 'FCP最適化（クリティカルリソース優先）',
      test: () => htmlContent.includes('preload') &&
                  htmlContent.includes('fonts') &&
                  htmlContent.includes('<style>'),
      expected: true
    },
    {
      name: 'LCP最適化（最大要素特定・最適化）',
      test: () => (htmlContent.includes('loading="eager"') ||
                   htmlContent.includes('fetchpriority="high"')) &&
                  htmlContent.includes('preload'),
      expected: true
    },
    {
      name: 'CLS最適化（レイアウト安定性）',
      test: () => htmlContent.includes('width=') &&
                  htmlContent.includes('height=') &&
                  styleContent.includes('aspect-ratio') ||
                  styleContent.includes('min-height'),
      expected: true
    },
    
    // ローディング状態管理
    {
      name: 'ローディングプレースホルダー実装',
      test: () => styleContent.includes('loading-placeholder') &&
                  styleContent.includes('animation') &&
                  styleContent.includes('pulse'),
      expected: true
    },
    {
      name: 'スケルトンスクリーン対応',
      test: () => styleContent.includes('skeleton') ||
                  styleContent.includes('loading-placeholder') &&
                  styleContent.includes('background'),
      expected: true
    },
    
    // パフォーマンス計測準備
    {
      name: 'Web Vitals計測準備',
      test: () => jsContent.includes('FCP') &&
                  jsContent.includes('LCP') &&
                  jsContent.includes('CLS') &&
                  jsContent.includes('FID'),
      expected: true
    },
    {
      name: 'パフォーマンス目標値設定',
      test: () => jsContent.includes('1800') || // FCP目標
                  jsContent.includes('2500') || // LCP目標
                  jsContent.includes('0.1') ||  // CLS目標
                  jsContent.includes('target'),
      expected: true
    },
    
    // 最適化された配信準備
    {
      name: 'gzip圧縮準備（ビルド設定）',
      test: () => {
        // package.jsonでビルド設定確認
        const packageFile = path.join(__dirname, '..', 'package.json');
        if (fs.existsSync(packageFile)) {
          const packageContent = fs.readFileSync(packageFile, 'utf8');
          return packageContent.includes('build') &&
                 packageContent.includes('vite');
        }
        return false;
      },
      expected: true
    },
    
    // エラー処理・フォールバック
    {
      name: 'パフォーマンス計測エラーハンドリング',
      test: () => jsContent.includes('try') &&
                  jsContent.includes('catch') &&
                  jsContent.includes('performance'),
      expected: true
    },
    {
      name: 'フォント読み込み失敗時のフォールバック',
      test: () => jsContent.includes('font') &&
                  jsContent.includes('catch') &&
                  jsContent.includes('fallback') ||
                  jsContent.includes('system fonts'),
      expected: true
    }
  ];

  tests.forEach(({ name, test, expected }) => {
    try {
      const result = test();
      if (result === expected) {
        console.log(`✅ PASS: ${name}`);
        passCount++;
      } else {
        console.log(`❌ FAIL: ${name} - expected: ${expected}, actual: ${result}`);
        failCount++;
      }
    } catch (error) {
      console.log(`❌ ERROR: ${name} - ${error.message}`);
      failCount++;
    }
  });
  
  console.log(`\n📊 パフォーマンス最適化テスト結果: ${passCount} passed, ${failCount} failed`);
  return failCount === 0;
}

// テスト実行
if (require.main === module) {
  const success = testPerformanceOptimization();
  process.exit(success ? 0 : 1);
}

module.exports = { testPerformanceOptimization };