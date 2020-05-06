<template>
    <div>
        <h3 class="text-danger">{{message}}</h3>
        <h1>Delete</h1>
        <h3>Are you sure you want to delete this?</h3>
        <NutritionIntakeDetails :nutritionIntake="nutritionIntake" />
        <form @submit="onSubmit">
            <input type="submit" value="Delete" class="btn btn-danger" /> |
            <router-link to="/nutritionIntakes">Back to List</router-link>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import NutritionIntakeDetails from "../../components/NutritionIntakeDetails.vue"
import store from "../../store"
import router from "../../router"
import { INutritionIntake } from "../../domain/NutritionIntake"

@Component({
    components: {
        NutritionIntakeDetails
    }
})
export default class NutritionIntakeDelete extends Vue {
    @Prop()
    private id!: string

    public nutritionIntake: INutritionIntake | null = null
    private message = ""

    async created () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        } else {
            const apiResponse = await store.dispatch(
                "getSingleNutritionIntake",
                this.id
            )
            if (apiResponse != null) {
                this.nutritionIntake = apiResponse
            } else {
                this.message = "Failed to communicate with backend api"
            }
        }
    }

    async onSubmit () {
        const apiResponse = await store.dispatch(
            "deleteNutritionIntake",
            this.id
        )
        if (apiResponse != null) {
            router.push("/nutrition")
        } else {
            this.message = "Failed to communicate with backend api"
        }
    }
}
</script>
