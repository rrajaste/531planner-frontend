<template>
     <div class="text-left">
        <h3 class="text-danger">{{message}}</h3>
        <h1 class="text-uppercase">Delete</h1>
        <h3>Are you sure you want to delete this?</h3>
        <BodyMeasurementDetails v-if="bodyMeasurement" :bodyMeasurement="bodyMeasurement"></BodyMeasurementDetails>
        <form @submit="onSubmit">
            <input type="submit" value="Delete" class="btn btn-danger" /> |
            <router-link to="/bodymeasurements">Back to List</router-link>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import BodyMeasurementDetails from "../../components/BodyMeasurementDetails.vue"
import { IBodyMeasurement } from "../../domain/BodyMeasurement"
import store from '../../store'
import router from '../../router'

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
            router.push("/bodymeasurements")
        } else {
            this.message = "Failed to communicate with backend api"
        }
    }
}
</script>
