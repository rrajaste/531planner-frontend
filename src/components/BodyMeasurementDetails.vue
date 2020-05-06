<template>
    <div>
        <h4>Body measurement</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">Logged at</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.loggedAt }}</dd>
            <dt class="col-sm-2">Height</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.height }}</dd>
            <dt class="col-sm-2">Weight</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.weight }}</dd>
            <dt class="col-sm-2">Chest</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.chest }}</dd>
            <dt class="col-sm-2">Waist</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.waist }}</dd>
            <dt class="col-sm-2">Hip</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.hip }}</dd>
            <dt class="col-sm-2">Arm</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.arm }}</dd>
            <dt class="col-sm-2">Body fat %</dt>
            <dd class="col-sm-10">{{ bodyMeasurement.bodyFatPercentage }}</dd>
        </dl>
    </div>
</template>
<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator"
import { IBodyMeasurementCreate, IBodyMeasurement } from "../domain/BodyMeasurement"
import store from '@/store'

@Component
export default class BodymeasurementDetails extends Vue {
    @Prop()
    public bodyMeasurement: IBodyMeasurement | null = null
}
</script>
