<template>
    <div>
        <h1>
            Log
        </h1>
        <h3 class="text-danger">{{message}}</h3>
        <hr/>
        <NutritionCreateForm v-on:nutrition-intake-form-submitted="onSubmit"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import NutritionCreateForm from "../../components/NutritionCreateForm.vue"
import { INutritionIntakeCreate } from "@/domain/NutritionIntake"
import store from "../../store"
import router from '../../router'

@Component({
    components: {
        NutritionCreateForm
    }
})

export default class NutritionCreate extends Vue {
    private message = ""

    async created () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        }
    }

    async onSubmit (dto: INutritionIntakeCreate) {
        dto.unitTypeId = "303f0c29-a99f-4876-6434-08d7f1ca8754"
        const apiResponse = await store.dispatch("createNutritionIntake", dto)
        if (apiResponse !== null) {
            router.push("/nutrition")
        } else {
            this.displayErrorMessage()
        }
    }

    displayErrorMessage () {
        this.message = "Creation failed"
    }
}
</script>
