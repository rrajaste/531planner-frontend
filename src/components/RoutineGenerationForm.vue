<template>
    <div>
        <form @submit.prevent="onSubmit">
            <h5 class="text-left text-uppercase pb-3 pt-3 border-top border-bottom"><b>Unit types</b></h5>
            <div class="form-row">
                <div class="radio col-2">
                    <label class="text-left">
                        <input class="col-1" type="radio" name="optradio" checked @click="setUnitTypeMetric()"> Metric
                    </label>
                </div>
            </div>
            <div class="form-row">
                <div class="radio col-2">
                    <label class="text-left">
                        <input class="col-1" type="radio" name="optradio" checked @click="setUnitTypeMetric()"> Imperial
                    </label>
                </div>
            </div>
            <h5 class="text-left text-uppercase pb-1 pt-3 border-top"><b>Lift maxes</b></h5>
            <div class="form-row my-3 border-top pt-4">
                <label class="col-sm-3 col-md-2 my-1 text-left">{{ squatMax.displayName }}</label>
                <input
                    type="number"
                    class="form-control col-sm-2"
                    v-model.trim="squatMax.value"
                    :class="squatMax.bootstrapValidationClass"
                />
                <label class="col-sm-2 mx-2 my-1 text-left"> number of reps </label>
                <input
                    type="number"
                    class="form-control col-sm-2"
                    v-model.trim="squatReps.value"
                    :class="squatReps.bootstrapValidationClass"
                />
                <div class="invalid-feedback text-left col-12">
                    <span>{{ squatMax.errorMessage }}</span>
                </div>
                <div class="invalid-feedback text-left col-12">
                    <span>{{ squatReps.errorMessage }}</span>
                </div>
            </div>
            <div class="form-row my-3">
                <label class="col-sm-3 col-md-2 my-1 text-left">{{ benchMax.displayName }}</label>
                <input
                    type="number"
                    class="form-control col-sm-2"
                    v-model.trim="benchMax.value"
                    :class="benchMax.bootstrapValidationClass"
                />
                <label class="col-sm-2 mx-2 my-1 text-left"> number of reps </label>
                <input
                    type="number"
                    class="form-control col-sm-2"
                    v-model.trim="benchReps.value"
                    :class="benchReps.bootstrapValidationClass"
                />
                <div class="invalid-feedback text-left col-12">
                    <span>{{ benchMax.errorMessage }}</span>
                </div>
                <div class="invalid-feedback text-left col-12">
                    <span>{{ benchReps.errorMessage }}</span>
                </div>
            </div>
            <div class="form-row my-3">
                <label class="col-sm-3 col-md-2 my-1 text-left">{{ deadliftMax.displayName }}</label>
                <input
                    type="number"
                    class="form-control col-sm-2"
                    v-model.trim="deadliftMax.value"
                    :class="deadliftMax.bootstrapValidationClass"
                />
                <label class="col-sm-2 mx-2 my-1 text-left"> number of reps </label>
                <input
                    type="number"
                    class="form-control col-sm-2"
                    v-model.trim="deadliftReps.value"
                    :class="deadliftReps.bootstrapValidationClass"
                />
                <div class="invalid-feedback text-left col-12">
                    <span>{{ deadliftMax.errorMessage }}</span>
                </div>
                <div class="invalid-feedback text-left col-12">
                    <span>{{ deadliftReps.errorMessage }}</span>
                </div>
            </div>
            <div class="form-row my-3">
                <label class="col-sm-3 col-md-2 my-1 text-left">{{ pressMax.displayName }}</label>
                <input
                    type="number"
                    class="form-control col-sm-2"
                    v-model.trim="pressMax.value"
                    :class="pressMax.bootstrapValidationClass"
                />
                <label class="col-sm-2 mx-2 my-1 text-left"> number of reps </label>
                <input
                    type="number"
                    class="form-control col-sm-2"
                    v-model.trim="pressReps.value"
                    :class="pressReps.bootstrapValidationClass"
                />
                <div class="invalid-feedback text-left col-12">
                    <span>{{ pressMax.errorMessage }}</span>
                </div>
                <div class="invalid-feedback text-left col-12">
                    <span>{{ pressReps.errorMessage }}</span>
                </div>
            </div>
            <hr/>
            <div class="row">
                <button @click="calculate" class="btn btn-primary ml-3">Calculate</button>
            </div>
            <hr/>
            <div class="text-left" v-if="singleRepMaxesCalculated === true">
                <h5 class="text-left text-uppercase pb-3 pt-3 border-top border-bottom"><b>Estimated one rep maxes</b></h5>
                <table class="table table-bordered my-3">
                    <tr>
                        <th>
                            Squat
                        </th>
                        <th class="px-3">
                            {{ squatOneRepMax }}
                        </th>
                    </tr>
                    <tr>
                        <th>
                            Bench press
                        </th>
                        <th class="px-3">
                            {{ benchOneRepMax }}
                        </th>
                    </tr>
                    <tr>
                        <th>
                            Deadlift
                        </th>
                        <th class="px-3">
                            {{ deadliftOneRepMax }}
                        </th>
                    </tr>
                    <tr>
                        <th>
                            Overhead press
                        </th>
                        <th class="px-3">
                            {{ pressOneRepMax }}
                        </th>
                    </tr>
                </table>
                <hr/>
                <div class="row">
                    <button type="submit" class="btn btn-success ml-3">Submit</button>
                    <router-link to="/routines" class="btn btn-secondary mx-3">Back</router-link>
                </div>
            </div>
        </form>
    </div>
</template>
<script lang=ts>

import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { UnitTypes } from "../types/UnitTypes"
import NumberInputObject from "../formvalidation/NumberInputObject"
import RepMaxCalculator from "../calculators/singleRepetitionMaxCalculator"

@Component
export default class RoutineGenerationForm extends Vue {
    private unitType = UnitTypes.metric
    private singleRepMaxesCalculated = false;

    private squatOneRepMax = 0;
    private deadliftOneRepMax = 0;
    private benchOneRepMax = 0;
    private pressOneRepMax = 0;

    private squatMax = new NumberInputObject({
        displayName: "Squat max",
        isRequired: true,
        min: 1,
        max: 1000
    })

    private squatReps = new NumberInputObject({
        displayName: "Squat reps",
        isRequired: true,
        min: 1,
        max: 10
    })

    private benchMax = new NumberInputObject({
        displayName: "Bench press max",
        isRequired: true,
        min: 1,
        max: 100
    })

    private benchReps = new NumberInputObject({
        displayName: "Bench reps",
        isRequired: true,
        min: 1,
        max: 10
    })

    private pressMax = new NumberInputObject({
        displayName: "Overhead press max",
        isRequired: true,
        min: 1,
        max: 1000
    })

    private pressReps = new NumberInputObject({
        displayName: "Bench reps",
        isRequired: true,
        min: 1,
        max: 10
    })

    private deadliftMax = new NumberInputObject({
        displayName: "Deadlift max",
        isRequired: true,
        min: 1,
        max: 1000
    })

    private deadliftReps = new NumberInputObject({
        displayName: "Bench reps",
        isRequired: true,
        min: 1,
        max: 10
    })

    private setUnitTypeMetric() {
        this.unitType = UnitTypes.metric
    }

    private setUnitTypeImperial() {
        this.unitType = UnitTypes.imperial
    }

    calculate () {
        if (this._isFormValid()) {
            this.squatOneRepMax = RepMaxCalculator.GetSingleRepMax(this.squatMax.value, this.squatReps.value)
            this.deadliftOneRepMax = RepMaxCalculator.GetSingleRepMax(this.deadliftMax.value, this.deadliftReps.value)
            this.pressOneRepMax = RepMaxCalculator.GetSingleRepMax(this.pressMax.value, this.pressReps.value)
            this.benchOneRepMax = RepMaxCalculator.GetSingleRepMax(this.benchMax.value, this.benchReps.value)

            this.singleRepMaxesCalculated = true;
        }
    }

    onSubmit () {
        if (this._isFormValid()) {
        }
    }

    private _isFormValid () {
        return this.squatMax.isValid &&
            this.squatReps.isValid &&
            this.benchMax.isValid &&
            this.benchReps.isValid &&
            this.pressMax.isValid &&
            this.pressReps.isValid &&
            this.deadliftMax.isValid &&
            this.deadliftReps.isValid
    }
}
</script>
<style scoped>
input {
    width: 110px;
}
table {
    max-width: 300px;
}
</style>
