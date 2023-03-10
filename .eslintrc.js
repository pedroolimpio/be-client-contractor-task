module.exports = {
  root: true,
  extends: ['airbnb-base', 'loopback'],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  rules: {
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    eqeqeq: ['error', 'always'],
    radix: 'off',
    'arrow-parens': 0,
    'function-paren-newline': 0,
    'no-console': 0,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'prettier/prettier': 'error',
    'global-require': 1,
    'import/no-dynamic-require': 0,
    'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
    'object-curly-spacing': 0,
    camelcase: 'warn',
    'no-param-reassign': 'off',
    'operator-linebreak': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
  },
};
