<template>
    <div>
        <h3 class="text-danger">{{ message }}</h3>
        <BodyMeasurementCreateForm :bodyMeasurement="bodyMeasurement" v-on:bodymeasurement-form-submitted="onSubmit"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import BodyMeasurementCreateForm from "../../components/BodyMeasurementCreateForm.vue"
import { IBodyMeasurementCreate, IBodyMeasurementEdit } from "@/domain/BodyMeasurement"
import store from "../../store"
import router from '../../router'

@Component({
    components: {
        BodyMeasurementCreateForm
    }
})

export default class BodymeasurementsEdit extends Vue {
    @Prop() id!: string

    private message = ""
    private bodyMeasurement: IBodyMeasurementEdit | null = null

    async created () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        } else {
            const apiResponse = await store.dispatch("getSingleBodyMeasurement", this.id)
            if (apiResponse !== null) {
                this.bodyMeasurement = apiResponse
            } else {
                this.displayErrorMessage()
            }
        }
        console.log("measurement", this.bodyMeasurement)
    }

    async onSubmit (dto: IBodyMeasurementEdit) {
        dto.unitTypeId = "303f0c29-a99f-4876-6434-08d7f1ca8754"
        dto.id = this.id
        const apiResponse = await store.dispatch("updateBodyMeasurement", dto)
        if (apiResponse !== null) {
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
