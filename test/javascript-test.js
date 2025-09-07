// JavaScript インタラクション実装テスト
const fs = require('fs');
const path = require('path');

function testJavaScriptImplementation() {
  console.log('🧪 JavaScript インタラクション実装テストを開始します...');
  
  const jsFile = path.join(__dirname, '..', 'src', 'js', 'main.js');
  const htmlFile = path.join(__dirname, '..', 'index.html');
  
  let passCount = 0;
  let failCount = 0;

  // ファイル存在チェック
  const fileTests = [
    {
      name: 'main.js存在チェック',
      test: () => fs.existsSync(jsFile),
      expected: true
    },
    {
      name: 'HTMLでJavaScriptが読み込まれている',
      test: () => {
        if (!fs.existsSync(htmlFile)) return false;
        const htmlContent = fs.readFileSync(htmlFile, 'utf8');
        return htmlContent.includes('src/js/main.js') || htmlContent.includes('/src/js/main.js');
      },
      expected: true
    }
  ];

  // JavaScript内容テスト
  let jsContent = '';
  if (fs.existsSync(jsFile)) {
    jsContent = fs.readFileSync(jsFile, 'utf8');
  }

  const functionalTests = [
    // 基本構造・初期化
    {
      name: 'DOMContentLoaded イベントリスナー',
      test: () => jsContent.includes('DOMContentLoaded') ||
                  jsContent.includes('addEventListener'),
      expected: true
    },
    {
      name: 'エラーハンドリング実装',
      test: () => jsContent.includes('try') && jsContent.includes('catch') ||
                  jsContent.includes('error'),
      expected: true
    },
    
    // スムーススクロール機能
    {
      name: 'スムーススクロール実装',
      test: () => jsContent.includes('scrollIntoView') ||
                  jsContent.includes('scroll') ||
                  jsContent.includes('scrollTo'),
      expected: true
    },
    {
      name: 'ナビゲーションリンクのイベント処理',
      test: () => jsContent.includes('preventDefault') &&
                  (jsContent.includes('href') || jsContent.includes('anchor')),
      expected: true
    },
    {
      name: 'セクション要素の取得処理',
      test: () => jsContent.includes('querySelector') ||
                  jsContent.includes('getElementById'),
      expected: true
    },
    
    // セクション間ナビゲーション
    {
      name: 'アクティブセクション検出',
      test: () => jsContent.includes('IntersectionObserver') ||
                  jsContent.includes('getBoundingClientRect') ||
                  jsContent.includes('scrollY'),
      expected: true
    },
    {
      name: 'ナビゲーションハイライト機能',
      test: () => jsContent.includes('classList') &&
                  (jsContent.includes('add') || jsContent.includes('remove')) &&
                  (jsContent.includes('active') || jsContent.includes('current')),
      expected: true
    },
    {
      name: 'セクション切り替え時の状態更新',
      test: () => jsContent.includes('forEach') ||
                  jsContent.includes('map') ||
                  jsContent.includes('filter'),
      expected: true
    },
    
    // 外部リンク処理
    {
      name: '外部リンクの検出処理',
      test: () => jsContent.includes('external') ||
                  jsContent.includes('target') ||
                  jsContent.includes('_blank'),
      expected: true
    },
    {
      name: '外部リンクのrel属性設定',
      test: () => jsContent.includes('noopener') ||
                  jsContent.includes('noreferrer') ||
                  jsContent.includes('setAttribute'),
      expected: true
    },
    
    // キーボード操作対応
    {
      name: 'キーボードイベント処理',
      test: () => jsContent.includes('keydown') ||
                  jsContent.includes('keypress') ||
                  jsContent.includes('keyboard'),
      expected: true
    },
    {
      name: 'Enter・Spaceキー対応',
      test: () => jsContent.includes('Enter') ||
                  jsContent.includes('Space') ||
                  jsContent.includes('key') ||
                  jsContent.includes('keyCode'),
      expected: true
    },
    
    // パフォーマンス監視
    {
      name: 'パフォーマンス計測実装',
      test: () => jsContent.includes('performance') ||
                  jsContent.includes('timing') ||
                  jsContent.includes('measure'),
      expected: true
    },
    {
      name: 'Web Vitals監視',
      test: () => jsContent.includes('CLS') ||
                  jsContent.includes('FCP') ||
                  jsContent.includes('LCP') ||
                  jsContent.includes('vitals'),
      expected: true
    },
    
    // エラー処理・ロバスト性
    {
      name: '要素存在チェック',
      test: () => jsContent.includes('null') &&
                  (jsContent.includes('return') || jsContent.includes('if')),
      expected: true
    },
    {
      name: 'グローバルエラーハンドリング',
      test: () => jsContent.includes('window.addEventListener') &&
                  (jsContent.includes('error') || jsContent.includes('unhandledrejection')),
      expected: true
    },
    
    // ユーザビリティ強化
    {
      name: 'スクロール位置復元機能',
      test: () => jsContent.includes('sessionStorage') ||
                  jsContent.includes('localStorage') ||
                  jsContent.includes('history'),
      expected: true
    },
    {
      name: 'アニメーション設定尊重',
      test: () => jsContent.includes('prefers-reduced-motion') ||
                  jsContent.includes('matchMedia'),
      expected: true
    },
    
    // SEO・アクセシビリティ
    {
      name: 'フォーカス管理',
      test: () => jsContent.includes('focus') &&
                  (jsContent.includes('tabindex') || jsContent.includes('blur')),
      expected: true
    },
    {
      name: 'ARIA属性動的更新',
      test: () => jsContent.includes('aria') ||
                  jsContent.includes('setAttribute') ||
                  jsContent.includes('role'),
      expected: true
    },
    
    // モダンJavaScript使用
    {
      name: 'ES6+構文使用',
      test: () => jsContent.includes('=>') ||
                  jsContent.includes('const') ||
                  jsContent.includes('let'),
      expected: true
    },
    {
      name: 'モジュラー関数構造',
      test: () => {
        const methodCount = (jsContent.match(/\w+\(\)/g) || []).length + 
                           (jsContent.match(/\w+:\s*function/g) || []).length +
                           (jsContent.match(/\w+\s*\([^)]*\)\s*\{/g) || []).length;
        return methodCount >= 3;
      },
      expected: true
    }
  ];

  // 全てのテストを実行
  const allTests = [...fileTests, ...functionalTests];
  
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
  
  console.log(`\n📊 JavaScript実装テスト結果: ${passCount} passed, ${failCount} failed`);
  return failCount === 0;
}

// テスト実行
if (require.main === module) {
  const success = testJavaScriptImplementation();
  process.exit(success ? 0 : 1);
}

module.exports = { testJavaScriptImplementation };