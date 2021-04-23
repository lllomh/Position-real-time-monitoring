Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// let proxyHost = "http://api.lllomh.com/";
// let proxyHost = "http://192.168.1.145";
// let proxyHost = "http://192.168.1.51";
let proxyHost = "http://api.lllomh.com";
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
            plugins: [new webpack.BannerPlugin({
                banner: "hash:[hash],chunkhash:[chunkhash],filename:[name],author:'芈渡/lllomh',E-mail:'lllomh@qq.com',time:" + (new Date()).format("yyyy-MM-dd hh:mm:ss")
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
                })
            ]
        }
    }
}
