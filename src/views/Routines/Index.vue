<template>
    <div class="text-center">
        <div class="mb-5">
            <h1 class="display-4 text-uppercase">
                {{translations.routines.indexTitle}}</h1>
            <p class="text-muted mb-3">
                {{translations.routines.indexSubtext}}
            </p>
        </div>
        <div v-if="activeCycle">
            <router-link to="/routines/activecycle">
            <div class="row text-center justify-content-center">
                <h4 class="text-center text-uppercase">
                {{ translations.routines.viewFullcycle }}</h4>
            </div>
        </router-link>
        </div>
        <hr/>
        <div v-on:click="toggleShowActiveRoutine" class="row clickable text-center justify-content-center">
            <h3 class="text-success text-center text-uppercase">{{translations.routines.activeRoutine}}</h3>
            <div class="clickable" v-if="showActiveRoutine">
                <font-awesome-icon icon="minus" class="text-danger mx-2 my-2"/>
            </div>
            <div class="clickable" v-else>
                <font-awesome-icon icon="plus" class="text-success mx-2 my-2"/>
            </div>
        </div>
        <div v-if="activeRoutine && showActiveRoutine" class="row justify-content-center my-2">
            <div class="card rounded col-sm-10 col-md-8 my-2">
            <div class="card-title" v-if="showConfirmDelete">
                <h3 class="text-danger delete-text">{{translations.routines.deleteConfirm}}</h3>
                <button class="btn btn-danger btn-sm mx-1 text-uppercase" @click="deleteActiveRoutine">{{translations.routines.delete}}</button>
                <button class="btn btn-primary btn-sm mx-1 text-uppercase" @click="toggleShowConfirmDelete">{{translations.routines.close}}</button>
            </div>
            <div v-if="!showConfirmDelete" class="card-title text-uppercase mt-3 mb-0">
                <h3 class="text-uppercase">{{ activeRoutine.name }}</h3>
                <hr/>
            </div>
            <div class="card-body">
                <p class="text-muted">{{ activeRoutine.description }}</p>
            </div>
            <div class="delete-icon clickable" @click="toggleShowConfirmDelete" >
                <font-awesome-icon icon="trash" class="text-danger mx-2 my-2"/>
            </div>
        </div>
        </div>
        <div v-if="!activeRoutine && showActiveRoutine">
            <hr/>
            <p class="text-muted text-center mb-1">{{translations.routines.noActiveRoutine}}</p>
            <span class="text-muted">{{translations.routines.click}}
                <router-link to="/routines/generate" class="text-center text-uppercase">{{translations.routines.here}}</router-link>
                {{translations.routines.toGenerate}}
                </span>
        </div>
        <div>
        </div>
        <hr/>
        <div v-on:click="toggleShowCurrentWeek" class="row clickable text-center justify-content-center">
            <h3 class="text-success text-center text-uppercase">{{translations.routines.currentWeek}}</h3>
            <div class="clickable" v-if="showCurrentWeek">
                <font-awesome-icon icon="minus" class="text-danger mx-2 my-2"/>
            </div>
            <div class="clickable" v-else>
                <font-awesome-icon icon="plus" class="text-success mx-2 my-2"/>
            </div>
        </div>
        <hr/>
        <div v-if="activeWeek && showCurrentWeek">
            <TrainingWeek :trainingWeek="activeWeek"/>
        </div>
        <div v-if="!activeWeek && showCurrentWeek">
            <p class="text-muted text-center">{{translations.routines.noCurrentWeek}}</p>
            <div v-if="isCycleOver">
                <p class="text-muted">Your current training cycle is over.</p>
                   <span class="text-muted">{{translations.routines.click}}
                       <router-link to="/routines/generate" class="text-center text-uppercase">
                            {{translations.routines.here}}
                       </router-link>
                       {{translations.routines.toGenere}}
                    </span>
            </div>
            <div v-else-if="isCycleNotStarted">
                <p class="text-muted">{{translations.routines.firstWeekStartsAt}} {{ toLocaleDateString(firstWeekStartingDate) }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IBaseWorkoutRoutine } from "../../domain/WorkoutRoutine";
import { ITrainingCycle } from "../../domain/TrainingCycle";
import store from "../../store";
import router from "../../router";
import TrainingWeek from "../../components/TrainingWeek.vue";
import { ITrainingWeek } from '../../domain/TrainingWeek';
import { IAppTranslation } from '@/resources/translations/IAppTranslation';
import { UnitTypeConverter } from '@/converters/unitTypeConverter';

@Component({
    components: {
        TrainingWeek
    }
})
export default class RoutineIndex extends Vue {
    get activeRoutine(): IBaseWorkoutRoutine | null {
        return store.state.activeRoutine;
    }

    get activeWeek(): ITrainingWeek | null {
        return store.getters.activeWeek;
    }

    get activeCycle(): ITrainingCycle | null {
        return store.state.activeCycle;
    }

    get isCycleOver(): boolean | null {
        return store.getters.isCycleOver;
    }

    get isCycleNotStarted(): boolean {
        const currentDate = new Date()
        const startingDate = new Date(store.getters.firstWeekStartingDate)
        return startingDate > currentDate
    }

    get firstWeekStartingDate(): boolean | null {
        return store.getters.firstWeekStartingDate;
    }

    private showCurrentWeek = true;
    private showActiveRoutine = true;
    private showConfirmDelete = false;
    private message = "";

    async mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login");
        } else {
            await store.dispatch("getActiveRoutine");
            await store.dispatch("getActiveCycle");
        }
    }

    private toggleShowCurrentWeek() {
        this.showCurrentWeek = !this.showCurrentWeek;
    }

    private toggleShowActiveRoutine() {
        this.showActiveRoutine = !this.showActiveRoutine;
    }

    private toggleShowConfirmDelete() {
        this.showConfirmDelete = !this.showConfirmDelete;
    }

    private async deleteActiveRoutine() {
        await store.dispatch("deleteActiveRoutine")
        this.toggleShowConfirmDelete();
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    toLocaleDateString(date: Date) {
        return UnitTypeConverter.toLocalString(date)
    }
}
</script>
<style scoped>
.clickable
{
    cursor: pointer;
}
.delete-icon {
    position: absolute;
    top: 10px;
    right: 10px;

}
</style>
