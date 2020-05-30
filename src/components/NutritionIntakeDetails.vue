<template>
    <div class="text-left">
        <h3>{{ translations.nutrition.indexTitle}}</h3>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">{{ translations.nutrition.loggedAt}}</dt>
            <dd class="col-sm-10">{{ nutritionIntake.loggedAt }}</dd>
            <dt class="col-sm-2">{{ translations.nutrition.caloreis}}</dt>
            <dd class="col-sm-10">{{ nutritionIntake.calories }}</dd>
            <dt class="col-sm-2">{{ translations.nutrition.protein}}</dt>
            <dd class="col-sm-10">{{ nutritionIntake.protein }}</dd>
            <dt class="col-sm-2">{{ translations.nutrition.fats}}</dt>
            <dd class="col-sm-10">{{ nutritionIntake.fats }}</dd>
            <dt class="col-sm-2">{{ translations.nutrition.carbohydrates}}</dt>
            <dd class="col-sm-10">{{ nutritionIntake.carbohydrates }}</dd>
        </dl>
    </div>
</template>

<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator"
import { INutritionIntake } from '../domain/NutritionIntake'
import { IAppTranslation } from '@/resources/translations/IAppTranslation';
import store from '@/store';

@Component
export default class NutritionIntakeDetails extends Vue {
    @Prop()
    public nutritionIntake!: INutritionIntake

    get translations(): IAppTranslation {
        return store.getters.translations;
    }
}
</script>
