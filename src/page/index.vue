<template>
    <div class="main-content">
        <table class="content">
            <tr style="height: 15%">
                <td>
                    <div class="head-top">
                        <div class="logo">
                            <!--                <img src="./assets/images/10002.png" style="height: 85px" />-->
                        </div>
                        <div class="time" id="DataTime">
<!--                            编程语言热度-->
                        </div>
                    </div>
                </td>
            </tr>
            <tr style="height: 75%">
                <td style="vertical-align: text-top">
                    <table>
                        <tr>
                            <td style="width: 70%; min-width: 520px; vertical-align: text-top;overflow: hidden" id="dynamic-showbox">
                                <div class="showbox" style="width: 100%; height: 100%; " id="showbox-0">
                                    <table style="padding-left: 2%; vertical-align: top;" id="59053893-box" page="0">
                                        <tr style="height: 70%; vertical-align: top">
                                            <td style="vertical-align: top">
                                                <div class="middle-box">
                                                    <div class="tmbg quxian" id="59053893-quxian">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style="height: 30%;">
                                            <td style="vertical-align: top">
                                                <div class="item-box">
                                                    <div style="width: 915%;display: flex; position: relative; transition-duration: 0s;">
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053895-PM10-title">城市/实时职位数</span>
                                                            </div>
                                                            <div class="value" id="59053893-PM15-value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59053893-PM1585txt">react</div>
                                                            <div class="value" id="59053893-PM5-value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59053893-PM55txt">vue</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-PM10-title">全国</span>
                                                            </div>
                                                            <div class="value" id="59053893-PM10-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59053893-PM34ww0txt"><NumberGrow :value="strs(data ? data.ga.content :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value"><NumberGrow :value="strs(datas ? datas.ga.content :'')"></NumberGrow></div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-HUMI-title">上海</span>
                                                            </div>
                                                            <div class="value" id="59053893-HUMI-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59053893-HUMItxt"><NumberGrow :value="strs(data ? data.sh.content :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value"><NumberGrow :value="strs(datas ? datas.sh.content :'')"></NumberGrow></div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-TEMP-title">北京</span>
                                                            </div>
                                                            <div class="value" id="59053893-TEMP-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59053893-TEMPtxt"><NumberGrow :value="strs(data ? data.bj.content :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value"><NumberGrow :value="strs(datas ? datas.bj.content :'')"></NumberGrow></div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-CO2-title">深圳</span>
                                                            </div>
                                                            <div class="value" id="59053893-CO2-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value"  id="59053893-CO2txt"><NumberGrow :value="strs(data ? data.sz.content :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value"><NumberGrow :value="strs(datas ? datas.sz.content :'')"></NumberGrow></div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-VOC-title">广州</span>
                                                            </div>
                                                            <div class="value" id="59053893-VOC-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59053893-VOCtxt"><NumberGrow :value="strs(data ? data.gz.content :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value"><NumberGrow :value="strs(datas ? datas.gz.content :'')"></NumberGrow></div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="showbox" style="width: 100%; height: 100%; display:none;" id="showbox-1">
                                    <table style="padding-left: 2%; vertical-align: top;" id="59570501-box" page="1">
                                        <tr style="height: 70%; vertical-align: top">
                                            <td style="vertical-align: top">
                                                <div class="middle-box">
                                                    <div class="tmbg quxian" id="59570501-quxian">
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style="height: 30%;">
                                            <td style="vertical-align: top">
                                                <div class="item-box">
                                                    <div style="width: 915%; position: relative; transition-duration: 0s;">

                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59570501-PM10-title">上海</span>
                                                                <small class="unit" id="59570501-PM10-unit">--</small>
                                                            </div>
                                                            <div class="value" id="59570501-PM10-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59570501-PM10txt">优</div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59570501-HUMI-title">HUMI</span>
                                                                <small class="unit" id="59570501-HUMI-unit">--</small>
                                                            </div>
                                                            <div class="value" id="59570501-HUMI-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59570501-HUMItxt">舒 适</div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59570501-TEMP-title">TEMP</span>
                                                                <small class="unit" id="59570501-TEMP-unit">--</small>
                                                            </div>
                                                            <div class="value" id="59570501-TEMP-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59570501-TEMPtxt">舒适</div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59570501-CO2-title">CO2</span>
                                                                <small class="unit" id="59570501-CO2-unit">--</small>
                                                            </div>
                                                            <div class="value" id="59570501-CO2-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value"  id="59570501-CO2txt">优</div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59570501-VOC-title">VOC</span>
                                                                <small class="unit" id="59570501-VOC-unit">--</small>
                                                            </div>
                                                            <div class="value" id="59570501-VOC-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                            <div class="value" id="59570501-VOCtxt">优</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                            <td style="width: 30%; min-width: 240px; top: 0; right: 0; position: relative; vertical-align: top;">
                                <table>
                                    <tr>
                                        <td style="position: relative;">
                                            <div style="top: 0;">
                                                <img src="../assets/images/00.png" style="width: 50%; padding-left: 15%; margin-top: -120px" id="weatherpic" title="晴" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table>
                                                <tr>
                                                    <td style="width: 65%; padding-left: 10%">
                                                        <div class="weather">
                                                            <ul>
                                                                <li>
                                                                    <i></i>室外温度：<b id="wendu">--</b>
                                                                </li>
                                                                <li>
                                                                    <i></i>室外湿度：<b id="shidu">--</b>
                                                                </li>
                                                                <li>
                                                                    <i></i>室外PM2.5：<b id="pm25">--</b>
                                                                </li>
                                                                <li>
                                                                    <i></i>室外AQI：<b id="aqi">--</b>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style="font-size: 40px; text-align: center; font-weight: bold;">
                                                            <span>上海</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr style="height: 40%;">
                                        <td>
                                            <div style="padding-left: 30px; height: 100%;">
                                                <div style="border-top: 2px dashed"></div>
                                                <div style="height: 98%; min-height: 130px; text-align: center">
                                                    <table class="zhibiao">


                                                        <tr>
                                                            <td><span class="zhibiao-color" style="background-color: #00a040;"></span></td>
                                                            <td><span class="zhibiao-color" style="background-color: #dbbc49;"></span></td>
                                                            <td><span class="zhibiao-color" style="background-color: #fc703a;"></span></td>
                                                            <td><span class="zhibiao-color" style="background-color: #de4045;"></span></td>
                                                            <td><span class="zhibiao-color" style="background-color: #a13f6f;"></span></td>
                                                            <td><span class="zhibiao-color" style="background-color: #5c1a25;"></span></td>
                                                        </tr>
                                                        <tr>
                                                            <td><span class="zhibiao-title" style="width:50px">(0~35)</span></td>
                                                            <td><span class="zhibiao-title" style="width:50px">(35↑)</span></td>
                                                            <td><span class="zhibiao-title" style="width:50px">(75↑)</span></td>
                                                            <td><span class="zhibiao-title" style="width:50px">(115↑)</span></td>
                                                            <td><span class="zhibiao-title" style="width:50px">(150↑)</span></td>
                                                            <td><span class="zhibiao-title" style="width:50px">(350↑)</span></td>
                                                        </tr>
                                                        <tr class="title">
                                                            <td><span class="zhibiao-title">优</span></td>
                                                            <td><span class="zhibiao-title">良</span></td>
                                                            <td><span class="zhibiao-title">轻度污染</span></td>
                                                            <td><span class="zhibiao-title">中度污染</span></td>
                                                            <td><span class="zhibiao-title">重度污染</span></td>
                                                            <td><span class="zhibiao-title">严重污染</span></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div style="border-top: 2px dashed"></div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr style="height: 10%">
                <td>
                    <div class="footer" style="display:none">
                        <span class="title">健康提示：</span>
                        <small id="tishi"></small>
                        <span class="title">建议措施：</span>
                        <small id="cuoshi"></small>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import NumberGrow from '../components/numver'
    import {
        P_GET_CONT,
        P_GET_CONTS
    } from '../config/api'
    export default {
        name: "index",
        components:{
            NumberGrow
    },
        data () {
            return {
                data:'',
                datas:''
            }
        },
        computed:{

        },
        mounted() {
            this.getdata()
            setInterval(()=> {
                this.getdata()
            },5000)
        },
        methods:{
            getdata(){
                let postData = this.$qs.stringify({
                    requestName:"getdata",
                });
                this.$post(P_GET_CONT,postData).then(res => {
                    if(res.code==200){
                        this.data=res.data;
                        window.console.log(this.data)
                    }

                });
                this.getdatas()
            },
            getdatas(){
                let postData = this.$qs.stringify({
                    requestName:"getdatas",
                });
                this.$post(P_GET_CONTS,postData).then(res => {
                    if(res.code==200){
                        this.datas=res.data;
                        window.console.log(this.datas)
                    }

                })
            },
            strs(str){
                let numArr = str ? str.match(/\d+/g) : '';
                return numArr ?  +numArr.join('') : '0'
            }
        }
    }
</script>

<style scoped>

</style>
