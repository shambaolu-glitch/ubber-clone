module.exports = {
    root: true,
    extends: ['eslint-config-expo'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'react-native/no-inline-styles': 0,
        'react/react-in-jsx-scope': 'off',
    },
};