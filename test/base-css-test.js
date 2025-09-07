// Base CSS実装テスト
const fs = require('fs');
const path = require('path');

function testBaseCSSImplementation() {
  console.log('🧪 Base CSS実装テストを開始します...');
  
  // CSS files paths
  const styleFile = path.join(__dirname, '..', 'src', 'css', 'style.css');
  const fontsFile = path.join(__dirname, '..', 'src', 'css', 'fonts.css');
  const normalizeFile = path.join(__dirname, '..', 'src', 'css', 'normalize.css');
  
  let passCount = 0;
  let failCount = 0;

  // ファイル存在チェック
  const fileTests = [
    {
      name: 'style.css存在チェック',
      test: () => fs.existsSync(styleFile),
      expected: true
    },
    {
      name: 'fonts.css存在チェック',
      test: () => fs.existsSync(fontsFile),
      expected: true
    },
    {
      name: 'normalize.css存在チェック',
      test: () => fs.existsSync(normalizeFile),
      expected: true
    }
  ];

  // CSS variables and design system tests
  let styleContent = '';
  if (fs.existsSync(styleFile)) {
    styleContent = fs.readFileSync(styleFile, 'utf8');
  }
  
  const cssTests = [
    // CSS Variables
    {
      name: 'CSS変数 - カラーパレット定義',
      test: () => styleContent.includes('--color-primary') && 
                  styleContent.includes('--color-text') &&
                  styleContent.includes('--color-background'),
      expected: true
    },
    {
      name: 'CSS変数 - タイポグラフィシステム',
      test: () => styleContent.includes('--font-size-base') &&
                  styleContent.includes('--line-height-base') &&
                  styleContent.includes('--font-weight'),
      expected: true
    },
    {
      name: 'CSS変数 - スペーシングシステム',
      test: () => styleContent.includes('--spacing') ||
                  styleContent.includes('--space'),
      expected: true
    },
    
    // Base styles
    {
      name: 'Box-sizing reset',
      test: () => styleContent.includes('box-sizing') && 
                  styleContent.includes('border-box'),
      expected: true
    },
    {
      name: 'Body基本スタイル',
      test: () => styleContent.includes('body') &&
                  styleContent.includes('font-family') &&
                  styleContent.includes('line-height'),
      expected: true
    },
    {
      name: 'フォーカス管理',
      test: () => styleContent.includes(':focus') &&
                  styleContent.includes('outline'),
      expected: true
    },
    
    // Typography system
    {
      name: 'heading要素のスタイリング',
      test: () => styleContent.includes('h1') &&
                  styleContent.includes('h2') &&
                  styleContent.includes('h3'),
      expected: true
    },
    {
      name: 'paragraph要素のスタイリング',
      test: () => styleContent.includes('p') &&
                  styleContent.includes('margin'),
      expected: true
    },
    
    // Link styles
    {
      name: 'リンクスタイル',
      test: () => styleContent.includes('a') &&
                  styleContent.includes('text-decoration'),
      expected: true
    },
    {
      name: 'ホバー・フォーカス状態',
      test: () => styleContent.includes(':hover') &&
                  styleContent.includes('transition'),
      expected: true
    },
    
    // Layout foundations
    {
      name: 'レイアウト基盤',
      test: () => styleContent.includes('main') &&
                  styleContent.includes('max-width'),
      expected: true
    },
    {
      name: 'セクション基本スタイル',
      test: () => styleContent.includes('section') &&
                  styleContent.includes('margin'),
      expected: true
    }
  ];

  // フォントテスト
  let fontsContent = '';
  if (fs.existsSync(fontsFile)) {
    fontsContent = fs.readFileSync(fontsFile, 'utf8');
  }
  
  const fontTests = [
    {
      name: 'Inter フォント読み込み',
      test: () => fontsContent.includes('Inter') &&
                  fontsContent.includes('@import'),
      expected: true
    },
    {
      name: 'Noto Sans JP フォント読み込み',
      test: () => fontsContent.includes('Noto Sans JP') &&
                  fontsContent.includes('@import'),
      expected: true
    },
    {
      name: 'フォント最適化設定',
      test: () => fontsContent.includes('font-display: swap'),
      expected: true
    }
  ];

  // 全てのテストを実行
  const allTests = [...fileTests, ...cssTests, ...fontTests];
  
  allTests.forEach(({ name, test, expected }) => {
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
  
  console.log(`\n📊 Base CSSテスト結果: ${passCount} passed, ${failCount} failed`);
  return failCount === 0;
}

// テスト実行
if (require.main === module) {
  const success = testBaseCSSImplementation();
  process.exit(success ? 0 : 1);
}

module.exports = { testBaseCSSImplementation };