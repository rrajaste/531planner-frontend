<template>
    <div>
        <h3 class="text-danger">{{ message }}</h3>
        <BodyMeasurementCreateForm :bodyMeasurement="bodyMeasurement" v-on:bodymeasurement-form-submitted="onSubmit"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import BodyMeasurementCreateForm from "../../components/BodyMeasurementCreateForm.vue"
import { INutritionIntakeCreate, INutritionIntakeEdit } from "@/domain/NutritionIntake"
import store from "../../store"
import router from '../../router'

@Component({
    components: {
        BodyMeasurementCreateForm
    }
})

export default class NutritionIntakeEdit extends Vue {
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
