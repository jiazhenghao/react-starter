module.exports = {
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: 'webpack.config.js'
      }
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true
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
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    semi: 0,
    'import/prefer-default-export': 'off',
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
    'arrow-parens': 0,
    'block-spacing': 'error',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    complexity: ['error', 20],
    'computed-property-spacing': ['error', 'never'],
    'consistent-return': 0,
    curly: 0,
    'dot-notation': 'error',
    eqeqeq: ['error', 'always'],
    'func-names': 'off',
    'import/newline-after-import': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'linebreak-style': 0,
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
    'nonblock-statement-body-position': 0,
    'no-array-constructor': 'error',
    'no-console': 0,
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-debugger': 'error',
    'no-inline-comments': 'off',
    'no-var': 'error',
    'no-shadow': 'error',
    'no-undef': 'error',
    'no-use-before-define': 0,
    'prefer-arrow-callback': 'error',
    'prefer-template': 0,
    'prefer-const': 'error',
    radix: 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'ts', 'tsx'] }
    ],
    'space-before-function-paren': 0,
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
