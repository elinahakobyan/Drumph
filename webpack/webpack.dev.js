const { merge } = require('webpack-merge');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const common = require('./webpack.common');

const getBabelableModules = () => ['@replayable'];

module.exports = (network, defaultLoader) =>
    merge(common(network, defaultLoader), {
        context: process.cwd(), // to automatically find tsconfig.json
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                eslint: { enabled: true, files: './src/**/*.{ts,js}' },
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                },
            }),
            new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
        ],
        module: {
            rules: [
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.(ts|js)x?$/,
                    exclude: new RegExp(`node_modules/(?!(${getBabelableModules()})/).*`),
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-typescript'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            ],
        },
        devtool: 'eval-cheap-module-source-map',
    });
