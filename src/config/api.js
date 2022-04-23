
let $api = "/api/";
if (process.env.NODE_ENV === "production") {
    // 为线上环境修改配置...
    // $api="http://e23004507c.imwork.net/"  //test2
    $api="https://api.lllomh.com/"  //线上
    // $api="http://xmshop.online/index.php/" //test
    // $api="http://www.api.com/index.php/" //test 本机
}


export const P_GET_DATALIST = $api+'frontapi/getListDatas';
export const P_GET_DATALIST_MORE = $api+'frontapi/getListDatasMore';


