<template>
    <div v-if="nutritionIntakes && nutritionIntakes.length > 1">
        <div v-if="nutritionIntakes.length > 1">
            <h4 class="text-center text-uppercase">{{ translations.nutrition.calories }}</h4>
            <LineChart
                :xData="chartXData"
                :yData="chartYData"
                :chartColors="chartColors"
                :options="chartOptions"
                :label="translations.nutrition.calories"
            />
        </div>
    </div>
</template>
<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator"
import LineChart from "./LineChart.vue"
import store from '@/store'
import { INutritionIntake } from '../domain/NutritionIntake'
import { IAppTranslation } from '@/resources/translations/IAppTranslation'
import { UnitTypeConverter } from '@/converters/unitTypeConverter'

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

    get chartXData(): string[] {
        if (this.nutritionIntakes !== null) {
            return this.nutritionIntakes.map(intake => this.toLocaleDateString(intake.loggedAt))
        } else {
            return []
        }
    }

    toLocaleDateString(date: Date) {
        return UnitTypeConverter.toLocalString(date)
    }

    get minYValue(): number {
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

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    async mounted() {
        await store.dispatch("getAllNutritionIntakes")
    }
}
</script>
