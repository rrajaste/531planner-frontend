<template>
    <div class="text-center">
        <h1 class="text-uppercase">
            {{ translations.nutrition.createTitle }}
        </h1>
        <h3 class="text-danger">{{message}}</h3>
        <h3 class="text-uppercase"><router-link to="/nutrition">{{ translations.nutrition.backToList }}</router-link></h3>
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
import { IAppTranslation } from '@/resources/translations/IAppTranslation'

@Component({
    components: {
        NutritionCreateForm
    }
})

export default class NutritionIntakesCreate extends Vue {
    private message = ""

    get isTodayLogged(): boolean | null {
        return store.getters.isTodayLogged
    }

    async mounted () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        }
        if (this.isTodayLogged !== false) {
            router.push("/nutrition")
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

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    displayErrorMessage () {
        this.message = "Creation failed"
    }
}
</script>
