import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    dedupe: ['three'],
  },
  optimizeDeps: {
    entries: ['src/index.html'],
    include: ['three'],
  },
  server: {
    open: '/src/index.html',
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html'),
      output: {
        manualChunks: {
          three: ['three'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
