<template>
<div id='join_pk_analysis_result'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>联合主键及表函数分析结果</span>
        <router-link to="/tdb_result">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
        <el-col :span="6" :offset="10">
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
                <el-form-item label="表名" prop="table_name" title="表名称搜索">
                    <!-- <el-input type="text" placeholder="表名" v-model="searchForm.table_name" /> -->
                    <el-select v-model="searchForm.table_name" filterable placeholder="请选择" clearable>
                        <el-option v-for="item in table_code_s" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="searchResults('searchForm')">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <!--echarts tree 展示血缘关系-->
    <div id="echarsTree" style="width: 100%; height: 800px" />
</div>
</template>

<script>
import * as tdbFun from "./tdb_result";
export default {
    data() {
        return {
            table_code_s: [],
            //搜索
            searchForm: {
                table_name: ''
            },
            //联合主键分析结果
            join_pk_analysis_result: {},
            //表函数分析结果
            table_func_dep_result: {},
        };
    },
    mounted() {
        //打开提示信息
        this.open();
        this.getJoinPKAnalysisAndTableFuncDepTableCodeList();
    },
    methods: {
        //获取表联合主键和表函数分析表名list
        getJoinPKAnalysisAndTableFuncDepTableCodeList() {
            tdbFun.getJoinPKAnalysisAndTableFuncDepTableCodeList().then(res => {
                let table_code_list = [];
                table_code_list = res.data;
                table_code_list.forEach(table_code => {
                    let table_code_info = {};
                    table_code_info["lable"] = table_code;
                    table_code_info["value"] = table_code;
                    this.table_code_s.push(table_code_info);
                });
                //页面加载完成后,默认显示第一张表的分析结果
                this.searchForm.table_name = table_code_list[0];
                this.getJoinPKAnalysisResult();
                this.getTableFuncDepResult();
            })
        },
        //根据搜索条件获取搜索结果
        searchResults() {
            this.getJoinPKAnalysisResult();
            this.getTableFuncDepResult();
        },
        //获取联合主键分析结果
        getJoinPKAnalysisResult() {
            tdbFun.getJoinPKAnalysisResult(this.searchForm).then(res => {
                this.join_pk_analysis_result = res.data;
                //设置 echarsTree
                this.setEcharsTree();
            })
        },
        //获取表函数分析结果
        getTableFuncDepResult() {
            tdbFun.getTableFuncDepResult(this.searchForm).then(res => {
                this.table_func_dep_result = res.data;
                //设置 echarsTree
                this.setEcharsTree();
            })
        },
        //设置 echars tree 
        setEcharsTree() {
            var myChart = this.$echarts.init(document.getElementById("echarsTree"));
            myChart.showLoading(); //显示Loading标志；
            myChart.hideLoading(); //得到数据后隐藏Loading标志
            //间隔展开子数据 table_func_dep_result:表函数分析结果树 默认展开2层
            echarts.util.each(this.table_func_dep_result.children, function (datum, index) {
                index % 2 === 0 && (datum.collapsed = true);
            });
            var option = {
                tooltip: { //提示框组件
                    trigger: 'item', //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
                    triggerOn: 'mousemove' //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：
                },
                legend: {
                    top: '2%',
                    left: '3%',
                    orient: 'vertical',
                    data: [{
                            name: '表函数分析结果',
                            icon: 'rectangle'
                        },
                        {
                            name: '联合主键分析结果',
                            icon: 'rectangle'
                        }
                    ],
                    borderColor: '#c23531'
                },
                series: [{ //系列列表
                        type: 'tree', //树形结构
                        name: '表函数分析结果',
                        data: [this.table_func_dep_result], //需要展现的数据
                        top: '5%', //距离上
                        left: '13%', //距离左
                        bottom: '2%', //距离下
                        right: '55%', //距离右
                        symbolSize: 7, //标记的大小，就是那个小圆圈，默认7
                        label: { //每个节点所对应的标签的样式
                            position: 'left', //标签的位置
                            verticalAlign: 'middle', //文字垂直对齐方式，默认自动。可选：top，middle，bottom
                            align: 'right', //文字水平对齐方式，默认自动。可选：top，center，bottom
                            fontSize: 9 //标签文字大小
                        },
                        leaves: { //叶子节点的特殊配置，如上面的树图示例中，叶子节点和非叶子节点的标签位置不同
                            label: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        },
                        expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                        animationDuration: 550, //初始动画的时长，支持回调函数,默认1000
                        animationDurationUpdate: 750, //数据更新动画的时长，默认300
                        emphasis: {
                            focus: 'descendant'
                        },
                    },
                    {
                        type: 'tree',
                        name: '联合主键分析结果',
                        data: [this.join_pk_analysis_result],
                        top: '20%',
                        left: '60%',
                        bottom: '22%',
                        right: '20%',
                        symbolSize: 7,
                        label: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 9
                        },
                        leaves: {
                            label: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        },
                        expandAndCollapse: true,
                        animationDuration: 550,
                        animationDurationUpdate: 750,
                        emphasis: {
                            focus: 'descendant'
                        },
                    }
                ]
            };
            option && myChart.setOption(option);
            this.resize(myChart);
        },
        // tree自适应
        resize(myChart) {
            const nodes = myChart._chartsViews[0]._data._graphicEls;
            let allNode = 0;
            for (let index = 0; index < nodes.length; index++) {
                const node = nodes[index];
                if (node === undefined) {
                    continue
                }
                allNode++;
            }
            const height = window.innerHeight;
            const currentHeight = 10 * allNode;
            const newHeight = Math.max(currentHeight, height);
            const tree_ele = document.getElementById('echarsTree');
            tree_ele.style.height = newHeight + 'px';
            myChart.resize();
        },
        //页面提示
        open() {
            this.$notify({
                title: '提示',
                message: '字段依赖是指表内，左边一个或多个字段可以唯一查询到右边字段。左边字段为空，则说明，右边字段在表中为空或者是唯一值，不依赖任何字段就可以确定它的值。每张表的分组排序在最前面的左边字段，有较大概率为主键或者联合主键。',
                duration: 0
            });
        }
    }
}
</script>

<style lang="less" scoped>
#join_pk_analysis_result {
    .title {
        color: #2196f3;
        line-height: 30px;
        padding-bottom: 10px;
        font-size: 18px;
    }
}
</style>
