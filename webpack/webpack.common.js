const { DefinePlugin, IgnorePlugin } = require('webpack');

const generateDynamicModules = require('../scripts/generate-dynamic-modules');

const manifestJson = require('../manifest.json');

module.exports = (network, defaultLoader) => {
    const config = {
        entry: {
            playable: './src/index.ts',
        },
        plugins: [
            new DefinePlugin({
                __SPINE__: manifestJson.spine,
                __LEGOLOGGER__: manifestJson.legologger,
                ...generateDynamicModules(),
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader',
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: { mode: 'global' },
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    type: `asset/${defaultLoader}`,
                },
                {
                    test: /\.(woff)2?$/,
                    type: 'asset/inline',
                },
                {
                    test: /\.(mp3|m4a)$/,
                    type: `asset/${defaultLoader}`,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    };

    if (!manifestJson.spine) {
        config.plugins.push(
            new IgnorePlugin({
                checkResource: (resource) => resource.includes('pixi-spine'),
            }),
        );
    }

    if (!manifestJson.legologger) {
        config.plugins.push(
            new IgnorePlugin({
                checkResource: (resource) => resource.includes('@armathai/lego-logger'),
            }),
        );
    }

    return config;
};
