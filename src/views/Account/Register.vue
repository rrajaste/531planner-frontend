<template>
    <div>
        <h1>
            {{translations.register.title}}
        </h1>
        <hr/>
        <RegistrationForm v-if="isRegisterSuccessful !== true" v-on:registration-form-submitted="onSubmit"/>
        <div v-else>
            <h1>
                Registration was successful, click
                <router-link to="/account/login">
                    HERE
                </router-link> to log in.
            </h1>
        </div>
    </div>
</template>
<script lang=ts>

import { Component, Prop, Vue } from "vue-property-decorator"
import RegistrationForm from "../../components/RegistrationForm.vue"
import store from "@/store"
import { AccountApi } from "../../services/AccountApi"
import { IRegisterDTO } from "../../types/IRegisterDTO"
import { IAppTranslation } from '@/resources/translations/IAppTranslation'

@Component({
    components: {
        RegistrationForm
    }
})
export default class AccountRegister extends Vue {
    private message = "";
    private isRegisterSuccessful: boolean | null = null
    private loadingRequest: boolean | null = false
    get translations(): IAppTranslation {
        return store.getters.translations;
    }

    private passwordConfirm = "";

    async onSubmit (registrationInfo: IRegisterDTO) {
        const isApiCallSuccessful = await store.dispatch("register", registrationInfo)
        if (isApiCallSuccessful) {
            this.isRegisterSuccessful = true
        } else {
            this.isRegisterSuccessful = false
            this.setInvalidRegisterErrorMessage()
        }
    }

    setInvalidRegisterErrorMessage () {
        this.message = "Registration failed"
    }
}
</script>
