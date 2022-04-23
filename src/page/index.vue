<template>
    <div class="main-content">
        <table class="content">
            <tr style="height: 15%">
                <td>
                    <div class="head-top">
                        <div class="logo">
                         <button class="btns tc" @click="toadd()"><span><i>我</i><i>要</i><i>增加</i><i>城市</i></span></button>
                          <div class="textsub" :class="{rotation:isac}">
                              <a href="https://jq.qq.com/?_wv=1027&k=X8EDebNq" target="_blank" @keyup.enter="addToList">点我加群反馈</a>
                          </div>
                        </div>
                        <div class="time" id="DataTime">
                           前端框架招聘热度
                        </div>
                        <div class="titles">数据来源: 各大主流招聘平台</div>
                        <div class="github">
                           <span class="ff">
                                <a href="https://github.com/lllomh/Position-real-time-monitoring" target="_blank"><img src="https://img.shields.io/github/stars/lllomh/Position-real-time-monitoring?style=social" alt=""/></a>
                            </span>
                            <span class="ff yu" style="margin-left: 5px">
                                <a href="https://github.com/lllomh/Position-real-time-monitoring" target="_blank"> <img src="https://img.shields.io/github/forks/lllomh/Position-real-time-monitoring?style=social" alt=""/></a>
                            </span>
                            <span class="ff wu" style="margin-left: 5px">
                                <a href="https://github.com/lllomh/Position-real-time-monitoring" target="_blank"><img src="https://img.shields.io/github/watchers/lllomh/Position-real-time-monitoring?style=social" alt=""></a>
                            </span>
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
                                                    <div class="tmbg quxian">
                                                        <div class="btns btm1" :class="{acitve:isacitve0}">
                                                            <button @click="getCrtyData(0)">上海</button>
                                                        </div>
                                                        <div class="btns btm2" :class="{acitve:isacitve1}" style="">
                                                            <button @click="getCrtyData(1)">北京</button>
                                                        </div>
                                                        <div class="btns btm3" :class="{acitve:isacitve2}" style="">
                                                            <button @click="getCrtyData(2)">深圳</button>
                                                        </div>
                                                        <div class="btns btm4" :class="{acitve:isacitve3}" style="">
                                                            <button @click="getCrtyData(3)">广州</button>
                                                        </div>
                                                        <div id="main" style="width: 100%;height: 100%"></div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style="height: 30%;">
                                            <td style="vertical-align: top">
                                                <div class="item-box">
                                                    <div style="width: 915%;display: flex; position: relative; transition-duration: 0s;">
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info" style="position: relative">
                                                                <span class="title" id="59053895-PM10-title">城市/{{data ?data[(data.length-1)].ceate_time:''}}</span>
                                                                <span style="position: absolute;font-size: 15px;left: 55px;top: 55px;">数据每天凌晨更新</span>
                                                            </div>
                                                            <div class="value" id="59053893-PM10-val34ue"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">react上一次变动前数量</div>
                                                            <div class="value" id="59053893-PM1585txt">react</div>
                                                            <div class="value" id="59053893-PM5-value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">vue上一次变动前数量</div>
                                                            <div class="value" id="59053893-PM55txt">vue</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-PM10-title">全国</span>
                                                            </div>
                                                            <div class="value" id="59053893-PM10-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span style="color: #ffe5ad">{{data ?JSON.parse(data[(data.length-2)].react)['ga']:''}}</span></div>
                                                            <div class="value" id="59053893-PM34ww0txt"><NumberGrow :value="strs(data ? (JSON.parse(data[(Number(data.length-1))].vue)['ga']).toString() :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span class="colors">{{data ?JSON.parse(data[(data.length-2)].vue)['ga']:''}}</span>   </div>
                                                            <div class="value"><NumberGrow :value="strs(data ? (JSON.parse(data[(data.length-1)].vue)['ga']).toString() :'')"></NumberGrow></div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-HUMI-title">上海</span>
                                                            </div>
                                                            <div class="value" id="59053893-HUMI-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span style="color: #ffe5ad">{{data ?JSON.parse(data[(data.length-2)].react)['sh']:''}}</span></div>
                                                            <div class="value" id="59053893-HUMItxt"><NumberGrow :value="strs(data ? (JSON.parse(data[(data.length-1)].react)['sh']).toString() :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span class="colors">{{data ?JSON.parse(data[(data.length-2)].vue)['sh']:''}}</span>   </div>
                                                            <div class="value"><NumberGrow :value="strs(data ? (JSON.parse(data[(data.length-1)].vue)['sh']).toString() :'')"></NumberGrow></div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-TEMP-title">北京</span>
                                                            </div>
                                                            <div class="value" id="59053893-TEMP-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span class="colors">{{data ?JSON.parse(data[(data.length-2)].react)['bj']:''}}</span> </div>
                                                            <div class="value" id="59053893-TEMPtxt"><NumberGrow :value="strs(data ?(JSON.parse(data[(data.length-1)].react)['bj']).toString() :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span class="colors">{{data ?JSON.parse(data[(data.length-2)].vue)['bj']:''}}</span>   </div>
                                                            <div class="value"><NumberGrow :value="strs(data ? (JSON.parse(data[(data.length-1)].vue)['bj']).toString() :'')"></NumberGrow></div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-CO2-title">深圳</span>
                                                            </div>
                                                            <div class="value" id="59053893-CO2-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span class="colors">{{data ?JSON.parse(data[(data.length-2)].react)['sz']:''}}</span> </div>
                                                            <div class="value"  id="59053893-CO2txt"><NumberGrow :value="strs(data ? (JSON.parse(data[(data.length-1)].react)['sz']).toString() :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span class="colors">{{data ?JSON.parse(data[(data.length-2)].vue)['sz']:''}}</span>   </div>
                                                            <div class="value"><NumberGrow :value="strs(data ? (JSON.parse(data[(data.length-1)].vue)['sz']).toString() :'')"></NumberGrow></div>
                                                            <div class="value" style="font-size:12px;margin:5px 0"> </div>
                                                        </div>
                                                        <div class="item tmbg" style="height: 100%;margin:0 20px 0 0">
                                                            <div class="info">
                                                                <span class="title" id="59053893-VOC-title">广州</span>
                                                            </div>
                                                            <div class="value" id="59053893-VOC-value"  >--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span class="colors">{{data ?JSON.parse(data[(data.length-2)].react)['gz']:''}}</span> </div>
                                                            <div class="value" id="59053893-VOCtxt"><NumberGrow :value="strs(data ? (JSON.parse(data[(data.length-1)].react)['gz']).toString() :'')"></NumberGrow></div>

                                                            <div class="value">--</div>
                                                            <div class="value" style="font-size:12px;margin:5px 0">昨天: <span class="colors">{{data ?JSON.parse(data[(data.length-2)].vue)['gz']:''}}</span>  </div>
                                                            <div class="value"><NumberGrow :value="strs(data ? (JSON.parse(data[(data.length-1)].vue)['gz']).toString() :'')"></NumberGrow></div>
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
                            <td style="width: 30%; min-width: 240px; top: 0; right: 0; position: relative; vertical-align: top;" class="hix">
                                <table class="tablisty">
                                    <thead>
                                       <tr>
                                           <th>城市</th>
                                           <th>react.js今天职位数量</th>
                                           <th>vue.js今天职位数量</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>重庆</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['cq']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['cq']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>赣州</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['gzgz']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['gzgz']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>杭州</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['hz']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['hz']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>成都</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['cd']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['cd']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>天津</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['tj']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['tj']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>苏州</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['szsz']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['szsz']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>南京</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['nj']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['nj']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>贵阳</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['gy']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['gy']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>长沙</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['cs']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['cs']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>沈阳</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['sy']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['sy']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>济南</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['jn']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['jn']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>宁波</td>
                                        <td><NumberGrows :value="strs(data_rs_more ?(JSON.parse(data_rs_more.react)['nb']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['nb']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>无锡</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['wx']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['wx']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>郴州</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['cz']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['cz']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>大连</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['dl']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['dl']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>合肥</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['hf']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['hf']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>武汉</td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.react)['wh']).toString() :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs_more ? (JSON.parse(data_rs_more.vue)['wh']).toString() :'')"></NumberGrows></td>
                                    </tr>
                                    </tbody>
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
    import NumberGrows from '../components/numvers'
    import echarts from 'echarts'
    import {
        P_GET_DATALIST_MORE ,
        P_GET_DATALIST
    } from '../config/api'
    export default {
        name: "index",
        components:{
            NumberGrow,
            NumberGrows,
    },
        data () {
            return {
                show: true,
                count: "",
                TIME_COUNT:600,
                timer: null,
                data:'',
                datas:'',
                data_r:'',
                data_rs:'',
                dataArrvue:[],
                dataArrreact:[],
                timeDtae:[],
                vueData:[],
                reactData:[],
                sh_vue_data:[],
                sh_react_data:[],
                bj_vue_data:[],
                bj_react_data:[],
                sz_vue_data:[],
                sz_react_data:[],
                gz_vue_data:[],
                gz_react_data:[],
                ga_old:'',
                sh_old:'',
                bj_old:'',
                sz_old:'',
                gz_old:'',
                ga_oldval:'',
                sh_oldval:'',
                bj_oldval:'',
                sz_oldval:'',
                gz_oldval:'',
                ga_old_v:'',
                sh_old_v:'',
                bj_old_v:'',
                sz_old_v:'',
                gz_old_v:'',
                ga_oldval_v:'',
                data_rs_more:'',
                sh_oldval_v:'',
                bj_oldval_v:'',
                sz_oldval_v:'',
                gz_oldval_v:'',
                isacitve0:true,
                isacitve1:false,
                isacitve2:false,
                isacitve3:false,
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
                obgdata:{},
                charts: '',
                isac:false,
            }
        },
        created(){

        },
        computed:{

        },
        watch: {
            timeDtae() {
                this.$nextTick(function () {
                    this.drawPie('main')
                })
            },
            // react start
            ga_old: {
                handler: function (val, oldval) {
                    this.ga_oldval = oldval ? oldval : '未变动'
                },
            },
            sh_old: {
                handler: function (val, oldval) {
                    this.sh_oldval = oldval ? oldval : '未变动'
                },
            },
            bj_old: {
                handler: function (val, oldval) {
                    this.bj_oldval = oldval ? oldval : '未变动'
                },
            },
            sz_old: {
                handler: function (val, oldval) {
                    this.sz_oldval = oldval ? oldval : '未变动'
                },
            },
            gz_old: {
                handler: function (val, oldval) {
                    this.gz_oldval = oldval ? oldval : '未变动'
                },
            },
            //vue setart
            ga_old_v: {
                handler: function (val, oldval) {
                    this.ga_oldval_v = oldval ? oldval : '未变动'
                },
            },
            sh_old_v: {
                handler: function (val, oldval) {
                    this.sh_oldval_v = oldval ? oldval : '未变动'
                },
            },
            bj_old_v: {
                handler: function (val, oldval) {
                    this.bj_oldval_v = oldval ? oldval : '未变动'
                },
            },
            sz_old_v: {
                handler: function (val, oldval) {
                    this.sz_oldval_v = oldval ? oldval : '未变动'
                },
            },
            gz_old_v: {
                handler: function (val, oldval) {
                    this.gz_oldval_v = oldval ? oldval : '未变动'
                },
            },


        },
        mounted() {
            this.getCode()
            this.getlistDates_more()
            this.getListDates();

            this.$nextTick(function() {
                this.drawPie('main')
            })

            window.addEventListener("resize",()=>{
                    this.charts.resize();
            })

        },

            methods:{
                addToList() {
                    this.toadd();
                },
                drawPie(id){
                    this.charts = echarts.init(document.getElementById(id))
                    this.charts.setOption({
                            grid:{
                                x:65,
                                y:55,
                                x2:40,
                                y2:40,

                            },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        toolbox: {
                            itemSize:16,
                            feature: {
                                magicType: {
                                    show: true, type: ['line', 'bar'],
                                    iconStyle:{
                                        color:'#fff',
                                        borderColor:'#fff'
                                    },
                                    emphasis:{
                                        iconStyle:{
                                            color:'#81ff04',
                                            borderColor:'#81ff04'
                                        }
                                    }
                                }
                            },
                            top:10,
                            left:130
                        },
                        legend: {
                            padding:[15,0,0,0],
                            data: ['react', 'vue'],
                            textStyle:{
                                fontSize:'18',
                                color: '#ffffff'//字体颜色
                            },
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data:this.timeDtae,
                                axisPointer: {
                                    type: 'shadow'
                                },
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#ffffff'
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '职位数',
                                nameTextStyle: {
                                    color: '#ffffff'
                                },
                                min: 100,
                                // max: 5000,
                                // interval: 50,
                                axisLabel: {
                                    formatter: '{value} 个',
                                    show: true,
                                    textStyle: {
                                        color: '#ffffff'
                                    }
                                }
                            },
                        ],
                        dataZoom: [
                            {
                                type: 'inside',
                                start: 0,//初始化显示多少 百分之0 到 百分之100
                                end: 100//初始化显示多少 百分之0 到 百分之100
                            },
                            {
                                show: true,
                                textStyle:{
                                    color:'#81ff04',
                                },
                                type: 'slider',
                                top: '90%',
                                start: 0,//初始化显示多少 百分之0 到 百分之100
                                end: 100//初始化显示多少 百分之0 到 百分之100
                            }
                        ],
                        series: [
                            {
                                name: 'react',
                                type: 'line',
                                data: this.reactData,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true, //开启显示
                                            position: 'top', //在上方显示
                                            textStyle: { //数值样式
                                                color: 'red',
                                                fontSize: 16
                                                }
                                            }
                                          }
                                    },
                            },
                            {
                                name: 'vue',
                                type: 'line',
                                data: this.vueData,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true, //开启显示
                                            position: 'top', //在上方显示
                                            textStyle: { //数值样式
                                                color: '#2f4554',
                                                fontSize: 16
                                            }
                                        }
                                    }
                                },
                            },
                        ]
                    })
                },
            getlistDates_more(){
                let postData = this.$qs.stringify({
                    requestName:"getlistDates_more",
                });
                this.$post(P_GET_DATALIST_MORE,postData).then(res => {
                    if(res.code==200){
                        this.data_rs_more=res.data[0];
                        // console.log(this.data_rs_more,'data_rs_more')
                    }

                });
            },
            getListDates(){
                let postData = this.$qs.stringify({
                    requestName:"getdatalists",
                });
                this.$post(P_GET_DATALIST,postData).then(res => {
                    if(res.code==200){
                       let datas = res.data ? res.data :'';
                       this.data=datas;

                        if(datas){
                            let day_date = [];

                            let sh_vue_data = [];
                            let sh_react_data = [];

                            let bj_vue_data = [];
                            let bj_react_data = [];

                            let sz_vue_data = [];
                            let sz_react_data = [];

                            let gz_vue_data = [];
                            let gz_react_data = [];
                            for(let i=0;i<datas.length;i++){
                                day_date.push(datas[i].ceate_time)

                                sh_vue_data.push(JSON.parse(datas[i].vue).sh)
                                sh_react_data.push(JSON.parse(datas[i].react).sh)

                                bj_vue_data.push(JSON.parse(datas[i].vue).bj)
                                bj_react_data.push(JSON.parse(datas[i].react).bj)

                                sz_vue_data.push(JSON.parse(datas[i].vue).sz)
                                sz_react_data.push(JSON.parse(datas[i].react).sz)

                                gz_vue_data.push(JSON.parse(datas[i].vue).gz)
                                gz_react_data.push(JSON.parse(datas[i].react).gz)


                            }

                            this.timeDtae = day_date;
                            this.vueData = sh_vue_data;
                            this.reactData = sh_react_data;

                            this.sh_vue_data= sh_vue_data;
                            this.sh_react_data=sh_react_data;

                            this.bj_vue_data= bj_vue_data;
                            this.bj_react_data=bj_react_data;

                            this.sz_vue_data= sz_vue_data;
                            this.sz_react_data=sz_react_data;

                            this.gz_vue_data= gz_vue_data;
                            this.gz_react_data=gz_react_data;

                            window.console.log()
                        }


                    }

                });
            },
             getCrtyData(id){
                    if(id==0){
                        this.isacitve0=true;
                        this.isacitve1=false;
                        this.isacitve2=false;
                        this.isacitve3=false;
                        this.vueData = this.sh_vue_data;
                        this.reactData = this.sh_react_data;
                        this.$nextTick(function() {
                            this.drawPie('main')
                        })
                    }
                    if(id==1){
                        this.isacitve0=false;
                        this.isacitve1=true;
                        this.isacitve2=false;
                        this.isacitve3=false;
                        this.vueData = this.bj_vue_data;
                        this.reactData = this.bj_react_data;
                        this.$nextTick(function() {
                            this.drawPie('main')
                        })
                    }
                     if(id==2){
                         this.isacitve0=false;
                         this.isacitve1=false;
                         this.isacitve2=true;
                         this.isacitve3=false;
                         this.vueData = this.sz_vue_data;
                         this.reactData = this.sz_react_data;
                         this.$nextTick(function() {
                             this.drawPie('main')
                         })
                     }
                     if(id==3){
                         this.isacitve0=false;
                         this.isacitve1=false;
                         this.isacitve2=false;
                         this.isacitve3=true;
                         this.vueData = this.gz_vue_data;
                         this.reactData = this.gz_react_data;
                         this.$nextTick(function() {
                             this.drawPie('main')
                         })
                     }
             },

                getCode() {
                    if (!this.timer) {
                        this.count = this.TIME_COUNT;
                        this.show = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= this.TIME_COUNT) {
                                this.count -= 1;
                            } else {
                                this.show = true;
                                clearInterval(this.timer);
                                this.timer = null;
                                this.getCode()
                            }
                        }, 1000);
                    }
                },
            toadd(){

                if(this.isac){
                    this.isac = false
                }else {
                    this.isac = true;
                }



            },
            strs(str){
                let numArr = str ? str.match(/\d+/g) : '';
                return numArr ?  +numArr.join('') : '0'
            },
             tasterNumber(str){
                 return str.replace(/[^0-9]/ig,"");
             }

        }
    }
</script>

<style>
    @media (max-width: 767px) {
        .hix{
            display: none;
        }
        #59053893-box{
            padding-right: 2%;
        }
    }
    .titles{
        text-align: right;
        font-size: 12px;
        margin-top: 5px;
        color: rgba(255, 175, 0, 0.3);
    }
    .github{
        text-align: center;
    }
    .logo{
        position: relative;
    }
    .ff{

    }
    .yu{

    }
</style>
