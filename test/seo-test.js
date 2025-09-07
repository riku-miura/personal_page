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
      test: () => htmlContent.includes('name="description"'),
      expected: true
    },
    {
      name: 'meta keywords',
      test: () => htmlContent.includes('name="keywords"'),
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