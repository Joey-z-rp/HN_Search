const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');

const commonConfig = require('./common');

const serverConfig = merge(commonConfig.server, {
    mode: 'development',
    devtool: 'eval-source-map',
});

const clientConfig = merge.smart(commonConfig.client, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }),
    ],
});

module.exports = [serverConfig, clientConfig];
