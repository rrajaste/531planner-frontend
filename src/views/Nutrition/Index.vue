<template>
    <div class="text-center">
        <h1 class="text-uppercase display-4">{{translations.nutrition.indexTitle}}</h1>
        <h3 v-if="isTodayLogged === false" class="text-uppercase">
            <router-link to="/nutrition/create">{{translations.nutrition.logToday}}</router-link>
        </h3>
        <h5 v-else class="text-muted">{{translations.nutrition.alreadyLogged}}</h5>
        <h1 class="py-3 border-top border-bottom text-uppercase my-5">{{translations.nutrition.statistics}}</h1>
        <CurrentNutritionStats v-if="nutritionIntakes && nutritionIntakes.length > 1"/>
        <CaloriesChart v-if="nutritionIntakes"/>
        <ProteinChart v-if="nutritionIntakes"/>
        <h3 class="text-danger">{{message}}</h3>
        <h1 class="py-3 border-top border-bottom text-uppercase my-5">{{translations.nutrition.nutritionLog}}</h1>
        <NutritionLog/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../../store";
import router from "@/router";
import NutritionLog from "@/components/NutritionLog.vue"
import CaloriesChart from "@/components/CaloriesChart.vue";
import ProteinChart from "@/components/ProteinChart.vue";
import CurrentNutritionStats from "@/components/CurrentNutritionStats.vue";
import { IAppTranslation } from '@/resources/translations/IAppTranslation';

@Component({
    components: {
        NutritionLog,
        CaloriesChart,
        ProteinChart,
        CurrentNutritionStats
    }
})
export default class NutritionIndex extends Vue {
    get nutritionIntakes() {
        return store.state.nutritionIntakes;
    }

    get isTodayLogged(): boolean | null {
        return store.getters.isTodayLogged
    }

    private message = "";

    async mounted() {
        if (!store.getters.isLoggedIn) {
            router.push("account/login");
        } else {
            await store.dispatch("getAllNutritionIntakes");
        }
    }

    get translations(): IAppTranslation {
        return store.getters.translations;
    }
}
</script>
