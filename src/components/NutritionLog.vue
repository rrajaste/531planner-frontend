<template>
    <div class="text-center">
        <table class="table" v-if="nutritionIntakes">
            <thead>
                <tr>
                    <th>Logged at</th>
                    <th>Calories</th>
                    <th>Protein (g)</th>
                    <th>Fats (g)</th>
                    <th>Carbohydrates (g)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="intake in nutritionIntakes" :key="intake.Id">
                    <td>{{ intake.loggedAt }}</td>
                    <td>{{ intake.calories }}{{ }}</td>
                    <td>{{ intake.protein }}</td>
                    <td>{{ intake.fats }}</td>
                    <td>{{ intake.carbohydrates }}</td>
                    <td>
                        <div class="row justify-content-left">
                            <router-link class="mx-1" :to="{ name: 'NutritionEdit', params: { id: intake.id } }">
                                <font-awesome-icon icon="pen" class="text-primary"/>
                            </router-link>
                            <router-link :to="{ name: 'NutritionDelete', params: { id: intake.id } }">
                                <font-awesome-icon icon="trash" class="text-danger mx-1"/>
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

@Component
export default class NutrtionLog extends Vue {
    get nutritionIntakes() {
        return store.state.nutritionIntakes;
    }
}
</script>
