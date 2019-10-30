import Vue from 'vue'
import axios from 'axios'

//取消请求
let CancelToken = axios.CancelToken
//设置默认请求头，如果不需要可以取消这一步

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded' //设置 为 formdata
// 请求超时的时间限制
axios.defaults.timeout = 20000;

// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体

axios.interceptors.request.use(config => {

    var getLocalData = localStorage.getItem('U_S'); // 读取字符串数据
    var jsonObj = JSON.parse(getLocalData);
    let token = jsonObj ? jsonObj['user_token'] : "";

    if (token) {
        config.headers.common['Authorization'] = token
    }

    /**
     *  把 form data 的数据转回对象
     *  传回
     */
    function getUrlVars(url) {
        var hash;
        var myJson = {};
        var hashes = url.toString().slice(url.toString().indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            myJson[hash[0]] = hash[1];
        }
        return myJson;
    }
    var jsObject = getUrlVars(config.data);
    /**
     *  得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
     *  如果没有 requestName 就默认添加一个 不同的时间戳
     */
    let requestName;
    if(config.method === 'post'){
        if(config.data && jsObject.requestName){
            requestName = jsObject.requestName
        }else{
            requestName = new Date().getTime()
        }
    }else{
        if(config.params && config.params.requestName){
            requestName = config.params.requestName
        }else{
            requestName = new Date().getTime()
        }
    }
    // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求

    if (requestName) {
        if (axios[requestName] && axios[requestName].cancel) {
            axios[requestName].cancel()
        }
        config.cancelToken = new CancelToken(c => {
            axios[requestName] = {};
            axios[requestName].cancel = c
        })
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 请求到结果的拦截处理
axios.interceptors.response.use(config => {

    if (config.data.code == 402 || config.data.code == 403) {
        localStorage.removeItem('U_S') // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
         window.location.href="/login/"

    } else if (config.data.data ? config.data.data.user_token : "") { // 判断token是否存在，如果存在说明需要更新token
        let str_jsonData = JSON.stringify(config.data.data);
        localStorage.setItem('U_S', str_jsonData); // 存储字符串数据到本地 覆盖原来的token(默认一天刷新一次)
    }
    // 返回请求正确的结果
    return config
}, error => {
    //错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
    window.console.log(error);

    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break
            case 401:
                error.message = '未授权，请重新登录'
                break
            case 403:
                error.message = '拒绝访问'
                break
            case 404:
                error.message = '请求错误,未找到该资源'
                break
            case 405:
                error.message = '请求方法未允许'
                break
            case 408:
                error.message = '请求超时'
                break
            case 500:
                error.message = '服务器端出错'
                break
            case 501:
                error.message = '网络未实现'
                break
            case 502:
                error.message = '网络错误'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网络超时'
                break
            case 505:
                error.message = 'http版本不支持该请求'
                break
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        error.message = "连接到服务器失败"
    }
    return Promise.reject(error.message)
})

// let base = "http://www.api.com/index.php";
   let base = "";

// 将axios 的 post 方法，绑定到 vue 实例上面的 $post
Vue.prototype.$post = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(base+url, params)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
            reject(err)
        })
    })
}
// 将axios 的 get 方法，绑定到 vue 实例上面的 $get
Vue.prototype.$get = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.get(base+url, {
            params: params
        }).then(res => {
            resolve(res.data) // 返回请求成功的数据 data
        }).catch(err => {
            reject(err)
        })
    })
}
// 请求示例
// requestName 为多余的参数 作为请求的标识，下次发起相同的请求，就会自动取消上一次还没有结束的请求
// 比如正常的请求参数只有一个 name: '123'，但是这里我们需要额外再加上一个 requestName
/**
 this.$post(url, { name: '123', requestName: 'post_1' })
 .then(res => {
            console.log(`请求成功：${res}`)
        })
 */

export default axios
