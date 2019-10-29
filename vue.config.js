const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
let proxyHost = "http://www.api.com/index.php";
// let proxyHost = "http://192.168.1.145";
// let proxyHost = "http://192.168.1.51";
// let proxyHost = "http://www.api.com";
// let proxyHost = "http://e23004507c.imwork.net";
module.exports = {
    devServer: {
        host: "localhost",
        port: `5009`,
        // 代理链接配置
        proxy: {
            "/api": {
                target: proxyHost,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    },
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    configureWebpack: config=>{
          return {
              plugins:[new webpack.BannerPlugin({
                  banner:"hash:[hash],chunkhash:[chunkhash],filename:[name],author:'Haibo/Henry',time:"+new Date()
              }),
                  new CompressionWebpackPlugin({
                      filename: '[path].gz[query]',
                      algorithm: 'gzip',
                      test: new RegExp(
                          '\\.(' +
                          ['js', 'css'].join('|') +
                          ')$',
                      ),
                      threshold: 10240,
                      minRatio: 0.8,
                  }),
                  new UglifyJSPlugin({
                      cache:true
                  })
              ]
          }
      }
}
