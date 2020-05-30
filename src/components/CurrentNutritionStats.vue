<template>
    <div class="border-bottom border-top py-3 text-left" v-if="statistics">
        <h3 class="text-uppercase mb-3"><b>Predicted daily needs</b></h3>
        <h5 class="text-uppercase">
            TDEE:
            <b>
                {{ statistics.tdee }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(kcal)</span>
        </h5>
        <h5 class="text-uppercase">
            protein need:
            <b>
                {{ statistics.predictedProteinNeed }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(g)</span>
        </h5>
        <h3 class="text-uppercase mb-3"><b>Logged</b></h3>
        <h5 class="text-uppercase">
            Average calories:
            <b>
                {{ statistics.averageCalories }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(kcal)</span>
        </h5>
        <h5 class="text-uppercase">
            average Protein:
            <b>
                {{ statistics.averageProtein }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(g)</span>
        </h5>
        <h5 class="text-uppercase">
            daily tdee delta:
            <b>
                {{ getChangeStringValue(statistics.averageCaloriesTdeeDelta) }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(kcal)</span>
        </h5>
        <h5 class="text-uppercase">
            Estimated weight change:
            <b>
                {{ getChangeStringValue(statistics.predictedWeightChange) }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(kg)</span>
        </h5>
    </div>
</template>

<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator";
import { INutritionStatistics } from "../domain/NutritionStatistics";
import store from "@/store";

@Component
export default class CurrentBodyStats extends Vue {
    get statistics(): INutritionStatistics | null {
        return store.state.nutritionStatistics;
    }

    get weightAbbreviation(): string {
        return store.getters.unitTypeWeightAbbreviation;
    }

    getChangeStringValue(change: number): string {
        return change < 0 ? change.toString() : "+" + change.toString();
    }

    mounted() {
        store.dispatch("getNutritionStatistics");
    }
}
</script>
