<template>
    <div>
        <h1>Daily nutrition intake</h1>
        <h3 class="text-danger">{{message}}</h3>
        <p>
            <router-link to="/nutrition/create">Log</router-link>
        </p>
        <table class="table">
            <thead>
                <tr>
                    <th>Logged at</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Fats</th>
                    <th>Carbohydrates</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="intake in nutritionIntakes" :key="intake.Id">
                    <td >{{ intake.loggedAt }}</td>
                    <td >{{ intake.calories }}</td>
                    <td >{{ intake.protein }}</td>
                    <td >{{ intake.fats }}</td>
                    <td >{{ intake.carbohydrates }}</td>
                    <td >{{ intake.hip }}</td>
                    <td >{{ intake.arm }}</td>
                    <td >{{ intake.bodyFatPercentage }}</td>

                    <td>
                    <router-link :to="'nutrition/edit/' + intake.id">Edit</router-link> |
                        <router-link :to="'nutrition/details/' + intake.id">Details</router-link> |
                        <router-link :to="'nutrition/delete/' + intake.id">Delete</router-link> |
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { INutritionIntake } from "../../domain/NutritionIntake"
import store from "../../store"
import router from "@/router"

@Component
export default class NutritionIndex extends Vue {
    private nutritionIntakes: INutritionIntake[] | null = null;
    private message = ""

    async created () {
        if (!store.getters.isLoggedIn) {
            router.push("account/login")
        } else {
            const apiResponse = await store.dispatch("getAllNutritionIntakes")
            if (apiResponse == null) {
                this.message = "Failed to communicate with backend api"
            } else {
                this.nutritionIntakes = apiResponse
            }
        }
        console.log("fetched", this.nutritionIntakes)
    }
}
</script>
