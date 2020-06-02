<template>
    <div class="text-center">
        <h1 class="text-uppercase">
            Log your body measurements
        </h1>
        <router-link to="/bodymeasurements" class="text-upperclass">BACK TO LIST</router-link>
        <h3 class="text-danger mb-5">{{message}}</h3>
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

    async mounted () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        }
    }

    async onSubmit (dto: IBodyMeasurementCreate) {
        const apiResponse = await store.dispatch("createBodyMeasurements", dto)
        if (apiResponse !== false) {
            await store.dispatch("getAllBodyMeasurements")
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
