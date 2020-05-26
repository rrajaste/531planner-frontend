<template>
    <div class="m-1 p-0 training-day mb-3">
        <ul class="list-group p-1 ">
            <li class="list-group-item">
            <h5 class="text-uppercase"></h5>
            <p class="m-0" :title="trainingDay.description">{{ trainingDay.name }}</p>
        </li>
        <li class="list-group-item p-0">
            <p class="text-uppercase m-1">
                <b>Main lifts</b>
            </p>
        </li>
        <li v-for="mainLift in trainingDay.mainLifts" :key="mainLift.id" class="text-secondary list-group-item">
            <Exercise :exercise="mainLift"/>
        </li>
        <li class="list-group-item p-0">
            <p class="text-uppercase m-1">
                <b>Accessory lifts</b>
            </p>
        </li>
        <li v-for="accessory in trainingDay.accessoryLifts" :key="accessory.id" class="text-secondary list-group-item">
            <Exercise :exercise="accessory"/>
        </li>
        </ul>
    </div>
</template>

<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator"
import { ITrainingDay } from "../domain/TrainingDay";
import Exercise from "./Exercise.vue"

@Component({
    components: {
        Exercise
    }
})
export default class TrainingDay extends Vue {
    @Prop()
    public trainingDay: ITrainingDay | undefined;
}
</script>
<style scoped>
.training-day {
    min-width: 220px;
}
</style>
