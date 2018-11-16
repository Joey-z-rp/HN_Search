const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const server = {
    mode: 'development',
    devtool: 'eval-source-map',
    node: {
        __dirname: false,
    },
    target: 'node',
    entry: {
        server: './src/server/server.ts',
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'server.js',
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                include: [
                    path.resolve(__dirname, './src'),
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/assets/images',
                            outputPath: './public/images',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    externals: [
        /^\.\/assets\.json$/,
        nodeExternals({ whitelist: /\.(css|less|scss|sss)$/i }),
    ],
    plugins: [
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),
    ],
};

const client = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        client: ['babel-polyfill', './src/client/index.tsx'],
    },
    output: {
        path: path.resolve(__dirname, './build/public'),
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                include: [
                    path.resolve(__dirname, './src'),
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'postcss-loader',
                ],
                include: [
                    path.resolve(__dirname, './src'),
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                        },
                    },
                    'postcss-loader',
                ],
                include: [
                    path.resolve(__dirname, './node_modules'),
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'public/', to: './' },
        ], { debug: 'warning' }),
    ],
};

module.exports = [
    server,
    client,
];
