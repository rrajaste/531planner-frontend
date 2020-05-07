<template>
    <div>
        <h3 class="text-danger">{{message}}</h3>
        <h1>Delete</h1>
        <h3>Are you sure you want to delete this?</h3>
        <NutritionIntakeDetails :nutritionIntake="nutritionIntake" />
        <router-link to="/nutrition">Back to List</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import NutritionIntakeDetails from "../../components/NutritionIntakeDetails.vue"
import { INutritionIntake } from "../../domain/NutritionIntake"
import router from '../../router'
import store from '@/store'

@Component({
    components: {
        NutritionIntakeDetails
    }
})
export default class NutritionIntakesDetails extends Vue {
    @Prop()
    private id!: string

    private message = ""
    private nutritionIntake: INutritionIntake | null = null;
    async created () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        } else {
            const apiResponse = await store.dispatch("getSingleNutritionIntake", this.id)
            if (apiResponse != null) {
                this.nutritionIntake = apiResponse
            } else {
                this.message = "Failed to communicate with backend api"
            }
        }
    }
}
</script>
