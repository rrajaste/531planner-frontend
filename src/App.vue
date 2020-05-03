<template>
    <div id="app">
        <header>
            <nav
                class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3"
            >
                <div class="container">
                    <router-link
                        to="/"
                        class="navbar-brand"
                        id="navbarHome"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >5/3/1 planner</router-link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav flex-grow-1">
                            <li class="nav-item">
                                <router-link
                                    to="/bodymeasurements"
                                    class="nav-link"
                                    id="navbarBodyMeasurements"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >Body measurements</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    to="/nutrition"
                                    class="nav-link"
                                    id="navbarNutriton"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >Nutrition</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link
                                    to="/routines"
                                    class="nav-link"
                                    id="navbarWorkoutRoutine"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >Workout routine</router-link>
                            </li>
                        </ul>
                        <Identity/>
                    </div>
                </div>
            </nav>
        </header>
        <div class="container">
            <main role="main" class="pb-3">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import Identity from "./components/Identity.vue"

@Component({
    components: {
        Identity
    }
})

export default class App extends Vue {}
</script>
