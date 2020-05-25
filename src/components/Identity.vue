<template>

    <ul class="navbar-nav mr-auto">
        <template v-if="isLoggedIn">
            <li class="nav-item">
                <a
                    @click="logoutOnClick"
                    class="nav-link"
                    id="navbarLogout"
                    aria-haspopup="true"
                    aria-expanded="false"
                    href="#"
                >Logout</a>
            </li>
            <li class="nav-item">
                <router-link
                    to="/"
                    class="nav-link"
                    id="navbarGreeting"
                    aria-haspopup="true"
                    aria-expanded="false"
                >Hello {{ loggedInUserName }}</router-link>
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
                >Login</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    to="/account/register"
                    class="nav-link"
                    id="navbarRegister"
                    aria-haspopup="true"
                    aria-expanded="false"
                >Register</router-link>
            </li>
        </template>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import store from "../store"
import router from "../router"

@Component
export default class Identity extends Vue {
    get isLoggedIn (): boolean {
        return store.getters.isLoggedIn
    }

    get loggedInUserName (): string {
        return store.getters.loggedInUserName
    }

    logoutOnClick () {
        store.dispatch("logout")
        router.push("/")
    }
}
</script>
