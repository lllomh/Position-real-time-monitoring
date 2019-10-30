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
                                                    <div class="tmbg quxian">
                                                        <div id="main" style="width:100%;height: 100%;"></div>
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
                                <table class="tablisty">
                                    <thead>
                                       <tr>
                                           <th>城市</th>
                                           <th>react.js实时职位数量</th>
                                           <th>vue.js实时职位数量</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>重庆</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.cq.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.cq.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>赣州</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.gzgz.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.gzgz.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>杭州</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.hz.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.hz.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>成都</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.cd.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.cd.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>天津</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.tj.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.tj.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>苏州</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.szsz.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.szsz.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>南京</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.nj.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.nj.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>贵阳</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.gy.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.gy.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>长沙</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.cs.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.cs.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>沈阳</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r['sy'].content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs['sy'].content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>济南</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.jn.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.jn.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>宁波</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.nb.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.nb.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>无锡</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.wx.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.wx.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>郴州</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.cz.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.cz.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>大连</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.dl.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.dl.content :'')"></NumberGrows></td>
                                    </tr>
                                    <tr>
                                        <td>合肥</td>
                                        <td><NumberGrows :value="strs(data_r ? data_r.hf.content :'')"></NumberGrows></td>
                                        <td><NumberGrows :value="strs(data_rs ? data_rs.hf.content :'')"></NumberGrows></td>
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
        P_GET_CONT,
        P_GET_CONTS,
        P_GET_ALL,
        P_GET_ALLS
    } from '../config/api'
    export default {
        name: "index",
        components:{
            NumberGrow,
            NumberGrows
    },
        data () {
            return {
                data:'',
                datas:'',
                data_r:'',
                data_rs:'',
                dataArrvue:[],
                dataArrreact:[],
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
            }
        },
        computed:{

        },
        mounted() {
            this.getdata();
            this.getdatas();

            this.getdatar()
            this.getdatars()

            this.$nextTick(function() {
                this.drawPie('main')
            })

            window.console.log(this.dataArrreact)
            // window.console.log(this.data_rs)
        },
        methods:{
            drawPie(id){
                var labelOption = {
                    normal: {
                        show: true,
                        position: this.position,
                        distance: this.distance,
                        align: this.align,
                        verticalAlign: this.verticalAlign,
                        rotate:this.rotate,
                        formatter: '{c}  {name|{a}}',
                        fontSize: 16,
                        rich: {
                            name: {
                                textBorderColor: '#fff'
                            }
                        }
                    }
                };
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                    },
                    legend: {
                        data: ['react.js', 'vue.js'],
                        top:'20',
                        textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 16,
                        },
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center'

                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: ['全国', '北京', '上海', '深圳', '广州'],
                            axisLine:{
                                lineStyle:{
                                    color:'yellow',
                                }
                        },
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine:{
                                lineStyle:{
                                    color:'yellow',
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: 'react.js',
                            type: 'bar',
                            barGap: 0,
                            label: labelOption,
                            data: [320, 332, 301, 334, 390]
                        },
                        {
                            name: 'vue.js',
                            type: 'bar',
                            label: labelOption,
                            data: [220, 182, 191, 234, 290]
                        }
                    ]
                })
            },
            getdata(){
                let postData = this.$qs.stringify({
                    requestName:"getdata",
                });
                this.$post(P_GET_CONT,postData).then(res => {
                    if(res.code==200){
                        this.data=res.data;
                        this.dataArrreact.push(res.data);
                        setTimeout(()=>{
                            this.getdata()
                        },2000)
                    }

                });
            },
            getdatas(){
                let postData = this.$qs.stringify({
                    requestName:"getdatas",
                });
                this.$post(P_GET_CONTS,postData).then(res => {
                    if(res.code==200){
                        this.datas=res.data;
                        setTimeout(()=>{
                            this.getdatas()
                        },2000)
                    }

                })
            },
            getdatar(){
                let postData = this.$qs.stringify({
                    requestName:"getdataall",
                });
                this.$post(P_GET_ALL,postData).then(res => {
                    if(res.code==200){
                        this.data_r=res.data;
                        setTimeout(()=>{
                            this.getdatar()
                        },2000)
                    }

                });

            },
            getdatars(){
                let postData = this.$qs.stringify({
                    requestName:"getdataalls",
                });
                this.$post(P_GET_ALLS,postData).then(res => {
                    if(res.code==200){
                        this.data_rs=res.data;
                        setTimeout(()=>{
                            this.getdatars()
                        },2000)
                    }

                });
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
