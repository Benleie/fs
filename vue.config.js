module.exports = {
  devServer: {
    // 微信登录需要内网穿透
    disableHostCheck: true,
    proxy: {
      "/oauth": {
        target: 'http://panos.zhikuntech.com', 
        changeOrigin: true
      },
    }
  }
}