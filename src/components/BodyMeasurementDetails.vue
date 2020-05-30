<template>
    <div>
        <h4>{{translations.bodyMeasurements.indexTitle}}</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">{{translations.bodyMeasurements.loggedAt}}</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.loggedAt }}</dd>
            <dt class="col-sm-2">{{translations.bodyMeasurements.height}}</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.height }}</dd>
            <dt class="col-sm-2">{{translations.bodyMeasurements.weight}}</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.weight }}</dd>
            <dt class="col-sm-2">{{translations.bodyMeasurements.chest}}</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.chest }}</dd>
            <dt class="col-sm-2">{{translations.bodyMeasurements.waist}}</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.waist }}</dd>
            <dt class="col-sm-2">{{translations.bodyMeasurements.hip}}</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.hip }}</dd>
            <dt class="col-sm-2">{{translations.bodyMeasurements.arm}}</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.arm }}</dd>
            <dt class="col-sm-2">{{translations.bodyMeasurements.bodyFat}}</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.bodyFatPercentage }}</dd>
        </dl>
    </div>
</template>
<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator"
import { IBodyMeasurementCreate, IBodyMeasurement } from "../domain/BodyMeasurement"
import store from '@/store'
import { IAppTranslation } from '@/resources/translations/IAppTranslation';

@Component
export default class BodymeasurementDetails extends Vue {
    @Prop()
    public bodyMeasurement!: IBodyMeasurement

    get translations(): IAppTranslation {
        return store.getters.translations;
    }
}
</script>
