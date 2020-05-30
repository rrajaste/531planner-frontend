<template>
    <nav
        class="navbar fixed-top navbar-expand-sm navbar-toggleable-sm navbar-dark bg-secondary border-bottom box-shadow mb-3"
    >
        <div class="container">
            <router-link
                to="/"
                class="navbar-brand"
                id="navbarHome"
                aria-haspopup="true"
                aria-expanded="false"
            >{{ translations.navBar.appName }}</router-link>
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
                <ul v-if="isLoggedIn" class="navbar-nav flex-grow-1">
                    <li class="nav-item">
                        <router-link
                            to="/bodymeasurements"
                            class="nav-link"
                            id="navbarBodyMeasurements"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >{{ translations.navBar.bodyMeasurements }}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            to="/nutrition"
                            class="nav-link"
                            id="navbarNutriton"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >{{ translations.navBar.nutrition }}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link
                            to="/routines"
                            class="nav-link"
                            id="navbarWorkoutRoutine"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >{{ translations.navBar.routines }}</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >Language<span v-if="selectedCulture">({{selectedCulture.code}})</span></a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a v-for="culture in cultures" :key="culture.code" @click="cultureSelected(culture)" class="dropdown-item" href="#">{{culture.name}}</a>
                        </div>
                    </li>
                    <template v-if="isLoggedIn">
                        <li class="nav-item">
                            <router-link
                                to="/"
                                class="nav-link"
                                id="navbarGreeting"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >{{ translations.navBar.hello }}, {{ loggedInUserName }}!</router-link>
                        </li>
                        <li class="nav-item">
                            <a
                                @click="logoutOnClick"
                                class="nav-link"
                                id="navbarLogout"
                                aria-haspopup="true"
                                aria-expanded="false"
                                href="#"
                            >{{ translations.navBar.logout }}</a>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <router-link
                                to="/account/login"
                                class="nav-link"
                                id="navbarLogin"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >{{ translations.navBar.login }}</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                to="/account/register"
                                class="nav-link"
                                id="navbarRegister"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >{{ translations.navBar.register }}</router-link>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";
import router from "../router";
import { ICulture } from "@/domain/Culture";
import { IAppTranslation } from "@/resources/translations/IAppTranslation"

@Component
export default class Identity extends Vue {
    get cultures(): ICulture[] | null {
        return store.state.cultures;
    }

    get selectedCulture(): ICulture | null {
        return store.state.currentCulture;
    }

    get isLoggedIn(): boolean {
        return store.getters.isLoggedIn;
    }

    get loggedInUserName(): string {
        return store.getters.loggedInUserName;
    }

    get translations(): IAppTranslation {
        return store.getters.translations
    }

    logoutOnClick() {
        store.dispatch("logout");
        router.push("/");
    }

    cultureSelected(culture: ICulture) {
        store.commit("setCurrentCulture", culture)
    }
}
</script>
