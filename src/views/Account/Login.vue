<template>
    <div>
        <h1>Log in</h1>
        <div class="row">
        <div class="col-md-7">
            <div class="row">
                <div class="col-md-7">
                    <section>
                        <form id="account" method="post" @submit.prevent="handleSubmit">
                            <h4>Use a local account to log in.</h4>
                            <hr />
                            <span class="text-danger">{{ errorMessage }}</span>
                            <div class="form-group">
                                <label for="Input_Email">Username</label>
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
                                <label for="Input_Password">Password</label>
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
                                <button type="submit" class="btn btn-primary">Log in</button>
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

@Component
export default class AccountLogin extends Vue {
    private loginInfo: ILoginDTO = { username: "", password: "" }
    private errorMessage = ""

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
