import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  },
  build: {
    // Optimize chunks for better caching
    rollupOptions: {
      output: {
        // Separate vendor chunks for better caching
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ui': ['vue-toastification'],
          'fonts': ['./public/js/font-loader.js', './public/styles/fonts.css']
        },
        // Customize chunk filenames
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
            return 'assets/images/[name]-[hash][extname]';
          }
          
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          
          if (/\.(woff2?|ttf|eot)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Generate sourcemaps for production build
    sourcemap: true,
    // Minify output
    minify: 'terser',
    // Terser options
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    }
  },
  css: {
    // Enable CSS source maps
    devSourcemap: true,
    // Pre-processor options
    preprocessorOptions: {
      scss: {
        // Add any SCSS options if needed
      }
    }
  },
  // Resolve aliases for easier imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // Configure asset handling
  assetsInclude: ['**/*.woff2'],
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_NAME__: JSON.stringify('Faktur.web.id')
  }
})
