<template>
    <div>
        <h1 class="display-4 text-uppercase text-center">Body measurements</h1>
        <div class="text-center m-3">
            <h3>
                <router-link
                    to="/bodymeasurements/create"
                    class="text-uppercase text-center m-2 p-2"
                >ADD NEW</router-link>
            </h3>
        </div>
        <div>
            <div class="text-center m-3">
                <h2 class="text-uppercase text-center border-top pt-4 pb-3">Current stats</h2>
            </div>
            <CurrentBodyStats />
        </div>
        <div v-if="bodyMeasurements.length > 1">
            <BodyStatsChart
                :xDaya="bodyMeasurements.loggedAt"
                :yDaya="bodyMeasurements.weight"
                :chartColors="chartColors"
                :options="chartOptions"
                label="Weight"
            />
        </div>
        <div>
            <h2 class="text-uppercase text-center border-top pt-4 pb-3">Body measurements log</h2>
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
import BodyStatsChart from "@/components/LineChart.vue";

@Component({
    components: {
        BodyMeasurementsLog,
        CurrentBodyStats,
        BodyStatsChart
    }
})
export default class BodymeasurementsIndex extends Vue {
    get bodyMeasurements() {
        return store.getters.convertedBodyMeasurements;
    }

    get chartOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
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

    async mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("account/login");
        }
        await store.commit("getBodyMeasurements");
    }
}
</script>
