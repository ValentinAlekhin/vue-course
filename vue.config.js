module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  css: {
    sourceMap: true,
  },
  configureWebpack: config => {
    config.devtool = 'source-map'
  },
}
