//堆叠柱状图
export function drawStackingBarChart(result,data) {
    //https://echarts.apache.org/examples/zh/editor.html?c=bar-label-rotation
    data.seriesArray.forEach(val => {
        val.label = result.labelOption;
    })
    let option = {
        backgroundColor: result.background,
        title: result.titles,
        legend: Object.assign({}, result.legendStyle, {
            data: data.legend_data
        }),
        grid: {
            left: '5%',
            right: '10%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            Object.assign({}, {
                type: 'category',
                data: data.xArray,
                nameTextStyle: result.nameTextStyle,
                axisLine: result.xaxisLine,
                axisLabel: result.xaxisLabel,
            }, result.xAxis)
        ],
        yAxis: Object.assign({}, {
            type: 'value',
            nameTextStyle: result.nameTextStyle,
            axisLine: result.yaxisLine,
            axisLabel: result.yaxisLabel,
        }, result.yAxis),
        series: data.seriesArray
    };
    return option;
}