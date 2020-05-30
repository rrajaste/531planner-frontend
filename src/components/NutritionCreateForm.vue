<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-4 col-sm-5 p-0 m-0">
                <form @submit.prevent="onSubmit">
                    <div class="form-row">
                        <div class="form-group">
                            <label>{{ translations.nutrition.calories }}*</label>
                            <input
                                type="number"
                                step="any"
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
                        <div class="form-group">
                            <label>{{ translations.nutrition.protein }}*</label>
                            <input
                                type="number"
                                step="any"
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
                        <div class="form-group">
                            <label>{{ translations.nutrition.carbohydrates }}*</label>
                            <input
                                type="number"
                                step="any"
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
                        <div class="form-group">
                            <label>{{translations.nutrition.fats}}*</label>
                            <input
                                type="number"
                                step="any"
                                class="form-control"
                                v-model.number="fats.value"
                                :class="fats.bootstrapValidationClass"
                            />
                            <div class="invalid-feedback">
                                <span>{{ fats.errorMessage }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <button type="submit" class="btn btn-success text-uppercase">{{translations.nutrition.submit}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang=ts>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import NumberInputObject from "../formvalidation/NumberInputObject";
import {
    INutritionIntake,
    INutritionIntakeCreate
} from "../domain/NutritionIntake";
import store from "@/store";
import { IAppTranslation } from "@/resources/translations/IAppTranslation";
@Component
export default class NutritionCreateForm extends Vue {
    @Prop()
    nutritionIntake!: INutritionIntake;

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    private calories = new NumberInputObject({
        displayName: "Calories",
        isRequired: true,
        min: 1,
        max: 10000
    });

    private protein = new NumberInputObject({
        displayName: "Protein",
        isRequired: true,
        min: 1,
        max: 1000
    });

    private carbohydrates = new NumberInputObject({
        displayName: "Carbohydrates",
        isRequired: true,
        min: 1,
        max: 1000
    });

    private fats = new NumberInputObject({
        displayName: "Fats",
        isRequired: true,
        min: 1,
        max: 1000
    });

    mounted() {
        if (this.nutritionIntake) {
            this.calories.value = this.nutritionIntake.calories;
            this.protein.value = this.nutritionIntake.protein;
            this.fats.value = this.nutritionIntake.fats;
            this.carbohydrates.value = this.nutritionIntake.carbohydrates;
        }
    }

    async onSubmit() {
        const dto: INutritionIntakeCreate = {
            calories: this.calories.value,
            fats: this.fats.value,
            carbohydrates: this.carbohydrates.value,
            protein: this.protein.value
        };
        if (this._isFormValid()) {
            this.$emit("nutrition-intake-form-submitted", dto);
        }
    }

    private _isFormValid() {
        return (
            this.calories.isValid &&
            this.protein.isValid &&
            this.carbohydrates.isValid &&
            this.fats.isValid
        );
    }
}
</script>
