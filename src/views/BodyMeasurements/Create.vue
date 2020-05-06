<template>
    <div>
        <h1>
            Log
        </h1>
        <h3 class="text-danger">{{message}}</h3>
        <hr/>
        <BodyMeasurementCreateForm v-on:bodymeasurement-form-submitted="onSubmit"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import BodyMeasurementCreateForm from "../../components/BodyMeasurementCreateForm.vue"
import { IBodyMeasurementCreate } from "@/domain/BodyMeasurement"
import store from "../../store"
import router from '../../router'

@Component({
    components: {
        BodyMeasurementCreateForm
    }
})

export default class BodymeasurementsCreate extends Vue {
    private message = ""

    async created () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        }
    }

    async onSubmit (dto: IBodyMeasurementCreate) {
        dto.unitTypeId = "303f0c29-a99f-4876-6434-08d7f1ca8754"
        const apiResponse = await store.dispatch("createBodyMeasurements", dto)
        if (apiResponse !== null) {
            router.push("/bodymeasurements")
        } else {
            this.displayErrorMessage()
        }
    }

    displayErrorMessage () {
        this.message = "Creation failed"
    }
}
</script>
