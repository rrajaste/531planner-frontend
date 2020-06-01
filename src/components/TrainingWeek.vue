<template>
    <div class="card shadow rounded">
        <h5 class="card-title text-muted mt-3 mb-0">{{ toLocaleDateString(trainingWeek.startingDate) }} - {{ toLocaleDateString(trainingWeek.endingDate) }}</h5>
        <h2 class="card-title text-uppercase mt-3 mb-0">{{translations.routines.trainingWeek}} {{ trainingWeek.weekNumber }}</h2>
        <hr>
        <div class="row d-flex justify-content-center">
            <div v-for="day in trainingWeek.trainingDays" :key="day.Id">
                <TrainingDay :trainingDay="day"></TrainingDay>
            </div>
        </div>
    </div>
</template>

<script lang=ts>
import { Component, Prop, Vue } from "vue-property-decorator"
import { ITrainingWeek } from "../domain/TrainingWeek"
import TrainingDay from "./TrainingDay.vue"
import { IAppTranslation } from '@/resources/translations/IAppTranslation';
import store from '@/store';
import { UnitTypeConverter } from '@/converters/unitTypeConverter';

@Component({
    components: {
        TrainingDay
    }
})
export default class TrainingWeek extends Vue {
    @Prop()
    public trainingWeek: ITrainingWeek | undefined;

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    toLocaleDateString(date: Date) {
        return UnitTypeConverter.toLocalString(date)
    }
}
</script>
