<template>
    <div v-if="nutritionIntakes && nutritionIntakes.length > 1">
        <div v-if="nutritionIntakes.length > 1">
            <h4 class="text-center text-uppercase">Calories</h4>
            <LineChart
                :xData="chartXData"
                :yData="chartYData"
                :chartColors="chartColors"
                :options="chartOptions"
                label="Calories"
            />
        </div>
    </div>
</template>
<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator"
import LineChart from "./LineChart.vue"
import store from '@/store'
import { INutritionIntake } from '../domain/NutritionIntake'

@Component({
    components: {
        LineChart
    }
})
export default class CaloriesChart extends Vue {
    get nutritionIntakes(): INutritionIntake[] | null {
        return store.state.nutritionIntakes
    }

    get chartColors() {
        return {
            borderColor: "#3C91E6",
            pointBorderColor: "#363457",
            pointBackgroundColor: "#363457",
            backgroundColor: ""
        };
    }

    get chartYData(): number[] {
        if (this.nutritionIntakes !== null) {
            return this.nutritionIntakes.map(intake => intake.calories)
        } else {
            return []
        }
    }

    get chartXData(): Date[] {
        if (this.nutritionIntakes !== null) {
            return this.nutritionIntakes.map(intake => intake.loggedAt)
        } else {
            return []
        }
    }

    get minYValue(): number {
        if (this.nutritionIntakes) {
            const orderedArray: INutritionIntake[] = this.nutritionIntakes.sort((a, b) => (a.calories - b.calories));
            const min: number = orderedArray[0].calories
            return min / 2
        }
        return 0
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

    async mounted() {
        await store.dispatch("getAllNutritionIntakes")
    }
}
</script>
