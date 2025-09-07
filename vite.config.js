import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // 開発サーバー設定
  server: {
    port: 5173,
    host: true,
    open: true
  },
  
  // ビルド設定
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    
    // ファイルサイズ警告の閾値
    chunkSizeWarningLimit: 1000,
    
    // 最適化設定
    rollupOptions: {
      external: ['fsevents'],
      output: {
        // アセットファイル名の設定
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          
          // 画像ファイルは images フォルダへ
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          // フォントファイルは fonts フォルダへ
          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          // その他のアセット
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        // マニュアルチャンク設定
        manualChunks: {
          vendor: ['vite']
        }
      }
    },
    
    // Terser設定
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // CSS設定
  css: {
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    },
    devSourcemap: true
  },
  
  // プラグイン
  plugins: [
    // レガシーブラウザ対応
    legacy({
      targets: ['> 1%', 'last 2 versions', 'not dead', 'not ie 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  
  // アセット処理の設定
  assetsInclude: [
    '**/*.woff', 
    '**/*.woff2', 
    '**/*.ttf',
    '**/*.webp',
    '**/*.avif'
  ],
  
  // 静的アセット
  publicDir: 'public',
  
  // base path
  base: '/',
  
  // 環境変数
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },

  // 最適化設定
  optimizeDeps: {
    include: []
  }
});