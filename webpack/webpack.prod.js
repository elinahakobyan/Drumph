const { IgnorePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const generateImageLoaderConfig = require('../scripts/generate-image-loader-config');

const packageJson = require('../package.json');

const notBabelable = ['core-js', 'node-polyglot', 'webfontloader', '@babel/preset-env'];

const getBabelableModules = () =>
    [...Object.keys(packageJson.dependencies), '@pixi', '@pixi-spine', '@replayable']
        .filter((k) => !notBabelable.includes(k))
        .join('|');

module.exports = (network, defaultLoader) => {
    const commonConfigs = common(network, defaultLoader);

    return merge(commonConfigs, {
        module: {
            rules: [
                ...generateImageLoaderConfig(network),
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.(ts|js)x?$/,
                    exclude: new RegExp(`node_modules/(?!(${getBabelableModules()})/).*`),
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: { version: 3, proposals: true },
                                    targets: {
                                        browsers: ['ios_saf >= 10', 'and_chr >= 43'],
                                    },
                                    bugfixes: true,
                                    // debug: true,
                                },
                            ],
                            '@babel/preset-typescript',
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            ],
        },
    });
};
