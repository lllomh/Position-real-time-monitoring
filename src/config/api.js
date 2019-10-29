
let $api = "/api/";
if (process.env.NODE_ENV === "production") {
    // 为线上环境修改配置...
    // $api="http://e23004507c.imwork.net/"  //test2
    $api="http://hunter.xiaoyougame.com/"  //线上
    // $api="http://xmshop.online/index.php/" //test
    // $api="http://www.api.com/index.php/" //test 本机
}


export const P_GET_CONT = $api+'frontapi/get_cont';
export const P_GET_CONTS = $api+'frontapi/get_conts';
export const P_BOARD_DITIAL = $api+'frontapi/board_test_detail';
export const P_BOARD_LIST = $api+'frontapi/boardList';
