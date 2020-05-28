<template>
    <div>
        <h3 class="text-danger">{{message}}</h3>
        <h1>Delete</h1>
        <h3>Are you sure you want to delete this?</h3>
        <BodyMeasurementDetails v-if="bodyMeasurement" :bodyMeasurement="bodyMeasurement"></BodyMeasurementDetails>
        <router-link to="/bodymeasurements">Back to List</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import BodyMeasurementDetails from "../../components/BodyMeasurementDetails.vue"
import { IBodyMeasurement } from "../../domain/BodyMeasurement"
import router from '../../router'
import store from '@/store'

@Component({
    components: {
        BodyMeasurementDetails
    }
})
export default class BodymeasurementsDetails extends Vue {
    @Prop()
    private id!: string

    private message = ""
    private bodyMeasurement: IBodyMeasurement | null = null;

    async mounted () {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        } else {
            const apiResponse = await store.dispatch("getSingleBodyMeasurement", this.id)
            if (apiResponse != null) {
                this.bodyMeasurement = apiResponse
            } else {
                this.message = "Failed to communicate with backend api"
            }
        }
    }
}
</script>
