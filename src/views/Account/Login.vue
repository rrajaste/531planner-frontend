<template>
    <div>
        <h1>{{translations.login.title}}</h1>
        <div class="row">
        <div class="col-md-7">
            <div class="row">
                <div class="col-md-7">
                    <section>
                        <form id="account" method="post" @submit.prevent="handleSubmit">
                            <h4>{{translations.login.subtitle}}</h4>
                            <hr />
                            <span class="text-danger">{{ errorMessage }}</span>
                            <div class="form-group">
                                <label for="Input_Email">{{translations.login.username}}</label>
                                <input
                                    v-model="loginInfo.username"
                                    class="form-control"
                                    id="InputEmail"
                                    name="Input.Email"
                                    value
                                />
                                <span
                                    class="text-danger field-validation-valid"
                                ></span>
                            </div>
                            <div class="form-group">
                                <label for="Input_Password">{{translations.login.password}}</label>
                                <input
                                    v-model="loginInfo.password"
                                    class="form-control"
                                    type="password"
                                    id="Input_Password"
                                    name="Input.Password"
                                />
                                <span
                                    class="text-danger field-validation-valid"
                                ></span>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">{{translations.login.logInButton}}</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { ILoginDTO } from "../../types/ILoginDTO"
import store from "@/store"
import router from "@/router"
import { IAppTranslation } from '@/resources/translations/IAppTranslation'

@Component
export default class AccountLogin extends Vue {
    private loginInfo: ILoginDTO = { username: "", password: "" }
    private errorMessage = ""
    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    handleSubmit () {
        if (this.loginInfo.username.length > 0 && this.loginInfo.password.length > 0) {
            this.logUserIn()
        } else {
            this.errorMessage = "Please enter your username and password"
        }
    }

    logUserIn () {
        store.dispatch("login", this.loginInfo).then(
            (isLoggedIn: boolean) => {
                if (isLoggedIn) {
                    router.push("/")
                } else {
                    this.setInvalidLoginErrorMessage()
                }
            })
    }

    setInvalidLoginErrorMessage () {
        this.errorMessage = "Invalid username and password combination"
    }
}
</script>
