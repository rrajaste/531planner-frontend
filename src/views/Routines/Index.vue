<template>
    <div class="text-center">
        <div class="mb-5">
            <h1 class="display-4 text-uppercase">Workout routines</h1>
            <p class="text-muted mb-3">On this page you can view and manage your personalized workout routines.<br/>
            If you don't have an active workout routine yet, you can also generate it here!
            </p>
        </div>
        <hr/>
        <div v-on:click="toggleShowActiveRoutine" class="row clickable text-center justify-content-center">
            <h3 class="text-success text-center text-uppercase">Active routine</h3>
            <div class="clickable" v-if="showActiveRoutine">
                <font-awesome-icon icon="minus" class="text-danger mx-2 my-2"/>
            </div>
            <div class="clickable" v-else>
                <font-awesome-icon icon="plus" class="text-success mx-2 my-2"/>
            </div>
        </div>
        <div v-if="activeRoutine && showActiveRoutine" class="row justify-content-center my-2">
            <div class="card shadow rounded col-sm-11 col-md-10 my-2">
            <div class="card-title text-uppercase mt-3 mb-0">
                <h3 class="text-uppercase">{{ activeRoutine.name }}</h3>
                <hr/>
            </div>
            <div class="card-body">
                <p class="text-muted">{{ activeRoutine.description }}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#removeRoutineModal" title="Remove this routine">REMOVE</button>
            </div>
        </div>
        </div>
        <div v-if="!activeRoutine && showActiveRoutine">
            <hr/>
            <p class="text-muted text-center mb-1">No currently active routine!</p>
            <span class="text-muted">Click <router-link to="/routines/generate" class="text-center text-uppercase">HERE</router-link> to generate a new one!</span>
        </div>
        <div>
        </div>
        <hr/>
        <div v-on:click="toggleShowCurrentWeek" class="row clickable text-center justify-content-center">
            <h3 class="text-success text-center text-uppercase">current week</h3>
            <div class="clickable" v-if="showCurrentWeek">
                <font-awesome-icon icon="minus" class="text-danger mx-2 my-2"/>
            </div>
            <div class="clickable" v-else>
                <font-awesome-icon icon="plus" size="xl" class="text-success mx-2 my-2"/>
            </div>
        </div>
        <hr/>
        <div v-if="activeWeek && showCurrentWeek">
            <TrainingWeek :trainingWeek="activeWeek"/>
        </div>
        <div v-if="!activeWeek && showCurrentWeek">
            <p class="text-muted text-center">No currently active training week!</p>
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

    private showCurrentWeek = true;
    private showActiveRoutine = true;
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

    private async deleteActiveRoutine() {
        await store.dispatch("deleteActiveRoutine")
    }
}
</script>
<style scoped>
.clickable
{
    cursor: pointer;
}
</style>
