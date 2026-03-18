import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    dedupe: ['three'],
  },
  optimizeDeps: {
    entries: [
      'src/index.html',
      'ring-reveal-demo.html',
      'ring-reveal-legacy.html',
      'ring-reveal-line2.html',
      'ring-reveal-compare.html',
    ],
    include: ['three', 'postprocessing',
      'three/addons/postprocessing/EffectComposer.js',
      'three/addons/postprocessing/RenderPass.js',
      'three/addons/postprocessing/UnrealBloomPass.js',
      'three/addons/postprocessing/OutputPass.js',
    ],
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
