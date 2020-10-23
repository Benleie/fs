module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title= '全景时光机'
      return args
    })
  },
  devServer: {
    // 微信登录需要内网穿透
    // disableHostCheck: true,
    proxy: {
      "/oauth": {
        // target: 'http://panos.zhikuntech.com', 
        target: "http://122.51.133.191:8989",
        changeOrigin: true
      },
      "/api": {
        target: "http://122.51.133.191:8989",
        // target: "http://192.168.1.22:8080",
        changeOrigin: true
      }
    }
  }
}