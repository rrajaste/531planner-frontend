<template>
    <div>
        <h1>Body measurements</h1>
        <h3 class="text-danger">{{message}}</h3>
        <p>
            <router-link to="/bodymeasurements/create">Log your measurements</router-link>
        </p>
        <table v-if="bodyMeasurements" class="table">
            <thead>
                <tr>
                    <th>Logged at</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Chest</th>
                    <th>Waist</th>
                    <th>Hip</th>
                    <th>Arm</th>
                    <th>Body fat %</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="measurement in bodyMeasurements" :key="measurement.Id">
                    <td >{{ measurement.loggedAt }}</td>
                    <td >{{ measurement.height }}</td>
                    <td >{{ measurement.weight }}</td>
                    <td >{{ measurement.chest }}</td>
                    <td >{{ measurement.waist }}</td>
                    <td >{{ measurement.hip }}</td>
                    <td >{{ measurement.arm }}</td>
                    <td >{{ measurement.bodyFatPercentage }}</td>

                    <td>
                    <router-link :to="'bodymeasurements/edit/' + measurement.id">Edit</router-link> |
                        <router-link :to="'bodymeasurements/details/' + measurement.id">Details</router-link> |
                        <router-link :to="'bodymeasurements/delete/' + measurement.id">Delete</router-link> |
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { IBodyMeasurement } from "../../domain/BodyMeasurement"
import store from "../../store"
import router from "@/router"

@Component
export default class BodymeasurementsIndex extends Vue {
    get bodyMeasurements(): IBodyMeasurement[] {
        return store.getters.convertedBodyMeasurements;
    }

    private message = ""

    async mounted () {
        if (!store.getters.isLoggedIn) {
            router.push("account/login")
        } else {
            const apiResponse = await store.dispatch("getAllBodyMeasurements")
            if (apiResponse == null) {
                this.message = "Failed to communicate with backend api"
            }
        }
    }
}
</script>
