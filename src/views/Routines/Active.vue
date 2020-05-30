<template>
    <div class="text-center">
        <div v-if="activeRoutine">
            <h1 class="text-uppercase display-4">{{ activeRoutine.name }}</h1>
            <h3 class="text-uppercase text-danger">{{ message }}</h3>
            <p class="text-muted ">{{ activeRoutine.description }}</p>
        </div>
        <div class="border-bottom mb-3 pb-3" >
            <router-link to="/routines/">BACK</router-link>
        </div>
        <UnitTypeSelection/>
        <hr/>
        <div class="row justify-content-center" v-if="activeCycle">
            <div
                v-for="trainingWeek in activeCycle.trainingWeeks"
                :key="trainingWeek.Id"
                class="mb-3 mx-1 col-sm-12 col-md-11 col-xl-11"
            >
                <TrainingWeek :trainingWeek="trainingWeek" />
            </div>
        </div>
        <div v-else>
            <h3 text-secondary>You do not have an active training cycle</h3>
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

    displayErrorMessage() {
        this.message = "Backend communication failed!";
    }

    mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
            store.dispatch("getActiveRoutine")
            store.dispatch("getActiveCycle")
        }
    }
}
</script>
<style scoped>
</style>
