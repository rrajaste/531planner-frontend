<template>
    <div class="text-center" v-if="bodyMeasurement">
        <h1 class="text-uppercase">EDIT LOGGED BODY MEASUREMENT</h1>
        <h3 class="">Logged at: {{ this.bodyMeasurement.loggedAt }}</h3>
        <router-link to="/bodymeasurements">BACK</router-link>
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

@Component({
    components: {
        BodyMeasurementCreateForm
    }
})

export default class BodymeasurementsEdit extends Vue {
    @Prop() id!: string

    private message = ""

    get bodyMeasurement (): IBodyMeasurement | null {
        const bodyMeasurement = store.state.bodyMeasurementToMutate
        if (store.state.unitType === UnitTypes.imperial) {
            return this.convertBodyMeasurementToImperial(bodyMeasurement)
        }
        return bodyMeasurement
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
        if (apiResponse !== null) {
            router.push("/bodymeasurements")
        } else {
            this.displayErrorMessage()
        }
    }

    convertBodyMeasurementToImperial(bodyMeasurement: IBodyMeasurement | null) {
        if (!bodyMeasurement) {
            return null
        }
        const convertedMeasurement: IBodyMeasurement = {
            weight: Math.round(UnitTypeConverter.kilogramsToPounds(bodyMeasurement.weight) * 100) / 100,
            height: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.height) * 100) / 100,
            arm: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.arm) * 100) / 100,
            hip: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.hip) * 100) / 100,
            chest: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.chest) * 100) / 100,
            waist: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.waist) * 100) / 100,
            bodyFatPercentage: bodyMeasurement.bodyFatPercentage,
            id: bodyMeasurement.id,
            loggedAt: bodyMeasurement.loggedAt
        }
        return convertedMeasurement
    }

    displayErrorMessage () {
        this.message = "Communication with backend failed"
    }
}
</script>
