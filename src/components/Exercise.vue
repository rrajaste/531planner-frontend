<template>
    <div>
        <p :title="exercise.description" class="font-weight-bold text-left m-0 border-bottom text-body">{{ exercise.name }}</p>
        <div v-if="exercise.warmUpSets.length > 0" class="text-left ml-3 text-secondary">
            <p class="text-left m-0"><em>{{ exercise.typeName }}</em></p>
            <span v-for="set in exercise.warmUpSets" :key="set.id">
                - {{ set.nrOfReps }} x {{ getExerciseSetWeight(set.weight) }}{{ unitTypeAbbreviation }}<br/>
            </span>
        </div>
        <div class="text-left ml-3 text-secondary">
            <p class="text-left m-0"><em>Work sets</em></p>
            <span v-for="set in exercise.workSets" :key="set.id">
                - {{ set.nrOfReps }} x
                <span v-if="set.weight">{{ getExerciseSetWeight(set.weight) }}{{ unitTypeAbbreviation }}</span>
                <span v-else title="Weight for this exercise is not programmable, use your best judgement">...</span>
                <br/>
            </span>
        </div>
    </div>
</template>

<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator"
import { IExercise } from "../domain/Exercise";
import store from "@/store";
import { UnitTypes } from '@/types/UnitTypes';
import { UnitTypeConverter } from '../calculators/unitTypeConverter';

@Component
export default class TrainingDay extends Vue {
    @Prop()
    public exercise: IExercise | undefined;

    get unitTypeAbbreviation() {
        return store.getters.unitTypeWeightAbbreviation
    }

    getExerciseSetWeight(weight: number) {
        let convertedWeight = weight
        if (store.state.unitType === UnitTypes.imperial) {
            convertedWeight = UnitTypeConverter.kilogramsToPounds(weight)
        }
        return Math.ceil(convertedWeight / 2.5) * 2.5
    }
}
</script>
