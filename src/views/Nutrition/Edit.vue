<template>
    <div>
        <h1>Edit</h1>
        <hr/>
        <h3 class="text-danger">{{ message }}</h3>
        <NutritionCreateForm :nutritionIntake="nutritionIntake" v-on:nutrition-intake-form-submitted="onSubmit"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import NutritionCreateForm from "../../components/NutritionCreateForm.vue"
import { INutritionIntakeCreate, INutritionIntakeEdit } from "@/domain/NutritionIntake"
import store from "../../store"
import router from '../../router'

@Component({
    components: {
        NutritionCreateForm
    }
})

export default class NutritionEdit extends Vue {
    @Prop() id!: string

    private message = ""
    private nutritionIntake: INutritionIntakeCreate | null = null

    async created () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        } else {
            const apiResponse = await store.dispatch("getSingleNutritionIntake", this.id)
            if (apiResponse !== null) {
                this.nutritionIntake = apiResponse
            } else {
                this.displayErrorMessage()
            }
        }
    }

    async onSubmit (dto: INutritionIntakeEdit) {
        dto.id = this.id
        const apiResponse = await store.dispatch("updateNutritionIntake", dto)
        if (apiResponse !== null) {
            router.push("/nutrition")
        } else {
            this.displayErrorMessage()
        }
    }

    displayErrorMessage () {
        this.message = "Communication with backend failed"
    }
}
</script>
