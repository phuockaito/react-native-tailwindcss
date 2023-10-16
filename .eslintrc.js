module.exports = {
    root: true,
    extends: ['@react-native-community'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    overrides: [{
        files: ['*.ts', '*.tsx'],
        rules: {
            '@typescript-eslint/no-shadow': ['error'],
            'no-shadow': 'off',
            'no-undef': 'off'
        }
    }],
    "eslint.workingDirectories": [
        "./dir/containing/eslintrc_file",
    ]
};