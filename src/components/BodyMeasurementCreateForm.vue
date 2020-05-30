<template>
    <div>
        <UnitTypeSelection/>
        <hr/>
        <div class="row justify-content-center">
        <div class="col-3 col-sm-5 p-0 m-0">
            <form @submit.prevent="onSubmit">
            <div class="form-row">
                <div class="form-group">
                    <label>{{translations.bodyMeasurements.weight}} ({{weightAbbreviation}})*</label>
                    <input
                        type="number"
                        step="any"
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
                <div class="form-group">
                    <label>{{translations.bodyMeasurements.height}} ({{lengthAbbreviation}})*</label>
                    <input
                        type="number"
                        step="any"
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
                <div class="form-group">
                    <label>{{translations.bodyMeasurements.chest}} ({{lengthAbbreviation}})*</label>
                    <input
                        type="number"
                        step="any"
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
                <div class="form-group">
                    <label>{{translations.bodyMeasurements.waist}} ({{lengthAbbreviation}})*</label>
                    <input
                        type="number"
                        step="any"
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
                <div class="form-group">
                    <label>{{translations.bodyMeasurements.hip}} ({{lengthAbbreviation}})*</label>
                    <input
                        type="number"
                        step="any"
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
                <div class="form-group">
                    <label>{{translations.bodyMeasurements.arm}} ({{lengthAbbreviation}})*</label>
                    <input
                        type="number"
                        step="any"
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
                <div class="form-group">
                    <label>{{translations.bodyMeasurements.bodyFat}} (%)*</label>
                    <input
                        type="number"
                        step="any"
                        class="form-control"
                        v-model.number="bodyfatpercentage.value"
                        :class="bodyfatpercentage.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ bodyfatpercentage.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <button type="submit" class="btn btn-success">{{translations.bodyMeasurements.submit}}</button>
            </div>
        </form>
        </div>
        <div class="col-5 body-image justify-content-left">
            <img id="bodyOutline" src="../assets/body.png"/>
        </div>
    </div>
    <hr/>
    </div>
</template>
<script lang=ts>

import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import NumberInputObject from "../formvalidation/NumberInputObject"
import { IBodyMeasurementCreate, IBodyMeasurement } from "../domain/BodyMeasurement"
import StringInputObject from "../formvalidation/StringInputObject"
import UnitTypeSelection from "./UnitTypeSelection.vue"
import store from '@/store'
import { UnitTypeConverter } from '../calculators/unitTypeConverter'
import { UnitTypes } from '../types/UnitTypes'
import { IAppTranslation } from '@/resources/translations/IAppTranslation'

@Component({
    components: {
        UnitTypeSelection
    }
})
export default class BodymeasurementCreateForm extends Vue {
    private measurement = "metric"

    @Prop()
    private bodyMeasurement!: IBodyMeasurement;

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    get weightAbbreviation () {
        return store.getters.unitTypeWeightAbbreviation
    }

    get lengthAbbreviation () {
        return store.getters.unitTypeLengthAbbreviation
    }

    get unitType () {
        return store.state.unitType
    }

    mounted() {
        if (this.bodyMeasurement) {
            this.weight.value = this.bodyMeasurement.weight;
            this.height.value = this.bodyMeasurement.height;
            this.chest.value = this.bodyMeasurement.chest;
            this.arm.value = this.bodyMeasurement.arm;
            this.hip.value = this.bodyMeasurement.hip;
            this.waist.value = this.bodyMeasurement.waist;
            this.bodyfatpercentage.value = this.bodyMeasurement.bodyFatPercentage;
        }
    }

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
        max: 1000
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
            weight: this.getWeightMetricValue(this.weight.value),
            height: this.getLengthMetricValue(this.height.value),
            chest: this.getLengthMetricValue(this.chest.value),
            hip: this.getLengthMetricValue(this.hip.value),
            waist: this.getLengthMetricValue(this.waist.value),
            arm: this.getLengthMetricValue(this.arm.value),
            bodyFatPercentage: this.bodyfatpercentage.value
        }
        if (this._isFormValid()) {
            this.$emit('bodymeasurement-form-submitted', dto)
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

    private getLengthMetricValue(length: number) {
        return this.unitType === UnitTypes.metric
            ? length
            : UnitTypeConverter.inchesToCentimeters(length)
    }

    private getWeightMetricValue(weight: number) {
        return this.unitType === UnitTypes.metric
            ? weight
            : UnitTypeConverter.poundsToKilograms(weight)
    }
}
</script>
<style>
#bodyOutline {
    height: 36rem;
    float: left;
    padding-top: 20px
}
</style>
