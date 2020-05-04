<template>
    <div>
        <form @submit.prevent="onSubmit" v-if="isRegisterSuccessful !== true">
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ username.displayName }}</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model.trim="username.value"
                        :class="username.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ username.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ email.displayName }}</label>
                    <input
                        type="email"
                        class="form-control"
                        v-model.trim="email.value"
                        :class="email.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ email.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>{{ password.displayName }}</label>
                    <input
                        type="password"
                        class="form-control"
                        v-model.trim="password.value"
                        :class="password.bootstrapValidationClass"
                    />
                    <div class="invalid-feedback">
                        <span>{{ password.errorMessage }}</span>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-3">
                    <label>Password confirm</label>
                    <input
                        type="password"
                        class="form-control"
                        v-model.trim="passwordConfirm"
                        :class="{
                            'is-invalid': this.password.value !== this.passwordConfirm,
                            'is-valid': this.password.value === this.passwordConfirm && this.password._isValid
                            }"
                    />
                    <div class="invalid-feedback">
                        <span>"Passwords do not match"</span>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <div v-else><h1>Registration was successful, click <router-link to="/account/login">HERE</router-link> to log in.</h1></div>
    </div>
</template>
<script lang=ts>

import { Component, Prop, Vue } from "vue-property-decorator"
import StringInputObject from "../../formvalidation/StringInputObject"
import EmailInputObject from "../../formvalidation/EmailInputObject"
import store from "@/store"
import { AccountApi } from '../../services/AccountApi'

@Component
export default class AccountRegister extends Vue {
    private message = "aaaaa";
    private isRegisterSuccessful: boolean | null = null

    private username = new StringInputObject({
        displayName: "Username",
        isRequired: true,
        min: 8,
        max: 64
    })

    private email = new EmailInputObject({
        displayName: "email",
        isRequired: true,
        min: 2,
        max: 64
    })

    private password = new StringInputObject({
        displayName: "Password",
        isRequired: true,
        min: 8,
        max: 64
    })

    private passwordConfirm = "";

    async onSubmit () {
        const registerInfo = { email: this.email.value, password: this.password.value, username: this.username.value }
        if (this._isFormValid()) {
            const result = await AccountApi.registerUser(registerInfo)
            if (result !== null) {
                this.isRegisterSuccessful = true
            } else {
                this.setInvalidRegisterErrorMessage()
            }
        }
    }

    setInvalidRegisterErrorMessage () {
        this.message = "Registration failed"
    }

    private _isFormValid () {
        return this.username.isValid && this.email.isValid && this.password.isValid
    }
}
</script>
