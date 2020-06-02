<template>
    <div v-if="bodyMeasurements.length > 1">
        <BodyStatsChart
            :xData="chartXData"
            :yData="chartYData"
            :chartColors="chartColors"
            :options="chartOptions"
            :label="this.translations.bodyMeasurements.weight"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IBodyMeasurement } from "@/domain/BodyMeasurement";
import store from "@/store";
import BodyMeasurementsLog from "@/components/BodyMeasurementsLog.vue";
import CurrentBodyStats from "@/components/CurrentBodyStats.vue";
import UnitTypeSelection from "@/components/UnitTypeSelection.vue";
import BodyStatsChart from "@/components/LineChart.vue";
import { IAppTranslation } from "@/resources/translations/IAppTranslation";
import { UnitTypeConverter } from "@/converters/unitTypeConverter";

@Component({
    components: {
        BodyMeasurementsLog,
        CurrentBodyStats,
        BodyStatsChart,
        UnitTypeSelection
    }
})
export default class WeightChart extends Vue {
    get bodyMeasurements(): IBodyMeasurement[] {
        return store.getters.convertedBodyMeasurements;
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    get chartXData(): string[] {
        return this.bodyMeasurements.map(measurement =>
            this.toLocaleDateString(measurement.loggedAt)
        );
    }

    get chartYData(): number[] {
        return this.bodyMeasurements.map(measurement => measurement.weight);
    }

    get minYValue(): number {
        const orderedArray: IBodyMeasurement[] = [
            ...this.bodyMeasurements
        ].sort((a, b) => a.weight - b.weight);
        const minWeight: number = orderedArray[0].weight;
        return minWeight / 1.2;
    }

    get chartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            min: this.minYValue
                        }
                    }
                ]
            }
        };
    }

    get chartColors() {
        return {
            borderColor: "#3C91E6",
            pointBorderColor: "#363457",
            pointBackgroundColor: "#363457",
            backgroundColor: ""
        };
    }

    toLocaleDateString(date: Date) {
        return UnitTypeConverter.toLocalString(date);
    }
}
</script>
