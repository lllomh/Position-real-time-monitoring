
let $api = "/api/";
if (process.env.NODE_ENV === "production") {
    // 为线上环境修改配置...
    // $api="http://e23004507c.imwork.net/"  //test2
    $api="https://api.lllomh.cn/"  //线上
    // $api="http://xmshop.online/index.php/" //test
    // $api="http://www.api.com/index.php/" //test 本机
}


export const P_GET_CONT = $api+'frontapi/get_cont';
export const P_GET_CONTS = $api+'frontapi/get_conts';
export const P_GET_ALL = $api+'frontapi/get_conts_all';
export const P_GET_ALLS = $api+'frontapi/get_conts_alls';
export const P_GET_DATALIST = $api+'frontapi/getListDatas';



export const P_BOARD_DITIAL = $api+'frontapi/board_test_detail';
export const P_BOARD_LIST = $api+'frontapi/boardList';
