<template>
    <div>
        <h1 class="display-4 text-uppercase text-center">{{translations.bodyMeasurements.indexTitle}}</h1>
        <div class="text-center m-3">
            <h3>
                <router-link
                    to="/bodymeasurements/create"
                    class="text-uppercase text-center m-2 p-2"
                >{{translations.bodyMeasurements.addNew}}</router-link>
            </h3>
        </div>
        <div>
            <UnitTypeSelection/>
        </div>
        <div>
            <div class="text-center m-3">
                <h2 class="text-uppercase text-center border-top pt-4 pb-3">{{translations.bodyMeasurements.currentStats}}</h2>
            </div>
            <CurrentBodyStats />
        </div>
        <WeightChart v-if="bodyMeasurements"/>
        <div>
            <h2 class="text-uppercase text-center border-top pt-4 pb-3">{{translations.bodyMeasurements.bodyMeasurementsLog}}</h2>
            <BodyMeasurementsLog />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IBodyMeasurement } from "../../domain/BodyMeasurement";
import store from "../../store";
import router from "@/router";
import BodyMeasurementsLog from "@/components/BodyMeasurementsLog.vue";
import CurrentBodyStats from "@/components/CurrentBodyStats.vue";
import UnitTypeSelection from "@/components/UnitTypeSelection.vue"
import WeightChart from "@/components/WeightChart.vue";
import { IAppTranslation } from '@/resources/translations/IAppTranslation';
import { UnitTypeConverter } from '@/converters/unitTypeConverter';

@Component({
    components: {
        BodyMeasurementsLog,
        CurrentBodyStats,
        UnitTypeSelection,
        WeightChart
    }
})
export default class BodymeasurementsIndex extends Vue {
    get bodyMeasurements(): IBodyMeasurement[] {
        return store.getters.convertedBodyMeasurements;
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    get chartXData(): string[] {
        return this.bodyMeasurements.map(measurement => this.toLocaleDateString(measurement.loggedAt));
    }

    get chartYData(): number[] {
        return this.bodyMeasurements.map(measurement => measurement.weight);
    }

    get minYValue(): number {
        if (this.bodyMeasurements.length < 2) {
            return 0
        }
        const orderedArray: IBodyMeasurement[] = [...this.bodyMeasurements].sort((a, b) => (a.weight - b.weight));
        const minWeight: number = orderedArray[0].weight
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
        return UnitTypeConverter.toLocalString(date)
    }

    async mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("account/login");
        }
        await store.dispatch("getAllBodyMeasurements");
    }
}
</script>
