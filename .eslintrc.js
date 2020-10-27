module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: 'never',
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    'array-bracket-spacing': ['error', 'never'],
    'arrow-body-style': ['off', 'as-needed'],
    'block-spacing': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    complexity: ['error', 20],
    'computed-property-spacing': ['error', 'never'],
    'dot-notation': 'error',
    eqeqeq: ['error', 'always'],
    'func-names': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'linebreak-style': ['error', 'unix'],
    'max-depth': ['error', 5],
    'max-len': [
      'error',
      160,
      {
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true
      }
    ],
    'new-cap': [
      'error',
      {
        properties: false
      }
    ],
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-debugger': 'error',
    'no-inline-comments': 'off',
    'no-shadow': 'error',
    'no-undef': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'space-before-function-paren': ['error', 'never'],
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          balanced: true,
          exceptions: ['=']
        }
      }
    ]
  }
}
