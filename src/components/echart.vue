<template>
  <div>
      <p :id="id" :style="style"></p>
  </div>



</template>

<script>

    export default {

        name: "Chart",

        data() {

            return {

                //echarts实例

                chart: ""

            };

        },

        props: {

            //父组件需要传递的参数：id，width，height，option

            id: {

                type: String

            },

            width: {

                type: String,

                default: "100%"

            },

            height: {

                type: String,

                default: "300px"

            },

            option: {


                //Object类型的prop值一定要用函数return出来，不然会报错。原理和data是一样的，

                //使用闭包保证一个vue实例拥有自己的一份props

                default() {

                    return {

                        title: {

                            text: "vue-Echarts"

                        },

                        legend: {

                            data: ["销量"]

                        },

                        xAxis: {

                            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","tuoxie"]

                        },

                        series: [

                            {

                                name: "销量",

                                type: "line",

                                data: [5, 20, 36, 10, 10, 70]

                            }

                        ]

                    };

                }

            }

        },
        //在Chart.vue中加入watch

        watch: {

            //观察option的变化

            option: {

                handler(newVal, oldVal) {

                    if (this.chart) {

                        if (newVal) {

                            this.chart.setOption(newVal);

                        } else {

                            this.chart.setOption(oldVal);

                        }

                    } else {

                        this.init();

                    }

                },

                deep: true //对象内部属性的监听，关键。

            }

        },

        computed: {

            style() {

                return {

                    height: this.height,

                    width: this.width

                };

            }

        },

        mounted() {

            this.init();

        },

        methods: {

            init() {

                this.chart = this.$echarts.init(document.getElementById(this.id));

                this.chart.setOption(this.option);

            }

        }

    };

</script>