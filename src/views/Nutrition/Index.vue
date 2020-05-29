<template>
    <div class="text-center">
        <h1 class="text-uppercase displa-4">Daily nutrition intake</h1>
        <h3 class="text-uppercase">
            <router-link to="/nutrition/create">Log today</router-link>
        </h3>
        <h1 class="py-3 border-top border-bottom text-uppercase my-5">STATISTICS</h1>
        <CaloriesChart/>
        <ProteinChart/>
        <h3 class="text-danger">{{message}}</h3>
        <h1 class="py-3 border-top border-bottom text-uppercase my-5">NUTRITION LOG</h1>
        <NutritionLog/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { INutritionIntake } from "../../domain/NutritionIntake";
import store from "../../store";
import router from "@/router";
import NutritionLog from "@/components/NutritionLog.vue"
import CaloriesChart from "@/components/CaloriesChart.vue";
import ProteinChart from "@/components/ProteinChart.vue";

@Component({
    components: {
        NutritionLog,
        CaloriesChart,
        ProteinChart
    }
})
export default class NutritionIndex extends Vue {
    get nutritionIntakes() {
        return store.state.nutritionIntakes;
    }

    private message = "";

    async mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("account/login");
        } else {
            const apiResponse = await store.dispatch("getAllNutritionIntakes");
            if (apiResponse == null) {
                this.message = "Failed to communicate with backend api";
            }
        }
    }
}
</script>
