<template>
    <div class="text-center">
        <h3 class="text-danger">{{message}}</h3>
        <table v-if="bodyMeasurements" class="table table-responsive-lg">
            <thead>
                <tr>
                    <th>Logged at</th>
                    <th>Height ({{lengthAbbreviation}})</th>
                    <th>Weight ({{weightAbbreviation}})</th>
                    <th>Chest ({{lengthAbbreviation}})</th>
                    <th>Waist ({{lengthAbbreviation}})</th>
                    <th>Hip ({{lengthAbbreviation}})</th>
                    <th>Arm ({{lengthAbbreviation}})</th>
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
                        <div class="row justify-content-left">
                            <router-link :to="{ name: 'BodyMeasurementsEdit', params: { id: measurement.id } }">
                                <font-awesome-icon icon="pen" class="text-primary"/>
                            </router-link>
                            <router-link :to="{ name: 'BodyMeasurementsDelete', params: { id: measurement.id } }">
                                <font-awesome-icon icon="trash" class="text-danger mx-1"/>
                            </router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang=ts>
import { Component, Vue } from "vue-property-decorator"
import { IBodyMeasurement } from "../domain/BodyMeasurement"
import store from '@/store'

@Component
export default class BodyMeasurementsLog extends Vue {
    get bodyMeasurements(): IBodyMeasurement[] {
        return store.getters.convertedBodyMeasurements;
    }

    get weightAbbreviation () {
        return store.getters.unitTypeWeightAbbreviation
    }

    get lengthAbbreviation () {
        return store.getters.unitTypeLengthAbbreviation
    }

    private message = ""

    async mounted () {
        const apiResponse = await store.dispatch("getAllBodyMeasurements")
        if (apiResponse == null) {
            this.message = "Failed to communicate with backend api"
        }
    }
}
</script>
