<template>
    <div class="border-bottom border-top py-3" v-if="statistics">
        <h5 class>
            First log:
            <b>{{ statistics.firstLogAt }}</b>
        </h5>
        <h5 class>
            BMI:
            <b>
                {{ statistics.currentBMI }}
                <span
                    class="text-info"
                >{{ getChangeStringValue(statistics.bmiChange) }}</span>
            </b>
        </h5>
        <h5 class>
            Bodyfat:
            <b>
                {{ statistics.currentBodyFatPercentage }}%
                <span
                    class="text-info"
                >{{ getChangeStringValue(statistics.bodyFatPercentageChange) }}</span>
            </b>
        </h5>
        <h5 class>
            Weight:
            <b>
                {{ getConvertedWeight(statistics.currentWeight) }}
                <span class="text-info">
                    {{ getChangeStringValue(getConvertedWeight(statistics.weightChange)) }}
                    {{ weightAbbreviation }}
                </span>
            </b>
        </h5>
    </div>
</template>

<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator";
import { IBodyMeasurementStatistics } from "../domain/BodyMeasurementStatistics";
import store from "@/store";
import { UnitTypes } from "../types/UnitTypes";
import { UnitTypeConverter } from "../calculators/unitTypeConverter";

@Component
export default class CurrentBodyStats extends Vue {
    get statistics(): IBodyMeasurementStatistics | null {
        return store.state.bodyMeasurementStatistics;
    }

    get weightAbbreviation(): string {
        return store.getters.unitTypeWeightAbbreviation;
    }

    async mounted() {
        await store.dispatch("getBodyMeasurementStatistics");
    }

    getChangeStringValue(change: number): string {
        return change < 0 ? change.toString() : "+" + change.toString();
    }

    getConvertedWeight(weight: number): number {
        return store.state.unitType === UnitTypes.metric
            ? weight
            : Math.round(UnitTypeConverter.kilogramsToPounds(weight) * 100) / 100;
    }
}
</script>
