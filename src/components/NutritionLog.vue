<template>
    <div class="text-center">
        <table class="table" v-if="nutritionIntakes">
            <thead>
                <tr>
                    <th>{{ translations.nutrition.loggedAt}}</th>
                    <th>{{ translations.nutrition.calories}}</th>
                    <th>{{ translations.nutrition.protein}} (g)</th>
                    <th>{{ translations.nutrition.fats}} (g)</th>
                    <th>{{ translations.nutrition.carbohydrates}} (g)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="intake in nutritionIntakes" :key="intake.Id">
                    <td>{{ toLocaleDateString(new Date(intake.loggedAt)) }}</td>
                    <td>{{ intake.calories }}{{ }}</td>
                    <td>{{ intake.protein }}</td>
                    <td>{{ intake.fats }}</td>
                    <td>{{ intake.carbohydrates }}</td>
                    <td>
                        <div class="row justify-content-left">
                            <router-link
                                class="mx-1"
                                :to="{ name: 'NutritionEdit', params: { id: intake.id } }"
                            >
                                <font-awesome-icon icon="pen" class="text-primary" />
                            </router-link>
                            <router-link
                                :to="{ name: 'NutritionDelete', params: { id: intake.id } }"
                            >
                                <font-awesome-icon icon="trash" class="text-danger mx-1" />
                            </router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { INutritionIntake } from "@/domain/NutritionIntake";
import store from "@/store";
import router from "@/router";
import { IAppTranslation } from '@/resources/translations/IAppTranslation';
import { UnitTypeConverter } from '@/converters/unitTypeConverter';

@Component
export default class NutrtionLog extends Vue {
    get nutritionIntakes() {
        return store.state.nutritionIntakes;
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    toLocaleDateString(date: Date) {
        return UnitTypeConverter.toLocalString(date)
    }
}
</script>
