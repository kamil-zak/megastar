module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'consistent-return': 'off',
        'import/extensions': 'off',
        'no-underscore-dangle': 'off',
        'func-names': 'off',
    },
}
