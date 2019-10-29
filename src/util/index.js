/**
 * 默认通用配置
 * @type {{pageConfig: {pageSize: number, dataCount: number}}}
 */
export const root = {
    pageConfig:{
        dataCount:0, // 初始化信息总条数
        pageSize:5,// 每页显示多少条
        page:1
    }
};

/**
 * 获取url参数
 * @param name
 * @returns {string | null}
 */
export function getUrlKey (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

/**
 * 打包后路由修正
 * @returns {string}
 */
export function urlRouter (){
    let urlRouters = ".html";
    if (process.env.NODE_ENV === "production") {
        // 为线上环境修改配置...
        urlRouters=""
    }

    return urlRouters

}

/**
 *获取路由地址路径
 * @returns {string}
 * @constructor
 */
export function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if(relUrl.indexOf("?") != -1){
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

/**
 * 需要权限路由
 * @type {string[]}
 */
export const authentication = [
    "aUser",
    "aBoardAdd"
];
