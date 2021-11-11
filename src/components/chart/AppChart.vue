<template>
    <div class="hello" id="chartdiv" ref="chartdiv"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
export default {
    name: "AppChart",
    props: {
        data:{},
        selectedCurrency:[]
    },
    data() {
        return {
            chart: ''
        }
    },
    watch: {
        data: function (newData){
            this.showChart(newData)
        }
    },
    methods: {
        showChart(data) {
            let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
            let value = [];

            for (let key in data.rates) {
                let obj = {
                    'date': new Date(key)
                }
                this.selectedCurrency.forEach(e => {
                    const dateItem = data.rates[key]
                    obj = {
                        ...obj,
                        [e]:dateItem[e]
                    }
                })
                value.push(obj)
            }

            chart.data = value;


            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            console.log(valueAxis)
            function createSeries(field, name) {
                let series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.dateX = "date";
                series.name = name;
                series.tooltipText = "{dateX}: [b]{valueY}[/]";
                series.strokeWidth = 2;

                series.smoothing = "monotoneX";

                let bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.stroke = am4core.color("#fff");
                bullet.circle.strokeWidth = 2;

                return series;
            }

            this.selectedCurrency.forEach( e => {
                createSeries(e, e);
            })

            chart.legend = new am4charts.Legend();
            chart.cursor = new am4charts.XYCursor();

            this.chart = chart;
        }
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}
</script>

<style>
#chartdiv {
    width: 100%;
    height: 500px;
}
</style>