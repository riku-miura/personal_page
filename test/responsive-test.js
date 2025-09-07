// レスポンシブレイアウト実装テスト
const fs = require('fs');
const path = require('path');

function testResponsiveImplementation() {
  console.log('🧪 レスポンシブレイアウト実装テストを開始します...');
  
  const styleFile = path.join(__dirname, '..', 'src', 'css', 'style.css');
  const htmlFile = path.join(__dirname, '..', 'index.html');
  
  let passCount = 0;
  let failCount = 0;

  // ファイル存在チェック
  if (!fs.existsSync(styleFile)) {
    console.error('❌ FAIL: style.css が存在しません');
    return false;
  }
  
  if (!fs.existsSync(htmlFile)) {
    console.error('❌ FAIL: index.html が存在しません');
    return false;
  }

  const styleContent = fs.readFileSync(styleFile, 'utf8');
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');

  const tests = [
    // ブレークポイント定義テスト
    {
      name: 'ブレークポイント変数定義',
      test: () => styleContent.includes('--breakpoint') || 
                  styleContent.includes('768px') &&
                  styleContent.includes('1024px') &&
                  styleContent.includes('1200px'),
      expected: true
    },
    
    // メディアクエリテスト
    {
      name: 'モバイル用メディアクエリ（768px未満）',
      test: () => styleContent.includes('@media') && 
                  (styleContent.includes('max-width: 767px') || 
                   styleContent.includes('max-width: 768px')),
      expected: true
    },
    {
      name: 'タブレット用メディアクエリ（768px-1023px）',
      test: () => styleContent.includes('@media') && 
                  (styleContent.includes('min-width: 768px') ||
                   styleContent.includes('1024px')),
      expected: true
    },
    {
      name: 'デスクトップ用メディアクエリ（1024px以上）',
      test: () => styleContent.includes('@media') && 
                  styleContent.includes('min-width: 1024px'),
      expected: true
    },
    
    // レイアウトシステムテスト
    {
      name: 'フレックスボックスレイアウト実装',
      test: () => styleContent.includes('display: flex') ||
                  styleContent.includes('display:flex'),
      expected: true
    },
    {
      name: 'グリッドレイアウト実装',
      test: () => styleContent.includes('display: grid') ||
                  styleContent.includes('display:grid') ||
                  styleContent.includes('grid-template'),
      expected: true
    },
    
    // コンテナとレイアウト
    {
      name: 'レスポンシブコンテナ実装',
      test: () => styleContent.includes('max-width') &&
                  styleContent.includes('margin') &&
                  styleContent.includes('auto'),
      expected: true
    },
    {
      name: 'レスポンシブパディング・マージン',
      test: () => styleContent.includes('padding') &&
                  styleContent.includes('@media'),
      expected: true
    },
    
    // Projects グリッドレイアウト
    {
      name: 'Projects セクションのグリッドレイアウト',
      test: () => styleContent.includes('.projects-grid') &&
                  (styleContent.includes('grid') || styleContent.includes('flex')),
      expected: true
    },
    {
      name: 'Projects カード レスポンシブ対応',
      test: () => styleContent.includes('.project-item') ||
                  styleContent.includes('project') &&
                  styleContent.includes('@media'),
      expected: true
    },
    
    // SNS セクションレイアウト
    {
      name: 'SNS セクションのフレックスレイアウト',
      test: () => styleContent.includes('.social-links') &&
                  styleContent.includes('flex'),
      expected: true
    },
    
    // 画像レスポンシブ対応
    {
      name: '画像レスポンシブ基本スタイル',
      test: () => styleContent.includes('img') &&
                  (styleContent.includes('max-width: 100%') ||
                   styleContent.includes('max-width:100%')),
      expected: true
    },
    {
      name: '画像のアスペクト比保持',
      test: () => styleContent.includes('img') &&
                  (styleContent.includes('height: auto') ||
                   styleContent.includes('height:auto')),
      expected: true
    },
    
    // タッチデバイス対応
    {
      name: 'タッチターゲットサイズ（最小44px）',
      test: () => styleContent.includes('44px') ||
                  styleContent.includes('2.75rem') ||
                  (styleContent.includes('min-height') &&
                   styleContent.includes('2.5rem')),
      expected: true
    },
    
    // ナビゲーション レスポンシブ
    {
      name: 'ナビゲーションのレスポンシブ対応',
      test: () => styleContent.includes('nav') &&
                  styleContent.includes('@media') &&
                  (styleContent.includes('flex-direction') ||
                   styleContent.includes('gap')),
      expected: true
    },
    
    // フォントサイズ レスポンシブ
    {
      name: 'レスポンシブタイポグラフィ（clamp使用）',
      test: () => styleContent.includes('clamp') ||
                  (styleContent.includes('h1') && styleContent.includes('@media')),
      expected: true
    },
    
    // レイアウトカラム設定
    {
      name: 'モバイル: 1カラムレイアウト確認',
      test: () => {
        // モバイルで1カラム（デフォルト）になっているかチェック
        return styleContent.includes('flex-direction: column') ||
               !styleContent.includes('grid-template-columns: repeat(3') ||
               styleContent.includes('@media');
      },
      expected: true
    },
    {
      name: 'タブレット: 2カラムレイアウト設定',
      test: () => styleContent.includes('grid-template-columns') &&
                  (styleContent.includes('repeat(2') ||
                   styleContent.includes('1fr 1fr')),
      expected: true
    },
    {
      name: 'デスクトップ: 3カラムレイアウト設定',
      test: () => styleContent.includes('grid-template-columns') &&
                  (styleContent.includes('repeat(3') ||
                   styleContent.includes('1fr 1fr 1fr')),
      expected: true
    },
    
    // HTML レスポンシブ画像対応
    {
      name: 'HTML: picture要素またはsrcset使用',
      test: () => htmlContent.includes('<picture>') ||
                  htmlContent.includes('srcset'),
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
  
  console.log(`\n📊 レスポンシブテスト結果: ${passCount} passed, ${failCount} failed`);
  return failCount === 0;
}

// テスト実行
if (require.main === module) {
  const success = testResponsiveImplementation();
  process.exit(success ? 0 : 1);
}

module.exports = { testResponsiveImplementation };