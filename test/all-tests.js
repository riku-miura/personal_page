const { testHTMLStructure } = require('./structure-test');
const { testSEOMetadata } = require('./seo-test');

function runAllTests() {
  console.log('🚀 HTML構造実装テストスイートを開始します...\n');
  
  const results = [];
  
  console.log('=== 基本構造テスト ===');
  results.push(testHTMLStructure());
  
  console.log('\n=== SEOメタデータテスト ===');
  results.push(testSEOMetadata());
  
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