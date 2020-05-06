<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <div class="radio">
                    <label>
                        <input type="radio" name="optradio" checked @click=" () => { this.measurement = 'metric' }"> Metric
                    </label>
                </div>
                <!-- <div class="radio">
                    <label>
                        <input class="disabled" type="radio" name="optradio"> Imperial
                    </label>
                </div> -->
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ weight.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="weight.value"
                        :class="weight.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ weight.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ height.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="height.value"
                        :class="height.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ height.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ chest.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="chest.value"
                        :class="chest.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ chest.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ waist.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="waist.value"
                        :class="waist.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ waist.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ hip.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="hip.value"
                        :class="hip.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ hip.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ arm.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="arm.value"
                        :class="arm.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ arm.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ bodyfatpercentage.displayName }}*</label>
                    <input
                        type="number"
                        class="form-control"
                        v-model.number="bodyfatpercentage.value"
                        :class="bodyfatpercentage.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ bodyfatpercentage.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script lang=ts>

import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import NumberInputObject from "../formvalidation/NumberInputObject"
import { IBodyMeasurementCreate, IBodyMeasurement } from "../domain/BodyMeasurement"
import StringInputObject from "../formvalidation/StringInputObject"

@Component
export default class BodymeasurementCreateForm extends Vue {
    private weightAbbreviation = { metric: "kg", imperial: "lbs" }
    private lengthAbbreviation = { metric: "cm", imperial: { feet: "ft", inches: "in" } }
    private measurement = "metric"
    @Prop()
    bodyMeasurement: IBodyMeasurement | null = null

    private weight = new NumberInputObject({
        displayName: "Weight",
        isRequired: true,
        min: 1,
        max: 1000
    })

    private height = new NumberInputObject({
        displayName: "Height",
        isRequired: true,
        min: 1,
        max: 1000
    })

    private chest = new NumberInputObject({
        displayName: "Chest",
        isRequired: false,
        min: 1,
        max: 1000
    })

    private waist = new NumberInputObject({
        displayName: "Waist",
        isRequired: false,
        min: 1,
        max: 1000
    })

    private hip = new NumberInputObject({
        displayName: "Hip",
        isRequired: false,
        min: 1,
        max: 100
    })

    private arm = new NumberInputObject({
        displayName: "Arm",
        isRequired: false,
        min: 1,
        max: 1000
    })

    private bodyfatpercentage = new NumberInputObject({
        displayName: "Body fat %",
        isRequired: false,
        min: 1,
        max: 99
    })

    private unitTypeId = new StringInputObject({
        displayName: "UnitType",
        isRequired: false,
        min: 1,
        max: 1000
    })

    async onSubmit () {
        const dto: IBodyMeasurementCreate = {
            weight: this.weight.value,
            height: this.height.value,
            chest: this.chest.value,
            hip: this.hip.value,
            waist: this.waist.value,
            arm: this.arm.value,
            bodyFatPercentage: this.bodyfatpercentage.value,
            unitTypeId: this.unitTypeId.value
        }
        if (this._isFormValid()) {
            this.$emit('bodymeasurement-form-submitted', dto)
        }
    }

    @Watch('bodyMeasurement')
    propChanged () {
        if (this.bodyMeasurement !== null) {
            this.weight.value = this.bodyMeasurement.weight
            this.height.value = this.bodyMeasurement.height
            this.chest.value = this.bodyMeasurement.chest ?? 0
            this.waist.value = this.bodyMeasurement.waist ?? 0
            this.hip.value = this.bodyMeasurement.hip ?? 0
            this.arm.value = this.bodyMeasurement.arm ?? 0
            this.bodyfatpercentage.value = this.bodyMeasurement.bodyFatPercentage ?? 0
        }
    }

    private _isFormValid () {
        return this.weight.isValid &&
        this.height.isValid &&
        this.chest.isValid &&
        this.hip.isValid &&
        this.arm.isValid &&
        this.bodyfatpercentage.isValid
    }
}
</script>
