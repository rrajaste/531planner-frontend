<template>
    <div>
        <h3 class="text-danger">{{ message }}</h3>
        <BodyMeasurementCreateForm v-if="bodyMeasurement" :bodyMeasurement="bodyMeasurement" v-on:bodymeasurement-form-submitted="onSubmit"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import BodyMeasurementCreateForm from "../../components/BodyMeasurementCreateForm.vue"
import { IBodyMeasurementEdit } from "@/domain/BodyMeasurement"
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

    async mounted () {
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

    displayErrorMessage () {
        this.message = "Communication with backend failed"
    }
}
</script>
