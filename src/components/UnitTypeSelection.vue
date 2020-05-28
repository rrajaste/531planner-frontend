<template>
    <div>
        <h5 class="text-left text-uppercase pb-3 pt-3 border-top border-bottom"><b>Unit types</b></h5>
        <div class="form-row">
            <div class="radio col-2">
                <label class="text-left">
                    <input class="col-1" type="radio" name="optradio" :checked="isDefaultMetric" @click="setUnitTypeMetric()"> Metric
                </label>
            </div>
        </div>
        <div class="form-row">
            <div class="radio col-2">
                <label class="text-left">
                    <input class="col-1" type="radio" name="optradio" :checked="!isDefaultMetric" @click="setUnitTypeImperial()"> Imperial
                </label>
            </div>
        </div>
    </div>
</template>
<script lang=ts>

import { Component, Vue } from "vue-property-decorator"
import { UnitTypes } from "../types/UnitTypes"
import NumberInputObject from "../formvalidation/NumberInputObject"
import RepMaxCalculator from "../calculators/singleRepetitionMaxCalculator"
import { UnitTypeConverter } from "../calculators/unitTypeConverter"
import { IWendlerMaxes } from "../domain/WendlerMaxes"
import store from '@/store'

@Component
export default class UnitTypeSelection extends Vue {
    get unitType() {
        return store.state.unitType
    }

    get isDefaultMetric() {
        return this.unitType === UnitTypes.metric
    }

    private setUnitTypeMetric() {
        store.commit("setUnitType", UnitTypes.metric)
    }

    private setUnitTypeImperial() {
        store.commit("setUnitType", UnitTypes.imperial)
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
