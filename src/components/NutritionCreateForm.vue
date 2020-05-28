<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <div class="radio">
                    <label>
                        <input type="radio" name="optradio" checked @click=" () => { this.measurement = 'metric' }"> Metric
                    </label>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ calories.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="calories.value"
                        :class="calories.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ calories.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ protein.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="protein.value"
                        :class="protein.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ protein.errorMessage }}</span>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ carbohydrates.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="carbohydrates.value"
                        :class="carbohydrates.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ carbohydrates.errorMessage }}</span>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ fats.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="fats.value"
                        :class="fats.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ fats.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script lang=ts>

import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import NumberInputObject from "../formvalidation/NumberInputObject"
import { INutritionIntake, INutritionIntakeCreate } from "../domain/NutritionIntake"
@Component
export default class NutritionCreateForm extends Vue {
    private measurement = "metric"
    @Prop()
    nutritionIntake: INutritionIntake | null = null

    private calories = new NumberInputObject({
        displayName: "Calories",
        isRequired: true,
        min: 1,
        max: 10000
    })

    private protein = new NumberInputObject({
        displayName: "Protein",
        isRequired: true,
        min: 1,
        max: 1000
    })

    private carbohydrates = new NumberInputObject({
        displayName: "Carbohydrates",
        isRequired: true,
        min: 1,
        max: 10000
    })

    private fats = new NumberInputObject({
        displayName: "Fats",
        isRequired: true,
        min: 1,
        max: 10000
    })

    async onSubmit () {
        const dto: INutritionIntakeCreate = {
            calories: this.calories.value,
            fats: this.fats.value,
            carbohydrates: this.carbohydrates.value,
            protein: this.protein.value
        }
        if (this._isFormValid()) {
            this.$emit('nutrition-intake-form-submitted', dto)
        }
    }

    @Watch('nutritionIntake')
    propChanged () {
        if (this.nutritionIntake !== null) {
            this.calories.value = this.nutritionIntake.calories
            this.fats.value = this.nutritionIntake.fats ?? 0
            this.protein.value = this.nutritionIntake.protein ?? 0
            this.carbohydrates.value = this.nutritionIntake.carbohydrates ?? 0
        }
    }

    private _isFormValid () {
        return this.calories.isValid &&
        this.protein.isValid &&
        this.carbohydrates.isValid &&
        this.fats.isValid
    }
}
</script>
