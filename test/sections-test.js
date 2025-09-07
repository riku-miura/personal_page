// セクション別スタイリング実装テスト
const fs = require('fs');
const path = require('path');

function testSectionsImplementation() {
  console.log('🧪 セクション別スタイリング実装テストを開始します...');
  
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
    // ヘッダーセクションスタイリング
    {
      name: 'ヘッダーセクションの基本スタイル',
      test: () => styleContent.includes('header') &&
                  styleContent.includes('sticky') &&
                  styleContent.includes('z-index'),
      expected: true
    },
    {
      name: 'ヘッダーの背景・ボーダースタイル',
      test: () => styleContent.includes('header') &&
                  (styleContent.includes('background') || styleContent.includes('border')),
      expected: true
    },
    
    // ナビゲーションスタイリング  
    {
      name: 'ナビゲーションのフレックスレイアウト',
      test: () => styleContent.includes('nav') &&
                  styleContent.includes('flex') &&
                  styleContent.includes('gap'),
      expected: true
    },
    {
      name: 'ナビゲーションリンクのスタイリング',
      test: () => styleContent.includes('nav a') &&
                  styleContent.includes('padding') &&
                  styleContent.includes('border-radius'),
      expected: true
    },
    {
      name: 'ナビゲーションホバー・フォーカス状態',
      test: () => styleContent.includes('nav a:hover') ||
                  styleContent.includes('nav a:focus'),
      expected: true
    },
    
    // プロフィールセクション
    {
      name: 'プロフィールセクションのセンタリング',
      test: () => styleContent.includes('#profile') &&
                  styleContent.includes('text-align: center'),
      expected: true
    },
    {
      name: 'プロフィール画像のスタイリング',
      test: () => styleContent.includes('#profile img') &&
                  styleContent.includes('border-radius') &&
                  styleContent.includes('shadow'),
      expected: true
    },
    {
      name: 'プロフィール画像のホバー効果',
      test: () => styleContent.includes('#profile img:hover') ||
                  (styleContent.includes('#profile img') && styleContent.includes('transition')),
      expected: true
    },
    
    // プロジェクト（成果物）セクション
    {
      name: 'プロジェクトカードのコンテナスタイル',
      test: () => styleContent.includes('.project-item') &&
                  styleContent.includes('background') &&
                  styleContent.includes('border'),
      expected: true
    },
    {
      name: 'プロジェクトカードの影効果',
      test: () => styleContent.includes('.project-item') &&
                  styleContent.includes('shadow'),
      expected: true
    },
    {
      name: 'プロジェクトカードのホバーアニメーション',
      test: () => styleContent.includes('.project-item:hover') &&
                  (styleContent.includes('transform') || styleContent.includes('shadow')),
      expected: true
    },
    {
      name: 'プロジェクトリンクのボタンスタイル',
      test: () => styleContent.includes('.project-links a') &&
                  styleContent.includes('background') &&
                  styleContent.includes('color'),
      expected: true
    },
    {
      name: 'プロジェクトリンクのホバー状態',
      test: () => styleContent.includes('.project-links a:hover') &&
                  styleContent.includes('background'),
      expected: true
    },
    
    // SNS（ソーシャル）セクション
    {
      name: 'ソーシャルリンクのフレックスレイアウト',
      test: () => styleContent.includes('.social-links') &&
                  styleContent.includes('flex'),
      expected: true
    },
    {
      name: 'ソーシャルリンクアイテムのスタイリング',
      test: () => styleContent.includes('.social-links a') &&
                  styleContent.includes('padding') &&
                  styleContent.includes('border'),
      expected: true
    },
    {
      name: 'ソーシャルリンクのホバー・フォーカス効果',
      test: () => styleContent.includes('.social-links a:hover') ||
                  styleContent.includes('.social-links a:focus'),
      expected: true
    },
    {
      name: 'ソーシャルアイコンのサイズ指定',
      test: () => styleContent.includes('.social-links img') &&
                  (styleContent.includes('width') || styleContent.includes('height')),
      expected: true
    },
    
    // フッターセクション
    {
      name: 'フッターセクションの基本スタイル',
      test: () => styleContent.includes('footer') &&
                  styleContent.includes('text-align'),
      expected: true
    },
    {
      name: 'フッターの背景・スペーシング',
      test: () => styleContent.includes('footer') &&
                  (styleContent.includes('background') || styleContent.includes('padding')),
      expected: true
    },
    
    // カードデザイン統一性
    {
      name: 'カードデザインの統一性 - border-radius',
      test: () => {
        const projectBorderRadius = styleContent.includes('.project-item') && styleContent.includes('border-radius');
        const socialBorderRadius = styleContent.includes('.social-links a') && styleContent.includes('border-radius');
        return projectBorderRadius && socialBorderRadius;
      },
      expected: true
    },
    {
      name: 'インタラクティブ要素の統一トランジション',
      test: () => {
        const transitionCount = (styleContent.match(/transition:/g) || []).length;
        return transitionCount >= 5; // 複数要素でトランジション使用
      },
      expected: true
    },
    
    // 色彩設計の統一性
    {
      name: 'プライマリカラーの一貫使用',
      test: () => {
        const primaryUsage = (styleContent.match(/var\(--color-primary/g) || []).length;
        return primaryUsage >= 3; // 複数箇所でプライマリカラー使用
      },
      expected: true
    },
    {
      name: 'テキストカラーの階層的使用',
      test: () => styleContent.includes('--color-text') &&
                  styleContent.includes('--color-text-secondary'),
      expected: true
    },
    
    // アクセシビリティ
    {
      name: 'フォーカス状態の視覚的識別',
      test: () => {
        const focusCount = (styleContent.match(/:focus/g) || []).length;
        return focusCount >= 4; // 複数要素でフォーカススタイル
      },
      expected: true
    },
    {
      name: 'セマンティック見出しのスタイル統一',
      test: () => styleContent.includes('h1') &&
                  styleContent.includes('h2') &&
                  styleContent.includes('h3'),
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
  
  console.log(`\n📊 セクション別スタイリングテスト結果: ${passCount} passed, ${failCount} failed`);
  return failCount === 0;
}

// テスト実行
if (require.main === module) {
  const success = testSectionsImplementation();
  process.exit(success ? 0 : 1);
}

module.exports = { testSectionsImplementation };