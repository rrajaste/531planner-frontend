<template>
    <div class="text-center">
        <div class="mb-4">
            <h1 class="display-4 text-uppercase">{{translations.routines.generateTitle}}</h1>
            <h3 class="">{{translations.routines.generateSubtitle}}</h3>
            <p class="text-secondary">{{translations.routines.generateSubtext}}</p>
            <router-link to="/routines" class="text-uppercase">{{translations.routines.back}}</router-link>
        </div>
        <hr/>
        <div v-if="hasActiveRoutine">
            <p class="text-muted">
                You already seem to have an active routine. If you wish to create another one please remove the old one first.</p>
        </div>
        <div v-else>
            <BaseRoutineSelection v-if="!baseRoutineId" @routine-selected="setBaseRoutineId" />
            <div v-else>
                <button class="btn btn-info text-uppercase btn-sm mb-3" @click="setBaseRoutineId('')">{{translations.routines.repick}}</button>
            </div>
            <RoutineGenerationForm @wendler-maxes-submitted="submitForm"/>
            <div class="row">
                <span class="text-danger ml-3 mt-1">{{ message }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../../store";
import router from "../../router";
import { IRoutineGenerationInfo } from "../../domain/RoutineGenerationInfo";
import { IWendlerMaxes } from "../../domain/WendlerMaxes";
import RoutineGenerationForm from "../../components/RoutineGenerationForm.vue";
import BaseRoutineSelection from "../../components/BaseRoutineSelection.vue";
import { IAppTranslation } from '@/resources/translations/IAppTranslation';

@Component({
    components: {
        RoutineGenerationForm,
        BaseRoutineSelection
    }
})
export default class RoutineGenerate extends Vue {
    get hasActiveRoutine(): boolean | null {
        return store.state.activeRoutine !== null;
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    private baseRoutineId: string | null = null;
    private message = "";

    mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("/account/login")
        }
    }

    submitForm(wendlerMaxes: IWendlerMaxes) {
        if (this.baseRoutineId) {
            const newRoutineInfo: IRoutineGenerationInfo = {
                benchPressMax: wendlerMaxes.benchMax,
                deadliftMax: wendlerMaxes.deadliftMax,
                squatMax: wendlerMaxes.squatMax,
                overHeadPressMax: wendlerMaxes.pressMax,
                startingDate: new Date(),
                baseRoutineId: this.baseRoutineId,
                addDeloadWeek: false
            }
            store.dispatch("generateNewRoutine", newRoutineInfo)
            router.push("/routines")
        } else {
            this.message = "Please pick a base routine"
        }
    }

    setBaseRoutineId(id: string) {
        this.baseRoutineId = id
    }
}
</script>
