module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        "nativewind/babel",
        [
            'module-resolver',
            {
                alias: {
                    '@': './src',
                },
            },
        ],
        ["import", { libraryName: "@ant-design/react-native" }]
    ],
};
