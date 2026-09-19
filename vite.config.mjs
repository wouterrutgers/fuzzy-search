import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/FuzzySearch.mjs',
      name: 'FuzzySearch',
      formats: ['es', 'umd'],
      fileName: format => format === 'es' ? 'FuzzySearch.mjs' : 'FuzzySearch.js',
    },
  },
});
