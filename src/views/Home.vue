<template>
    <div id="greeting-text" class="text-center">
        <h1 class="display-4 text-uppercase">{{ translations.home.title }}</h1>
        <h2>{{ translations.home.subtitle }}</h2>
        <hr />
        <h3 class="text-font-weight-bold">{{ translations.home.whatIsTitle }}</h3>
        <p class>
            {{ translations.home.whatIsText }}
        </p>
        <h3 class="text-font-weight-bold">{{ translations.home.featuresTitle }}</h3>
        <p>
            {{ translations.home.featuresText }}
        </p>
        <p />
        <h3>{{ translations.home.furterMoreTitle }}</h3>
        <p>
            {{ translations.home.furterMoreText }}
        </p>
        <h3>{{ translations.home.soundsGoodTitle }}</h3>
        <p></p>
        <p>
            {{ translations.home.soundsGoodText }}
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "@/store"
import { IAppTranslation } from '@/resources/translations/IAppTranslation';

@Component
export default class Home extends Vue {
    get translations(): IAppTranslation {
        return store.getters.translations;
    }
}
</script>
<style scoped>

#greeting-text {
    width: 70%;
    margin: auto
}
</style>
