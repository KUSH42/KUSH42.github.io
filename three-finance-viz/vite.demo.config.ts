import { defineConfig } from 'vite';

export default defineConfig({
  root: 'demo',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      'three-finance-viz': '/src/index.ts',
    },
  },
});
