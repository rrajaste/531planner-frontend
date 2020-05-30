<template>
    <div class="text-left">
        <div v-if="nutritionIntake">
            <h3 class="text-danger">{{message}}</h3>
            <h1 class="text-uppercase">{{translations.nutrition.deleteTitle}}</h1>
            <h3>{{translations.nutrition.deleteConfirmed}}</h3>
            <NutritionIntakeDetails :nutritionIntake="nutritionIntake" />
            <form @submit="onSubmit">
            <input type="submit" :value="translations.nutrition.delete" class="btn btn-danger" /> |
            <router-link to="/nutrition">{{translations.nutrition.backToList}}</router-link>
        </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import NutritionIntakeDetails from "../../components/NutritionIntakeDetails.vue"
import store from "../../store"
import router from "../../router"
import { INutritionIntake } from "../../domain/NutritionIntake"
import { IAppTranslation } from '@/resources/translations/IAppTranslation'

@Component({
    components: {
        NutritionIntakeDetails
    }
})
export default class NutritionIntakeDelete extends Vue {
    @Prop()
    private id!: string

    get nutritionIntake() {
        return store.state.nutritionIntakeToMutate;
    }

    private message = ""

    async created () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        } else {
            const apiResponse = await store.dispatch("getSingleNutritionIntake", this.id)
            if (apiResponse === false) {
                this.message = "Failed to communicate with backend api"
            }
        }
    }

    async onSubmit () {
        const apiResponse = await store.dispatch("deleteNutritionIntake", this.id
        )
        if (apiResponse !== false) {
            router.push("/nutrition")
        } else {
            this.message = "Failed to communicate with backend api"
        }
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
    }
}
</script>
