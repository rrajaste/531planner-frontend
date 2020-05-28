<template>
    <div class="text-center">
        <h1 class="text-uppercase display-4">{{ activeRoutine.name }}</h1>
        <h3 class="text-uppercase text-danger">{{ message }}</h3>
        <p class="text-muted ">{{ activeRoutine.description }}</p>
        <div class="border-bottom mb-3 pb-3" >
            <router-link to="/routines/">BACK</router-link>
        </div>
        <UnitTypeSelection/>
        <hr/>
        <div class="row justify-content-center">
            <div
                v-for="trainingWeek in activeCycle.trainingWeeks.sort((a, b) => a.weekNumber - b.weekNumber)"
                :key="trainingWeek.Id"
                class="mb-3 mx-1 col-sm-12 col-md-11 col-xl-11"
            >
                <TrainingWeek :trainingWeek="trainingWeek" />
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
import UnitTypeSelection from "../../components/UnitTypeSelection.vue";

@Component({
    components: {
        TrainingWeek,
        UnitTypeSelection
    }
})
export default class RoutinesActive extends Vue {
    get activeRoutine(): IBaseWorkoutRoutine | null {
        return store.state.activeRoutine;
    }

    get activeCycle(): ITrainingCycle | null {
        return store.state.activeCycle;
    }

    private message = "";

    async mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login");
        } else {
            await store.dispatch("getActiveRoutine");
            await store.dispatch("getActiveCycle");
        }
    }

    displayErrorMessage() {
        this.message = "Backend communication failed!";
    }
}
</script>
<style scoped>
</style>
