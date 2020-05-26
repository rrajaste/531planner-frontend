<template>
    <div class="text-center">
        <div class="mb-4">
            <h1 class="display-4 text-uppercase">Generate...</h1>
            <h3 class="">...a new workout routine</h3>
            <p class="text-secondary">Fill out the form below to generate a new 5/3/1 workout routine</p>
        </div>
        <hr/>
        <div v-if="hasActiveRoutine">
            <p class="text-muted">
                You already seem to have an active routine. If you wish to create another one please remove the old one first.</p>
        </div>
        <div v-else>
            <BaseRoutineSelection v-if="!baseRoutineId" @routine-selected="setBaseRoutineId" />
            <RoutineGenerationForm v-else/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../../store";
import router from "../../router";
import { IRoutineGenerationInfo } from "../../domain/RoutineGenerationInfo";
import RoutineGenerationForm from "../../components/RoutineGenerationForm.vue";
import BaseRoutineSelection from "../../components/BaseRoutineSelection.vue";

@Component({
    components: {
        RoutineGenerationForm,
        BaseRoutineSelection
    }
})
export default class RoutineGenerate extends Vue {
    get activeRoutine(): boolean | null {
        return store.state.activeRoutine !== null;
    }

    private generationInfo = {} as IRoutineGenerationInfo
    private baseRoutineId: string | null = null;

    mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        }
    }

    submitForm() {
        store.dispatch("generateNewRoutine", this.generationInfo)
    }

    setBaseRoutineId(id: string) {
        this.baseRoutineId = id
    }
}
</script>
