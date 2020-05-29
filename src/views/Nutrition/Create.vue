<template>
    <div class="text-center">
        <h1 class="text-uppercase">
            Log your nutrition intake
        </h1>
        <h3 class="text-danger">{{message}}</h3>
        <h3 class="text-uppercase"><router-link to="/nutrition">BACk</router-link></h3>
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

export default class NutritionIntakesCreate extends Vue {
    private message = ""

    async mounted () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        }
    }

    async onSubmit (dto: INutritionIntakeCreate) {
        const apiResponse = await store.dispatch("createNutritionIntake", dto)
        if (apiResponse !== false) {
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
