<template>
    <div class="hello" id="chartdiv" ref="chartdiv"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import {mapGetters} from "vuex";

export default {
    name: "AppChart",
    watch: {
        getData: function (newData) {
            this.showChart(newData)
        }
    },
    computed: mapGetters(['getData']),
    methods: {
        showChart(data) {
            let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

            chart.data = data;


            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.renderer.minGridDistance = 30;

            chart.yAxes.push(new am4charts.ValueAxis());

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

            this.$store.state.filter.selected.forEach(e => {
                createSeries(e, e);
            })

            chart.legend = new am4charts.Legend();
            chart.cursor = new am4charts.XYCursor();

            this.chart = chart;
        }
    },
    mounted() {
        this.getData.length > 0 && this.showChart(this.getData)
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
    height: 400px;
}
</style>