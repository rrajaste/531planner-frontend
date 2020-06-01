<template>
    <div>
        <h3 class="pb-1">{{ translations.routines.routineTemplates }}</h3>
        <p class="pb-2 border-bottom text-muted">{{ translations.routines.pleasePick }}</p>
        <div v-if="baseRoutines" class="row d-flex justify-content-center">
            <div v-for="routine in baseRoutines" :key="routine.id" class="card shadow rounded mb-3 mx-1 col-sm-12 col-md-8 col-xl-5">
                <div class="card-body text-center">
                    <h5 class="card-title text-uppercase">{{ routine.name }}</h5>
                    <p class="card-text"> {{ routine.description }} </p>
                </div>
            <div class="card-footer">
                <button @click="selectRoutine(routine.id)" class="btn text-uppercase btn-outline-success">{{translations.routines.select}}</button>
            </div>
            </div>
        </div>
        <div v-else class="row justify-content-center">
            <p class="text-muted">Hmmm... there seems to be a problem with our database</p>
        </div>
    </div>
</template>
<script lang=ts>

import { Component, Vue } from "vue-property-decorator"
import store from "../store"
import { IAppTranslation } from '@/resources/translations/IAppTranslation';

@Component
export default class BaseRoutineSelection extends Vue {
    get baseRoutines() {
        return store.state.baseRoutines;
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    async mounted() {
        await store.dispatch("getBaseRoutines");
    }

    selectRoutine(id: string) {
        this.$emit("routine-selected", id)
    }
}
</script>
