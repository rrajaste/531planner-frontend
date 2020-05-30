<template>
    <div class="text-center" v-if="bodyMeasurement">
        <h1 class="text-uppercase">{{translations.bodyMeasurements.editTitle}}</h1>
        <h3 class="">{{translations.bodyMeasurements.loggedAt}}: {{ this.bodyMeasurement.loggedAt }}</h3>
        <h4 class="text-uppercase"><router-link to="/bodymeasurements">{{translations.bodyMeasurements.backToList}}</router-link></h4>
        <h3 class="text-danger mb-5">{{ message }}</h3>
        <BodyMeasurementCreateForm v-if="bodyMeasurement" :bodyMeasurement="bodyMeasurement" v-on:bodymeasurement-form-submitted="onSubmit"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import BodyMeasurementCreateForm from "../../components/BodyMeasurementCreateForm.vue"
import { IBodyMeasurementEdit, IBodyMeasurement } from "@/domain/BodyMeasurement"
import store from "../../store"
import router from '../../router'
import { UnitTypes } from '../../types/UnitTypes'
import { UnitTypeConverter } from '../../calculators/unitTypeConverter'
import { IAppTranslation } from '@/resources/translations/IAppTranslation'

@Component({
    components: {
        BodyMeasurementCreateForm
    }
})

export default class BodymeasurementsEdit extends Vue {
    @Prop() id!: string

    private message = ""

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    get bodyMeasurement (): IBodyMeasurement | null {
        return store.getters.convertedBodyMeasurementToMutate
    }

    async mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        }
        const apiResponse = store.dispatch("getSingleBodyMeasurement", this.id)
        if (!apiResponse) {
            this.message = "Backend communication failed"
        }
    }

    async onSubmit (dto: IBodyMeasurementEdit) {
        dto.id = this.id
        const apiResponse = await store.dispatch("updateBodyMeasurement", dto)
        if (apiResponse !== false) {
            router.push("/bodymeasurements")
        } else {
            this.displayErrorMessage()
        }
    }

    displayErrorMessage () {
        this.message = "Communication with backend failed"
    }
}
</script>
