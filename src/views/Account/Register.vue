<template>
    <RegisterForm></RegisterForm>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import RegisterForm from "../../components/RegisterForm.vue"

@Component({
    components: {
        RegisterForm
    }
})

export default class AccountRegister extends Vue {
    handleSubmit () {
        console.log("a")
    }
}

</script>
