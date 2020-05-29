<script>
import { Line } from "vue-chartjs";

export default {
    extends: Line,
    props: {
        label: {
            type: String
        },
        xData: {
            type: Array
        },
        yData: {
            type: Array
        },
        options: {
            type: Object
        },
        chartColors: {
            type: Object
        }
    },
    methods: {
        createChart: function() {
            const {
                borderColor,
                pointBorderColor,
                pointBackgroundColor,
                backgroundColor
            } = this.chartColors;

            this.renderChart(
                {
                    labels: this.xData,
                    datasets: [
                        {
                            label: this.label,
                            data: this.chartData,
                            borderColor: borderColor,
                            pointBorderColor: pointBorderColor,
                            pointBackgroundColor: pointBackgroundColor,
                            backgroundColor: backgroundColor
                        }
                    ]
                },
                this.options
            );
        }
    },
    mounted() {
        this.createChart();
    },
    updated() {
        this.createChart();
    },
    computed: {
        chartData: function() {
            return this.yData;
        }
    },
    watch: {
        xData: function() {
            this._chart.destroy();
            this.createChart();
        }
    }
};
</script>
