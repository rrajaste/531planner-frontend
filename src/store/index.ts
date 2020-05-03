import Vue from "vue"
import Vuex from "vuex"
import { ILoginDTO } from "@/types/ILoginDTO"
import { AccountApi } from "@/services/AccountApi"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jwt: null as string | null,
        username: null as string | null
    },
    mutations: {
        setJwt (state, jwt: string | null) {
            state.jwt = jwt
        },
        setUserName (state, userName: string | null) {
            state.username = userName
        }
    },
    getters: {
        isLoggedIn (context): boolean {
            return context.jwt !== null
        },
        loggedInUserName (context): string | null {
            return context.username
        }
    },
    actions: {
        logout (context): void {
            context.commit("setJwt", null)
        },
        async login (context, loginInfo: ILoginDTO): Promise<boolean> {
            const jwt = await AccountApi.getJwt(loginInfo)
            context.commit("setJwt", jwt)
            context.commit("setUserName", loginInfo.username)
            return jwt !== null
        }
    },
    modules: {
    }
})
