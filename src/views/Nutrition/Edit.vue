<template>
    <div class="text-center">
        <h1 class="text-uppercase">Edit logged nutrtion intake</h1>
        <h3 class="text-danger">{{ message }}</h3>
        <h3 class="text-uppercase"><router-link to="/nutrition">BACk</router-link></h3>
        <div v-if="nutritionIntake">
            <NutritionCreateForm :nutritionIntake="nutritionIntake" v-on:nutrition-intake-form-submitted="onSubmit"/>
        </div>
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

export default class NutritionIntakeEdit extends Vue {
    @Prop() id!: string

    private message = ""
    get nutritionIntake (): INutritionIntakeCreate | null {
        return store.state.nutritionIntakeToMutate;
    }

    async mounted () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        } else {
            const apiResponse = await store.dispatch("getSingleNutritionIntake", this.id)
            if (apiResponse === false) {
                this.displayErrorMessage()
            }
        }
    }

    async onSubmit (dto: INutritionIntakeEdit) {
        dto.id = this.id
        const apiResponse = await store.dispatch("updateNutritionIntake", dto)
        if (apiResponse !== false) {
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
