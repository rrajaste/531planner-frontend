<template>
    <div id="app">
        <div class="container">
            <div class="jumbotron shadow rounded bg-white">
                <header>
                    <AppNavBar/>
                </header>
                <div class="container">
                    <main role="main" class="pb-3">
                        <router-view></router-view>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AppNavBar from "./components/AppNavBar.vue";
import store from './store';

@Component({
    components: {
        AppNavBar
    }
})
export default class App extends Vue {
    mounted() {
        store.dispatch("getCultures");
    }
}
</script>
<style global>
.jumbotron {
    margin-top: 80px;
}
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    white-space: nowrap;
    line-height: 60px;
}
</style>
