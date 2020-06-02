<template>
    <div v-if="nutritionIntakes && nutritionIntakes.length > 1">
        <div v-if="nutritionIntakes.length > 1">
            <h4 class="text-center text-uppercase">{{ translations.nutrition.protein }}</h4>
            <LineChart
                :xData="chartXData"
                :yData="chartYData"
                :chartColors="chartColors"
                :options="chartOptions"
                :label="translations.nutrition.protein"
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
export default class ProteinChart extends Vue {
    get nutritionIntakes(): INutritionIntake[] | null {
        return store.state.nutritionIntakes
    }

    get chartColors() {
        return {
            borderColor: "#E56399",
            pointBorderColor: "#320E3B",
            pointBackgroundColor: "#363457",
            backgroundColor: ""
        };
    }

    get chartYData(): number[] {
        if (this.nutritionIntakes !== null) {
            return this.nutritionIntakes.map(intake => intake.protein)
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
}
</script>
