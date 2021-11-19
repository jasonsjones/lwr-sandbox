module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {}
    },
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'off'
    }
};
