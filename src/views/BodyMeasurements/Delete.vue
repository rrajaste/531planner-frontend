<template>
     <div class="text-left">
        <h3 class="text-danger">{{message}}</h3>
        <h1 class="text-uppercase">{{ translations.bodyMeasurements.deleteTitle }}</h1>
        <h3>{{ translations.bodyMeasurements.deleteConfirm }}</h3>
        <BodyMeasurementDetails v-if="bodyMeasurement" :bodyMeasurement="bodyMeasurement"></BodyMeasurementDetails>
        <form @submit="onSubmit">
            <input type="submit" :value="translations.bodyMeasurements.deleteButton" class="btn btn-danger" /> |
            <router-link to="/bodymeasurements">{{ translations.bodyMeasurements.backToList }}</router-link>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import BodyMeasurementDetails from "../../components/BodyMeasurementDetails.vue"
import { IBodyMeasurement } from "../../domain/BodyMeasurement"
import store from '../../store'
import router from '../../router'
import { IAppTranslation } from '@/resources/translations/IAppTranslation'

@Component({
    components: {
        BodyMeasurementDetails
    }
})

export default class BodymeasurementsDelete extends Vue {
    @Prop()
    private id!: string

    public bodyMeasurement: IBodyMeasurement | null = null
    private message = ""

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    async mounted () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        } else {
            const apiResponse = await store.dispatch("getSingleBodyMeasurement", this.id)
            if (apiResponse === false) {
                this.message = "Failed to communicate with backend api"
            }
        }
    }

    async onSubmit () {
        const apiResponse = await store.dispatch("deleteBodyMeasurement", this.id)
        if (apiResponse !== false) {
            store.dispatch("getAllBodyMeasurements")
            router.push("/bodymeasurements")
        } else {
            this.message = "Failed to communicate with backend api"
        }
    }
}
</script>
