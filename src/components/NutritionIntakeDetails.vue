<template>
    <div>
        <h4>Nutrition intake</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">Logged at</dt>
            <dd class="col-sm-10">{{ nutritionIntake.loggedAt }}</dd>
            <dt class="col-sm-2">Calories</dt>
            <dd class="col-sm-10">{{ nutritionIntake.calories }}</dd>
            <dt class="col-sm-2">Protein</dt>
            <dd class="col-sm-10">{{ nutritionIntake.protein }}</dd>
            <dt class="col-sm-2">Fats</dt>
            <dd class="col-sm-10">{{ nutritionIntake.fats }}</dd>
            <dt class="col-sm-2">Carbohydrates</dt>
            <dd class="col-sm-10">{{ nutritionIntake.carbohydrates }}</dd>
        </dl>
    </div>
</template>

<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator"
import { INutritionIntake } from '../domain/NutritionIntake'

@Component
export default class NutritionIntakeDetails extends Vue {
    @Prop()
    public nutritionIntake: INutritionIntake | null = null
}
</script>
