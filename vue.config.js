module.exports = {
    filenameHashing: false,
    productionSourceMap: false,
    chainWebpack: config => {
        config.optimization.splitChunks(false);
        config.module.rule('fonts').uses.clear();
        config.module.rule('fonts').use('url-loader').loader('url-loader');
    }
};
