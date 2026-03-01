<template>
    <div class="dashboard">
        <!-- 扫描线动效 -->
        <div class="scanline"></div>

        <!-- 顶部导航栏 -->
        <header class="dash-header">
            <div class="header-left">
                <button class="neon-btn" @click="toadd()">
                    <span class="btn-glow"></span>
                    <span class="btn-text">+ 增加城市</span>
                </button>
                <div class="feedback-link" :class="{show: isac}">
                    <a href="https://qun.qq.com/universal-share/share?ac=1&authKey=z92qJdPVwqCnPpnMSKhNRS5PoBn1erS9yAB0GAjmU9XagRlHGSlAI%2FZ%2FRONshIsm&busi_data=eyJncm91cENvZGUiOiIyOTAwNzgzNTMiLCJ0b2tlbiI6Iks4dG1ERlV2NkZvb28raGI2MGdZb2NlY3BZOVFCYUdXYVdFcWhaT2dmZk0yY3BzNFVkdXl5anRXV0NGQTRiTDUiLCJ1aW4iOiIyODU0MzcyOTYyIn0%3D&data=28rJgYEA_Lt0--8PEvuRxcNAiAzRCGIi-fyvEAZ_zn8WyKhQ9k6B0Ss1BZ4TteckYMfdSPpBQ8cQDUCKA-uatw&svctype=4&tempid=h5_group_info" target="_blank" @keyup.enter="addToList">加群反馈</a>
                </div>
            </div>
            <div class="header-center">
                <div class="title-wrapper">
                    <div class="title-decoration left"></div>
                    <h1 class="dash-title">前端框架招聘热度</h1>
                    <div class="title-decoration right"></div>
                </div>
                <p class="dash-subtitle">数据来源: 各大主流招聘平台</p>
            </div>
            <div class="header-right">
                <div class="github-badges">
                    <a href="https://github.com/lllomh/Position-real-time-monitoring" target="_blank"><img src="https://img.shields.io/github/stars/lllomh/Position-real-time-monitoring?style=social" alt=""/></a>
                    <a href="https://github.com/lllomh/Position-real-time-monitoring" target="_blank"><img src="https://img.shields.io/github/forks/lllomh/Position-real-time-monitoring?style=social" alt=""/></a>
                    <a href="https://github.com/lllomh/Position-real-time-monitoring" target="_blank"><img src="https://img.shields.io/github/watchers/lllomh/Position-real-time-monitoring?style=social" alt=""/></a>
                </div>
            </div>
        </header>

        <!-- 主体内容 -->
        <main class="dash-body">
            <!-- 左侧：图表 + 卡片 -->
            <section class="dash-left">
                <!-- 图表区域 -->
                <div class="chart-panel glass-card">
                    <div class="panel-header">
                        <div class="panel-title">
                            <span class="dot pulse"></span>
                            职位趋势
                        </div>
                        <div class="city-tabs">
                            <button :class="{active: isacitve0}" @click="getCrtyData(0)">上海</button>
                            <button :class="{active: isacitve1}" @click="getCrtyData(1)">北京</button>
                            <button :class="{active: isacitve2}" @click="getCrtyData(2)">深圳</button>
                            <button :class="{active: isacitve3}" @click="getCrtyData(3)">广州</button>
                            <button :class="{active: isacitve4}" @click="getCrtyData(4)">全国</button>
                        </div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-loading" v-if="loading">
                            <div class="chart-spinner"></div>
                            <p class="chart-loading-text">数据加载中...</p>
                        </div>
                        <div id="main" style="width: 100%; height: 100%"></div>
                    </div>
                </div>

                <!-- 城市数据卡片 -->
                <div class="city-cards">
                    <!-- 信息卡 -->
                    <div class="stat-card glass-card info-card">
                        <div class="card-corner tl"></div>
                        <div class="card-corner tr"></div>
                        <div class="card-corner bl"></div>
                        <div class="card-corner br"></div>
                        <div class="card-label">
                            <template v-if="data">{{data[(data.length-1)].ceate_time}}</template>
                            <span v-else class="mini-spinner"></span>
                        </div>
                        <div class="card-hint">数据每天凌晨更新</div>
                        <div class="card-divider"></div>
                        <div class="card-row">
                            <span class="framework-tag react">React</span>
                            <span class="card-value dim">--</span>
                        </div>
                        <div class="card-row">
                            <span class="framework-tag vue">Vue</span>
                            <span class="card-value dim">--</span>
                        </div>
                    </div>

                    <!-- 全国 -->
                    <div class="stat-card glass-card">
                        <div class="card-corner tl"></div>
                        <div class="card-corner tr"></div>
                        <div class="card-corner bl"></div>
                        <div class="card-corner br"></div>
                        <div class="card-label">全国</div>
                        <div class="card-divider"></div>
                        <div class="card-row">
                            <span class="framework-tag react">R</span>
                            <span class="card-value react-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].react)['ga']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].react)['ga']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].react)['ga']}}</span><span v-else class="mini-spinner"></span></div>
                        <div class="card-row">
                            <span class="framework-tag vue">V</span>
                            <span class="card-value vue-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].vue)['ga']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].vue)['ga']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].vue)['ga']}}</span><span v-else class="mini-spinner"></span></div>
                    </div>

                    <!-- 上海 -->
                    <div class="stat-card glass-card">
                        <div class="card-corner tl"></div>
                        <div class="card-corner tr"></div>
                        <div class="card-corner bl"></div>
                        <div class="card-corner br"></div>
                        <div class="card-label">上海</div>
                        <div class="card-divider"></div>
                        <div class="card-row">
                            <span class="framework-tag react">R</span>
                            <span class="card-value react-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].react)['sh']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].react)['sh']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].react)['sh']}}</span><span v-else class="mini-spinner"></span></div>
                        <div class="card-row">
                            <span class="framework-tag vue">V</span>
                            <span class="card-value vue-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].vue)['sh']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].vue)['sh']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].vue)['sh']}}</span><span v-else class="mini-spinner"></span></div>
                    </div>

                    <!-- 北京 -->
                    <div class="stat-card glass-card">
                        <div class="card-corner tl"></div>
                        <div class="card-corner tr"></div>
                        <div class="card-corner bl"></div>
                        <div class="card-corner br"></div>
                        <div class="card-label">北京</div>
                        <div class="card-divider"></div>
                        <div class="card-row">
                            <span class="framework-tag react">R</span>
                            <span class="card-value react-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].react)['bj']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].react)['bj']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].react)['bj']}}</span><span v-else class="mini-spinner"></span></div>
                        <div class="card-row">
                            <span class="framework-tag vue">V</span>
                            <span class="card-value vue-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].vue)['bj']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].vue)['bj']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].vue)['bj']}}</span><span v-else class="mini-spinner"></span></div>
                    </div>

                    <!-- 深圳 -->
                    <div class="stat-card glass-card">
                        <div class="card-corner tl"></div>
                        <div class="card-corner tr"></div>
                        <div class="card-corner bl"></div>
                        <div class="card-corner br"></div>
                        <div class="card-label">深圳</div>
                        <div class="card-divider"></div>
                        <div class="card-row">
                            <span class="framework-tag react">R</span>
                            <span class="card-value react-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].react)['sz']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].react)['sz']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].react)['sz']}}</span><span v-else class="mini-spinner"></span></div>
                        <div class="card-row">
                            <span class="framework-tag vue">V</span>
                            <span class="card-value vue-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].vue)['sz']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].vue)['sz']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].vue)['sz']}}</span><span v-else class="mini-spinner"></span></div>
                    </div>

                    <!-- 广州 -->
                    <div class="stat-card glass-card">
                        <div class="card-corner tl"></div>
                        <div class="card-corner tr"></div>
                        <div class="card-corner bl"></div>
                        <div class="card-corner br"></div>
                        <div class="card-label">广州</div>
                        <div class="card-divider"></div>
                        <div class="card-row">
                            <span class="framework-tag react">R</span>
                            <span class="card-value react-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].react)['gz']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].react)['gz']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].react)['gz']}}</span><span v-else class="mini-spinner"></span></div>
                        <div class="card-row">
                            <span class="framework-tag vue">V</span>
                            <span class="card-value vue-val">
                                <NumberGrow v-if="data" :value="strs((JSON.parse(data[(data.length-1)].vue)['gz']).toString())"></NumberGrow><span v-if="data && strs((JSON.parse(data[(data.length-1)].vue)['gz']).toString()) >= 1000" class="plus-sign">+</span>
                                <span v-if="!data" class="mini-spinner"></span>
                            </span>
                        </div>
                        <div class="card-yesterday">昨天: <span v-if="data">{{JSON.parse(data[(data.length-2)].vue)['gz']}}</span><span v-else class="mini-spinner"></span></div>
                    </div>
                </div>
            </section>

            <!-- 右侧：城市排行表 -->
            <aside class="dash-right">
                <div class="table-panel glass-card">
                    <div class="panel-header">
                        <div class="panel-title">
                            <span class="dot pulse cyan"></span>
                            全国城市职位排行
                        </div>
                    </div>
                    <div class="table-scroll">
                        <table class="rank-table">
                            <thead>
                                <tr>
                                    <th>城市</th>
                                    <th><span class="th-react">React</span></th>
                                    <th><span class="th-vue">Vue</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span class="city-name">重庆</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['cq']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['cq']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">赣州</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['gzgz']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['gzgz']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">杭州</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['hz']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['hz']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">成都</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['cd']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['cd']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">天津</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['tj']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['tj']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">苏州</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['szsz']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['szsz']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">南京</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['nj']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['nj']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">贵阳</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['gy']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['gy']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">长沙</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['cs']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['cs']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">沈阳</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['sy']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['sy']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">济南</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['jn']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['jn']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">宁波</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['nb']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['nb']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">无锡</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['wx']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['wx']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">郴州</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['cz']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['cz']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">大连</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['dl']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['dl']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">合肥</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['hf']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['hf']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                                <tr>
                                    <td><span class="city-name">武汉</span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.react)['wh']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                    <td><NumberGrows v-if="data_rs_more" :value="strs((JSON.parse(data_rs_more.vue)['wh']).toString())"></NumberGrows><span v-else class="mini-spinner"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </aside>
        </main>
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
                loading: true,
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
                ga_vue_data:[],
                ga_react_data:[],
                nationalDataVue:[],
                nationalDataReact:[],
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
                isacitve0:false,
                isacitve1:true,
                isacitve2:false,
                isacitve3:false,
                isacitve4:false,
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
            this.loadAllData()

            this.$nextTick(function() {
                this.drawPie('main')
            })

            window.addEventListener("resize",()=>{
                if(this.charts) this.charts.resize();
            })

        },

            methods:{
                addToList() {
                    this.toadd();
                },
                drawPie(id){
                    this.charts = echarts.init(document.getElementById(id))
                    var isMobile = window.innerWidth <= 767;
                    var isSmall = window.innerWidth <= 480;
                    var labelFontSize = isSmall ? 10 : (isMobile ? 11 : 13);
                    var showLabel = !isSmall;
                    this.charts.setOption({
                            grid:{
                                x: isSmall ? 40 : (isMobile ? 50 : 65),
                                y: isMobile ? 45 : 55,
                                x2: isSmall ? 15 : (isMobile ? 25 : 40),
                                y2: isMobile ? 35 : 40,
                            },
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: 'rgba(0,15,40,0.85)',
                            borderColor: 'rgba(0,255,255,0.3)',
                            borderWidth: 1,
                            textStyle: {
                                color: '#fff'
                            },
                            axisPointer: {
                                type: 'cross',
                                crossStyle: {
                                    color: '#00fff2'
                                },
                                lineStyle: {
                                    color: 'rgba(0,255,242,0.3)'
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
                                        borderColor:'rgba(255,255,255,0.5)'
                                    },
                                    emphasis:{
                                        iconStyle:{
                                            color:'#00fff2',
                                            borderColor:'#00fff2'
                                        }
                                    }
                                }
                            },
                            top:10,
                            left:130
                        },
                        legend: {
                            padding: isMobile ? [10,0,0,0] : [15,0,0,0],
                            data: ['react', 'vue'],
                            textStyle:{
                                fontSize: isMobile ? '12' : '16',
                                color: 'rgba(255,255,255,0.85)'
                            },
                            itemWidth: isMobile ? 16 : 25,
                            itemHeight: isMobile ? 10 : 14,
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
                                        color: 'rgba(255,255,255,0.6)',
                                        fontSize: isMobile ? 10 : 12
                                    },
                                    rotate: isMobile ? 30 : 0
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: 'rgba(255,255,255,0.15)'
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: 'rgba(255,255,255,0.05)'
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: isMobile ? '' : '职位数',
                                nameTextStyle: {
                                    color: 'rgba(255,255,255,0.6)'
                                },
                                min: 100,
                                axisLabel: {
                                    formatter: isSmall ? '{value}' : '{value} 个',
                                    show: true,
                                    textStyle: {
                                        color: 'rgba(255,255,255,0.6)',
                                        fontSize: isMobile ? 10 : 12
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: 'rgba(255,255,255,0.15)'
                                    }
                                },
                                splitLine: {
                                    lineStyle: {
                                        color: 'rgba(255,255,255,0.06)'
                                    }
                                }
                            },
                        ],
                        dataZoom: [
                            {
                                type: 'inside',
                                start: 0,
                                end: 100
                            },
                            {
                                show: !isSmall,
                                textStyle:{
                                    color:'#00fff2',
                                },
                                type: 'slider',
                                top: '90%',
                                start: 0,
                                end: 100,
                                borderColor: 'rgba(0,255,242,0.2)',
                                fillerColor: 'rgba(0,255,242,0.08)',
                                handleStyle: {
                                    color: '#00fff2'
                                }
                            }
                        ],
                        series: [
                            {
                                name: 'react',
                                type: 'line',
                                smooth: true,
                                data: this.reactData,
                                lineStyle: {
                                    normal: {
                                        color: '#ff4757',
                                        width: 2,
                                        shadowColor: 'rgba(255,71,87,0.5)',
                                        shadowBlur: isMobile ? 4 : 10,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            { offset: 0, color: 'rgba(255,71,87,0.25)' },
                                            { offset: 1, color: 'rgba(255,71,87,0)' }
                                        ])
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#ff4757',
                                        label: {
                                            show: showLabel,
                                            position: 'top',
                                            textStyle: {
                                                color: '#ff6b7a',
                                                fontSize: labelFontSize
                                                }
                                            }
                                          }
                                    },
                            },
                            {
                                name: 'vue',
                                type: 'line',
                                smooth: true,
                                data: this.vueData,
                                lineStyle: {
                                    normal: {
                                        color: '#ffd32a',
                                        width: 2,
                                        shadowColor: 'rgba(255,211,42,0.5)',
                                        shadowBlur: isMobile ? 4 : 10,
                                    },
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            { offset: 0, color: 'rgba(255,211,42,0.2)' },
                                            { offset: 1, color: 'rgba(255,211,42,0)' }
                                        ])
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#ffd32a',
                                        label: {
                                            show: showLabel,
                                            position: 'top',
                                            textStyle: {
                                                color: '#ffd32a',
                                                fontSize: labelFontSize
                                            }
                                        }
                                    }
                                },
                            },
                        ]
                    })
                },
            loadAllData(){
                this.loading = true;
                Promise.all([
                    this.getlistDates_more(),
                    this.getListDates()
                ]).then(() => {
                    this.loading = false;
                }).catch(() => {
                    this.loading = false;
                });
            },
            getlistDates_more(){
                return this.$get(P_GET_DATALIST_MORE).then(res => {
                    if(res.code==200){
                        this.data_rs_more=res.data[0];
                    }
                }).catch(() => {
                    return Promise.reject();
                });
            },
            getListDates(){
                return this.$get(P_GET_DATALIST).then(res => {
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

                            let ga_vue_data = [];
                            let ga_react_data = [];

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

                                ga_vue_data.push(JSON.parse(datas[i].vue).ga)
                                ga_react_data.push(JSON.parse(datas[i].react).ga)
                            }

                            this.timeDtae = day_date;
                            this.vueData = bj_vue_data;
                            this.nationalDataVue=ga_vue_data
                            this.nationalDataReact=ga_react_data
                            this.reactData = bj_react_data;

                            this.sh_vue_data= sh_vue_data;
                            this.sh_react_data=sh_react_data;

                            this.bj_vue_data= bj_vue_data;
                            this.bj_react_data=bj_react_data;

                            this.sz_vue_data= sz_vue_data;
                            this.sz_react_data=sz_react_data;

                            this.gz_vue_data= gz_vue_data;
                            this.gz_react_data=gz_react_data;
                        }
                    }
                }).catch(() => {
                    return Promise.reject();
                });
            },
             getCrtyData(id){
                    if(id==0){
                        this.isacitve0=true;
                        this.isacitve1=false;
                        this.isacitve2=false;
                        this.isacitve3=false;
                        this.isacitve4=false;
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
                        this.isacitve4=false;
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
                         this.isacitve4=false;
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
                         this.isacitve4=false;
                         this.vueData = this.gz_vue_data;
                         this.reactData = this.gz_react_data;
                         this.$nextTick(function() {
                             this.drawPie('main')
                         })
                     }
                 if(id==4){
                     this.isacitve0=false;
                     this.isacitve1=false;
                     this.isacitve2=false;
                     this.isacitve3=false;
                     this.isacitve4=true;
                     this.vueData = this.nationalDataVue;
                     this.reactData = this.nationalDataReact;
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

<style scoped>
/* ============================================
   DASHBOARD - 赛博朋克仪表盘主题
   ============================================ */

/* 扫描线动效 */
.scanline {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 242, 0.4), transparent);
    animation: scanMove 4s linear infinite;
    z-index: 9999;
    pointer-events: none;
}
@keyframes scanMove {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
}

/* 全局仪表盘容器 */
.dashboard {
    width: 100%;
    min-height: 100vh;
    background: #0a0e27;
    background-image:
        radial-gradient(ellipse at 10% 20%, rgba(0, 100, 255, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 90% 80%, rgba(0, 255, 242, 0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(20, 20, 60, 0.5) 0%, transparent 70%);
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-x: hidden;
}

/* 玻璃质感卡片 */
.glass-card {
    background: rgba(10, 20, 50, 0.65);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 255, 242, 0.12);
    border-radius: 12px;
    box-shadow:
        0 0 20px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.glass-card:hover {
    border-color: rgba(0, 255, 242, 0.25);
    box-shadow:
        0 0 30px rgba(0, 255, 242, 0.08),
        0 0 20px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* ============ 头部 ============ */
.dash-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    background: rgba(10, 20, 50, 0.5);
    border: 1px solid rgba(0, 255, 242, 0.08);
    border-radius: 12px;
    min-height: 60px;
    flex-shrink: 0;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
}

.neon-btn {
    position: relative;
    padding: 8px 22px;
    font-size: 13px;
    font-weight: 600;
    color: #00fff2;
    background: transparent;
    border: 1px solid rgba(0, 255, 242, 0.4);
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    letter-spacing: 1px;
    font-family: inherit;
}
.neon-btn:hover {
    background: rgba(0, 255, 242, 0.1);
    border-color: #00fff2;
    box-shadow: 0 0 20px rgba(0, 255, 242, 0.2), inset 0 0 20px rgba(0, 255, 242, 0.05);
}
.neon-btn .btn-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(transparent, rgba(0, 255, 242, 0.1), transparent 30%);
    animation: btnRotate 4s linear infinite;
}
@keyframes btnRotate {
    100% { transform: rotate(360deg); }
}
.btn-text {
    position: relative;
    z-index: 1;
}

.feedback-link {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    pointer-events: none;
}
.feedback-link.show {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
}
.feedback-link a {
    color: rgba(0, 255, 242, 0.7);
    text-decoration: none;
    font-size: 12px;
    border: 1px solid rgba(0, 255, 242, 0.2);
    padding: 5px 14px;
    border-radius: 4px;
    transition: all 0.2s;
}
.feedback-link a:hover {
    color: #00fff2;
    border-color: #00fff2;
}

.header-center {
    text-align: center;
    flex: 1;
}
.title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.title-decoration {
    width: 80px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 242, 0.6));
    position: relative;
}
.title-decoration.right {
    background: linear-gradient(90deg, rgba(0, 255, 242, 0.6), transparent);
}
.title-decoration::after {
    content: '';
    position: absolute;
    top: -2px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00fff2;
    box-shadow: 0 0 10px #00fff2;
}
.title-decoration.left::after {
    right: 0;
}
.title-decoration.right::after {
    left: 0;
}

.dash-title {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 6px;
    color: #fff;
    text-shadow: 0 0 30px rgba(0, 255, 242, 0.3);
    margin: 0;
    white-space: nowrap;
}
.dash-subtitle {
    font-size: 11px;
    color: rgba(255, 175, 0, 0.4);
    margin-top: 4px;
    letter-spacing: 2px;
}

.header-right {
    display: flex;
    align-items: center;
}
.github-badges {
    display: flex;
    gap: 8px;
    opacity: 0.8;
}
.github-badges a {
    display: block;
    transition: opacity 0.2s;
}
.github-badges a:hover {
    opacity: 1;
}

/* ============ 主体 ============ */
.dash-body {
    display: flex;
    gap: 16px;
    flex: 1;
    min-height: 0;
}

.dash-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
}

.dash-right {
    width: 320px;
    flex-shrink: 0;
}

/* ============ 面板头部 ============ */
.panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid rgba(0, 255, 242, 0.08);
}
.panel-title {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    gap: 10px;
    letter-spacing: 1px;
}
.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00fff2;
    box-shadow: 0 0 10px #00fff2;
}
.dot.cyan {
    background: #00fff2;
}
.dot.pulse {
    animation: dotPulse 2s ease-in-out infinite;
}
@keyframes dotPulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 10px #00fff2; }
    50% { opacity: 0.4; box-shadow: 0 0 4px #00fff2; }
}

/* ============ 图表区域 ============ */
.chart-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 380px;
}
.chart-container {
    flex: 1;
    position: relative;
    padding: 8px;
}

.city-tabs {
    display: flex;
    gap: 4px;
}
.city-tabs button {
    padding: 5px 16px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.25s ease;
    font-family: inherit;
}
.city-tabs button:hover {
    color: rgba(255, 255, 255, 0.8);
    border-color: rgba(0, 255, 242, 0.3);
}
.city-tabs button.active {
    color: #00fff2;
    border-color: #00fff2;
    background: rgba(0, 255, 242, 0.1);
    box-shadow: 0 0 12px rgba(0, 255, 242, 0.15);
}

/* loading */
.chart-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background: rgba(10, 14, 39, 0.8);
    border-radius: 12px;
}
.chart-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid rgba(0, 255, 242, 0.1);
    border-top-color: #00fff2;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
.chart-loading-text {
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    margin-top: 10px;
    letter-spacing: 2px;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ============ 数据卡片区 ============ */
.city-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
    gap: 12px;
    flex-shrink: 0;
}

.stat-card {
    padding: 14px 16px;
    position: relative;
    overflow: hidden;
}

/* 卡片四角装饰 */
.card-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: rgba(0, 255, 242, 0.4);
    border-style: solid;
    border-width: 0;
}
.card-corner.tl { top: 0; left: 0; border-top-width: 2px; border-left-width: 2px; }
.card-corner.tr { top: 0; right: 0; border-top-width: 2px; border-right-width: 2px; }
.card-corner.bl { bottom: 0; left: 0; border-bottom-width: 2px; border-left-width: 2px; }
.card-corner.br { bottom: 0; right: 0; border-bottom-width: 2px; border-right-width: 2px; }

.card-label {
    font-size: 14px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 2px;
    margin-bottom: 2px;
}
.card-hint {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: 6px;
}
.card-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 255, 242, 0.3), transparent);
    margin: 8px 0;
}
.card-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0;
}

.framework-tag {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 3px;
    letter-spacing: 1px;
}
.framework-tag.react {
    color: #ff4757;
    background: rgba(255, 71, 87, 0.15);
    border: 1px solid rgba(255, 71, 87, 0.3);
}
.framework-tag.vue {
    color: #ffd32a;
    background: rgba(255, 211, 42, 0.12);
    border: 1px solid rgba(255, 211, 42, 0.3);
}

.card-value {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    font-family: 'Arial', monospace;
}
.card-value.dim {
    color: rgba(255, 255, 255, 0.2);
    font-size: 16px;
}
.card-value.react-val {
    color: #ff4757;
    text-shadow: 0 0 15px rgba(255, 71, 87, 0.4);
}
.card-value.vue-val {
    color: #ffd32a;
    text-shadow: 0 0 15px rgba(255, 211, 42, 0.4);
}
.plus-sign {
    font-size: 0.7em;
    opacity: 0.6;
    margin-left: 1px;
}

.card-yesterday {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.3);
    text-align: right;
    margin-bottom: 4px;
}
.card-yesterday span {
    color: rgba(255, 225, 150, 0.6);
}

.info-card {
    background: rgba(10, 20, 50, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* ============ 右侧排行表 ============ */
.table-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.table-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 0 4px;
}
.table-scroll::-webkit-scrollbar {
    width: 4px;
}
.table-scroll::-webkit-scrollbar-track {
    background: transparent;
}
.table-scroll::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 242, 0.2);
    border-radius: 2px;
}

.rank-table {
    width: 100%;
    border-collapse: collapse;
}
.rank-table thead {
    position: sticky;
    top: 0;
    z-index: 2;
}
.rank-table th {
    padding: 10px 12px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    background: rgba(10, 14, 39, 0.95);
    border-bottom: 1px solid rgba(0, 255, 242, 0.15);
    letter-spacing: 1px;
    text-transform: uppercase;
}
.th-react {
    color: #ff4757;
}
.th-vue {
    color: #ffd32a;
}

.rank-table tbody tr {
    transition: background 0.2s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}
.rank-table tbody tr:hover {
    background: rgba(0, 255, 242, 0.04);
}
.rank-table td {
    padding: 9px 12px;
    text-align: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.75);
}
.city-name {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    font-size: 13px;
}

/* ============ 通用 ============ */
.mini-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(0, 255, 242, 0.15);
    border-top-color: #00fff2;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    vertical-align: middle;
}

/* ============ 响应式 ============ */

/* --- 平板竖屏 (≤1024px) --- */
@media (max-width: 1024px) {
    .dashboard {
        padding: 12px;
        gap: 12px;
    }
    .dash-right {
        width: 280px;
    }
    .title-decoration {
        width: 50px;
    }
    .dash-title {
        font-size: 20px;
        letter-spacing: 4px;
    }
}

/* --- 小平板 / 大手机横屏 (≤900px) --- */
@media (max-width: 900px) {
    .dash-body {
        flex-direction: column;
    }
    .dash-right {
        width: 100%;
    }
    .table-panel {
        max-height: 380px;
    }
    .city-cards {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* --- 手机横屏 / 小平板 (≤767px) --- */
@media (max-width: 767px) {
    .dashboard {
        padding: 10px;
        gap: 10px;
    }

    /* 头部重排 */
    .dash-header {
        flex-wrap: wrap;
        gap: 10px;
        padding: 12px 14px;
        min-height: auto;
    }
    .header-center {
        order: -1;
        width: 100%;
        margin-bottom: 2px;
    }
    .header-left {
        order: 0;
    }
    .header-right {
        order: 1;
        margin-left: auto;
    }
    .dash-title {
        font-size: 18px;
        letter-spacing: 3px;
    }
    .dash-subtitle {
        font-size: 10px;
    }
    .title-decoration {
        width: 40px;
    }
    .title-wrapper {
        gap: 12px;
    }
    .neon-btn {
        padding: 7px 16px;
        font-size: 12px;
    }

    /* 图表面板 - 去掉flex:1，用固定高度避免底部空白 */
    .chart-panel {
        flex: none;
        height: 320px;
        min-height: auto;
    }
    .panel-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 12px 14px;
    }
    .city-tabs {
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        gap: 6px;
        padding-bottom: 2px;
    }
    .city-tabs::-webkit-scrollbar {
        display: none;
    }
    .city-tabs button {
        padding: 6px 14px;
        font-size: 12px;
        white-space: nowrap;
        flex-shrink: 0;
        min-height: 32px;
    }

    /* 数据卡片 - 2列，日期卡片占满一行 */
    .city-cards {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
    .city-cards .info-card {
        grid-column: 1 / -1;
        flex-direction: row;
        align-items: center;
        gap: 16px;
        padding: 10px 16px;
    }
    .info-card .card-divider {
        display: none;
    }
    .info-card .card-hint {
        margin-bottom: 0;
    }
    .info-card .card-row {
        margin: 0;
    }
    .stat-card {
        padding: 12px 12px;
    }
    .card-label {
        font-size: 13px;
    }
    .card-value {
        font-size: 20px;
    }
    .card-value.dim {
        font-size: 14px;
    }
    .framework-tag {
        font-size: 9px;
        padding: 2px 6px;
    }
    .card-yesterday {
        font-size: 10px;
    }

    /* 右侧表格 - 不隐藏，改为可滚动面板 */
    .dash-right {
        width: 100%;
    }
    .table-panel {
        max-height: 320px;
    }
    .rank-table th {
        padding: 8px 8px;
        font-size: 11px;
    }
    .rank-table td {
        padding: 8px 8px;
        font-size: 13px;
    }
    .city-name {
        font-size: 12px;
    }
}

/* --- 小手机 (≤480px) --- */
@media (max-width: 480px) {
    .dashboard {
        padding: 8px;
        gap: 8px;
        /* 安全区域适配（刘海屏/底部横条） */
        padding-top: calc(8px + env(safe-area-inset-top));
        padding-bottom: calc(8px + env(safe-area-inset-bottom));
        padding-left: calc(8px + env(safe-area-inset-left));
        padding-right: calc(8px + env(safe-area-inset-right));
    }

    .dash-header {
        padding: 10px 12px;
        gap: 8px;
        border-radius: 10px;
    }
    .dash-title {
        font-size: 16px;
        letter-spacing: 2px;
    }
    .title-decoration {
        width: 24px;
    }
    .title-decoration::after {
        width: 4px;
        height: 4px;
    }
    .title-wrapper {
        gap: 8px;
    }
    .dash-subtitle {
        font-size: 9px;
        letter-spacing: 1px;
    }
    .github-badges {
        display: none;
    }
    .neon-btn {
        padding: 6px 12px;
        font-size: 11px;
        border-radius: 5px;
    }
    .feedback-link a {
        font-size: 11px;
        padding: 4px 10px;
    }

    /* 图表 */
    .chart-panel {
        flex: none;
        height: 280px;
        min-height: auto;
        border-radius: 10px;
    }
    .chart-container {
        padding: 4px;
    }
    .panel-header {
        padding: 10px 12px;
        gap: 8px;
    }
    .panel-title {
        font-size: 13px;
        gap: 6px;
    }
    .dot {
        width: 6px;
        height: 6px;
    }

    /* 卡片 - 仍然2列但更紧凑 */
    .city-cards {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
    }
    .stat-card {
        padding: 10px 10px;
        border-radius: 10px;
    }
    .card-corner {
        width: 8px;
        height: 8px;
    }
    .card-label {
        font-size: 12px;
        letter-spacing: 1px;
    }
    .card-hint {
        font-size: 9px;
    }
    .card-divider {
        margin: 6px 0;
    }
    .card-row {
        margin: 3px 0;
    }
    .card-value {
        font-size: 18px;
    }
    .card-value.dim {
        font-size: 13px;
    }
    .framework-tag {
        font-size: 8px;
        padding: 1px 5px;
    }
    .card-yesterday {
        font-size: 9px;
    }

    /* 表格面板 */
    .table-panel {
        max-height: 280px;
        border-radius: 10px;
    }
    .rank-table th {
        padding: 7px 6px;
        font-size: 10px;
        letter-spacing: 0;
    }
    .rank-table td {
        padding: 7px 6px;
        font-size: 12px;
    }
    .city-name {
        font-size: 11px;
    }

    /* 玻璃卡片在小屏上减轻模糊 */
    .glass-card {
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 10px;
    }
}

/* --- 超小屏 (≤360px) --- */
@media (max-width: 360px) {
    .dash-title {
        font-size: 14px;
        letter-spacing: 1px;
    }
    .title-decoration {
        display: none;
    }
    .city-cards {
        grid-template-columns: 1fr;
    }
    .stat-card {
        padding: 10px 14px;
    }
    .card-value {
        font-size: 20px;
    }
    .chart-panel {
        height: 240px;
        min-height: auto;
    }
    .neon-btn {
        padding: 6px 10px;
        font-size: 10px;
    }
}

/* --- 横屏手机优化 --- */
@media (max-height: 500px) and (orientation: landscape) {
    .dashboard {
        padding: 6px 12px;
        gap: 8px;
    }
    .dash-header {
        min-height: auto;
        padding: 8px 14px;
    }
    .dash-title {
        font-size: 16px;
    }
    .chart-panel {
        flex: none;
        height: 220px;
        min-height: auto;
    }
    .city-cards {
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 8px;
    }
    .stat-card {
        padding: 8px 10px;
    }
    .card-value {
        font-size: 16px;
    }
    .card-label {
        font-size: 11px;
    }
    .table-panel {
        max-height: 260px;
    }
}

/* --- 触摸设备优化 --- */
@media (hover: none) and (pointer: coarse) {
    .city-tabs button {
        min-height: 36px;
        min-width: 44px;
    }
    .neon-btn {
        min-height: 36px;
    }
    .feedback-link a {
        min-height: 32px;
        display: inline-flex;
        align-items: center;
    }
    /* 触摸设备不需要 hover 发光效果，减少性能消耗 */
    .glass-card:hover {
        border-color: rgba(0, 255, 242, 0.12);
        box-shadow:
            0 0 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
    .rank-table tbody tr:hover {
        background: transparent;
    }
    /* 增大表格行高方便触摸 */
    .rank-table td {
        padding: 10px 8px;
    }
}
</style>
