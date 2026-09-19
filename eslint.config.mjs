import eslint from '@eslint/js';

export default [
  eslint.configs.recommended,
  {
    files: ['src/**/*.mjs', 'spec/**/*.mjs', 'scripts/**/*.mjs', '*.mjs'],
    rules: {
      eqeqeq: 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
];
