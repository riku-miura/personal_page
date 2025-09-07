# TASK-101: HTML構造実装 - テスト実装（Red）

## テスト実装の目的
実装前にテストを作成し、テストが失敗することを確認する。これによりテスト駆動開発のRedフェーズを実行する。

## HTML構造テストの実装

### テストスクリプトの作成

package.jsonにテストスクリプトを追加：

```json
{
  "scripts": {
    "test:html": "html-validate index.html",
    "test:a11y": "axe index.html",
    "test:structure": "node test/structure-test.js"
  }
}
```

### 基本構造テストの作成

test/structure-test.jsを作成：

```javascript
// 基本的なHTML構造テスト
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
      test: () => htmlContent.includes('<header>'),
      expected: true
    },
    {
      name: 'main要素',
      test: () => htmlContent.includes('<main>'),
      expected: true
    },
    {
      name: 'footer要素',
      test: () => htmlContent.includes('<footer>'),
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
```

### SEOメタデータテストの作成

test/seo-test.jsを作成：

```javascript
const fs = require('fs');
const path = require('path');

function testSEOMetadata() {
  console.log('🧪 SEOメタデータテストを開始します...');
  
  const htmlFile = path.join(__dirname, '..', 'index.html');
  
  if (!fs.existsSync(htmlFile)) {
    console.error('❌ FAIL: index.htmlが存在しません');
    return false;
  }
  
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  
  const tests = [
    {
      name: 'meta description',
      test: () => htmlContent.includes('meta name="description"'),
      expected: true
    },
    {
      name: 'meta keywords',
      test: () => htmlContent.includes('meta name="keywords"'),
      expected: true
    },
    {
      name: 'og:title',
      test: () => htmlContent.includes('property="og:title"'),
      expected: true
    },
    {
      name: 'og:description',
      test: () => htmlContent.includes('property="og:description"'),
      expected: true
    },
    {
      name: 'og:type',
      test: () => htmlContent.includes('property="og:type"'),
      expected: true
    },
    {
      name: 'og:url',
      test: () => htmlContent.includes('property="og:url"'),
      expected: true
    },
    {
      name: 'twitter:card',
      test: () => htmlContent.includes('name="twitter:card"'),
      expected: true
    },
    {
      name: '構造化データ (JSON-LD)',
      test: () => htmlContent.includes('application/ld+json'),
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
      console.log(`❌ FAIL: ${name}`);
      failCount++;
    }
  });
  
  console.log(`\n📊 SEOテスト結果: ${passCount} passed, ${failCount} failed`);
  return failCount === 0;
}

module.exports = { testSEOMetadata };
```

### アクセシビリティテストの作成

test/accessibility-test.jsを作成：

```javascript
const fs = require('fs');
const path = require('path');

function testAccessibility() {
  console.log('🧪 アクセシビリティテストを開始します...');
  
  const htmlFile = path.join(__dirname, '..', 'index.html');
  
  if (!fs.existsSync(htmlFile)) {
    console.error('❌ FAIL: index.htmlが存在しません');
    return false;
  }
  
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  
  const tests = [
    {
      name: 'h1要素の存在',
      test: () => {
        const h1Matches = htmlContent.match(/<h1>/g);
        return h1Matches && h1Matches.length === 1;
      },
      expected: true
    },
    {
      name: 'nav要素の存在',
      test: () => htmlContent.includes('<nav>'),
      expected: true
    },
    {
      name: 'main要素のrole属性',
      test: () => htmlContent.includes('role="main"') || htmlContent.includes('<main>'),
      expected: true
    },
    {
      name: 'img要素のalt属性（基本チェック）',
      test: () => {
        const imgWithoutAlt = htmlContent.match(/<img(?![^>]*alt=)/g);
        return !imgWithoutAlt || imgWithoutAlt.length === 0;
      },
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
      console.log(`❌ FAIL: ${name}`);
      failCount++;
    }
  });
  
  console.log(`\n📊 アクセシビリティテスト結果: ${passCount} passed, ${failCount} failed`);
  return failCount === 0;
}

module.exports = { testAccessibility };
```

### 統合テストスクリプト

test/all-tests.jsを作成：

```javascript
const { testHTMLStructure } = require('./structure-test');
const { testSEOMetadata } = require('./seo-test');
const { testAccessibility } = require('./accessibility-test');

function runAllTests() {
  console.log('🚀 HTML構造実装テストスイートを開始します...\n');
  
  const results = [];
  
  console.log('=== 基本構造テスト ===');
  results.push(testHTMLStructure());
  
  console.log('\n=== SEOメタデータテスト ===');
  results.push(testSEOMetadata());
  
  console.log('\n=== アクセシビリティテスト ===');
  results.push(testAccessibility());
  
  const allPassed = results.every(result => result === true);
  const passCount = results.filter(result => result === true).length;
  const totalTests = results.length;
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 総合結果: ${passCount}/${totalTests} テストスイート合格`);
  
  if (allPassed) {
    console.log('🎉 すべてのテストが合格しました！');
  } else {
    console.log('❌ 一部のテストが失敗しました');
  }
  
  return allPassed;
}

if (require.main === module) {
  const success = runAllTests();
  process.exit(success ? 0 : 1);
}

module.exports = { runAllTests };
```

## テストの実行と失敗確認

### 1. テストディレクトリとファイル作成