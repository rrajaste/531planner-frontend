<template>
    <div class="border-bottom border-top py-3 text-left" v-if="statistics">
        <h3 class="text-uppercase mb-3"><b>{{translations.nutrition.predictedNeeds}}</b></h3>
        <h5 class="text-uppercase">
            TDEE:
            <b>
                {{ statistics.tdee }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(kcal)</span>
        </h5>
        <h5 class="text-uppercase">
            {{translations.nutrition.proteinNeed}}:
            <b>
                {{ statistics.predictedProteinNeed }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(g)</span>
        </h5>
        <h3 class="text-uppercase mb-3"><b>{{translations.nutrition.loggedAt}}</b></h3>
        <h5 class="text-uppercase">
            {{translations.nutrition.averageCalories}}:
            <b>
                {{ statistics.averageCalories }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(kcal)</span>
        </h5>
        <h5 class="text-uppercase">
            {{translations.nutrition.averageProtein}}:
            <b>
                {{ statistics.averageProtein }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(g)</span>
        </h5>
        <h5 class="text-uppercase">
            {{translations.nutrition.dailyTDEEDelta}}:
            <b>
                {{ getChangeStringValue(statistics.averageCaloriesTdeeDelta) }}
                <span class="text-info"></span>
            </b>
            <span class="text-lowercase">(kcal)</span>
        </h5>
        <h5 class="text-uppercase">
            {{translations.nutrition.estimatedWeightChange}}:
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
import { IAppTranslation } from '@/resources/translations/IAppTranslation';

@Component
export default class CurrentBodyStats extends Vue {
    get statistics(): INutritionStatistics | null {
        return store.state.nutritionStatistics;
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
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
