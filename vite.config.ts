import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        assetFileNames: (assetInfo) => 'assets/ba-logo-[name]-[hash][extname]',
        entryFileNames: 'assets/ba-logo-[name]-[hash].js',
        chunkFileNames: 'assets/ba-logo-[name]-[hash].js',
      },
    },
  },
});
