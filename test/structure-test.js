// HTML基本構造テスト
const fs = require('fs');
const path = require('path');

function testHTMLStructure() {
  console.log('🧪 HTML構造テストを開始します...');
  
  const htmlFile = path.join(__dirname, '..', 'index.html');
  
  // ファイル存在チェック
  if (!fs.existsSync(htmlFile)) {
    console.error('❌ FAIL: index.htmlが存在しません');
    return false;
  }
  
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  
  // 基本構造チェック
  const tests = [
    {
      name: 'DOCTYPE宣言',
      test: () => htmlContent.includes('<!DOCTYPE html>'),
      expected: true
    },
    {
      name: 'html要素のlang属性',
      test: () => htmlContent.includes('<html lang="ja">'),
      expected: true
    },
    {
      name: 'title要素',
      test: () => htmlContent.includes('<title>'),
      expected: true
    },
    {
      name: 'meta charset',
      test: () => htmlContent.includes('meta charset="UTF-8"'),
      expected: true
    },
    {
      name: 'meta viewport',
      test: () => htmlContent.includes('meta name="viewport"'),
      expected: true
    },
    {
      name: 'header要素',
      test: () => htmlContent.includes('<header') && htmlContent.includes('</header>'),
      expected: true
    },
    {
      name: 'main要素',
      test: () => htmlContent.includes('<main') && htmlContent.includes('</main>'),
      expected: true
    },
    {
      name: 'footer要素',
      test: () => htmlContent.includes('<footer') && htmlContent.includes('</footer>'),
      expected: true
    },
    {
      name: 'profile section',
      test: () => htmlContent.includes('id="profile"'),
      expected: true
    },
    {
      name: 'projects section',
      test: () => htmlContent.includes('id="projects"'),
      expected: true
    },
    {
      name: 'social section',
      test: () => htmlContent.includes('id="social"'),
      expected: true
    }
  ];
  
  let passCount = 0;
  let failCount = 0;
  
  tests.forEach(({ name, test, expected }) => {
    const result = test();
    if (result === expected) {
      console.log(`✅ PASS: ${name}`);
      passCount++;
    } else {
      console.log(`❌ FAIL: ${name} - expected: ${expected}, actual: ${result}`);
      failCount++;
    }
  });
  
  console.log(`\n📊 テスト結果: ${passCount} passed, ${failCount} failed`);
  return failCount === 0;
}

// テスト実行
if (require.main === module) {
  const success = testHTMLStructure();
  process.exit(success ? 0 : 1);
}

module.exports = { testHTMLStructure };