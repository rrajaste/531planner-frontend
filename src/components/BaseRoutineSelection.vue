<template>
    <div>
        <h3 class="pb-4 border-bottom">Routine templates</h3>
        <div v-if="baseRoutines" class="row d-flex justify-content-center">
            <div v-for="routine in baseRoutines" :key="routine.id" class="card shadow rounded mb-3 mx-1 col-sm-12 col-md-8 col-xl-5">
                <div class="card-body text-center">
                    <h5 class="card-title text-uppercase">{{ routine.name }}</h5>
                    <p class="card-text"> {{ routine.description }} </p>
                </div>
            <div class="card-footer">
                <button @click="selectRoutine(routine.id)" class="btn btn-outline-success">SELECT</button>
            </div>
            </div>
        </div>
        <div v-else class="row justify-content-center">
            <p class="text-muted">Hmmm... there seems to be a problem with our database</p>
        </div>
    </div>
</template>
<script lang=ts>

import { Component, Prop, Vue, Emit } from "vue-property-decorator"
import store from "../store"

@Component
export default class BaseRoutineSelection extends Vue {
    get baseRoutines() {
        return store.state.baseRoutines;
    }

    async mounted() {
        await store.dispatch("getBaseRoutines");
    }

    selectRoutine(id: string) {
        this.$emit("routine-selected", id)
    }
}
</script>
