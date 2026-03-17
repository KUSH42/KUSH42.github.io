import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ThreeFinanceViz',
      fileName: (fmt) => `three-finance-viz.${fmt}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // Peer dependencies — consumers supply these
      external: ['three', 'three-stdlib', 'postprocessing', 'troika-three-text'],
      output: {
        globals: {
          three: 'THREE',
          'three-stdlib': 'ThreeStdlib',
          postprocessing: 'POSTPROCESSING',
          'troika-three-text': 'TroikaText',
        },
      },
    },
    target: 'es2020',
  },
  assetsInclude: ['**/*.glsl'],
});
