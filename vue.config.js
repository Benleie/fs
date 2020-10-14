module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/oauth": {
        target: 'http://panos.zhikuntech.com', 
        changeOrigin: true
      },
    }
  }
}