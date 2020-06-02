<template>
    <div class="text-center">
        <h3 class="text-danger">{{message}}</h3>
        <table v-if="bodyMeasurements" class="table table-responsive-lg">
            <thead>
                <tr>
                    <th>{{translations.bodyMeasurements.loggedAt}}</th>
                    <th>{{translations.bodyMeasurements.height}} ({{lengthAbbreviation}})</th>
                    <th>{{translations.bodyMeasurements.weight}} ({{weightAbbreviation}})</th>
                    <th>{{translations.bodyMeasurements.chest}} ({{lengthAbbreviation}})</th>
                    <th>{{translations.bodyMeasurements.waist}} ({{lengthAbbreviation}})</th>
                    <th>{{translations.bodyMeasurements.hip}} ({{lengthAbbreviation}})</th>
                    <th>{{translations.bodyMeasurements.arm}} ({{lengthAbbreviation}})</th>
                    <th>{{translations.bodyMeasurements.bodyFat}} %</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="measurement in bodyMeasurements" :key="measurement.Id">
                    <td >{{ toLocaleDateString(measurement.loggedAt) }}</td>
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
import { IAppTranslation } from '@/resources/translations/IAppTranslation';
import { UnitTypeConverter } from '@/converters/unitTypeConverter';

@Component
export default class BodyMeasurementsLog extends Vue {
    get bodyMeasurements(): IBodyMeasurement[] {
        return [...store.getters.convertedBodyMeasurements].reverse();
    }

    get weightAbbreviation () {
        return store.getters.unitTypeWeightAbbreviation
    }

    get lengthAbbreviation () {
        return store.getters.unitTypeLengthAbbreviation
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    private message = ""

    toLocaleDateString(date: Date) {
        return UnitTypeConverter.toLocalString(date)
    }
}
</script>
