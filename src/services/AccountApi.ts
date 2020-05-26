import Axios from "axios"
import { ILoginDTO } from "@/types/ILoginDTO"
import { IRegisterDTO } from "@/types/IRegisterDTO"
import { ApiUrls } from "./ApiUrls"

interface IRegisterResponse {
    email?: string;
    username?: string;
}

interface ILoginResponse {
    token: string;
    status: string;
    hasActiveRoutine: boolean;
}

export abstract class AccountApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async logUserIn (loginDTO: ILoginDTO): Promise<ILoginResponse | null> {
        const url = ApiUrls.login
        try {
            const response = await this.axios.post(url, loginDTO)
            if (response.status === 200) {
                return response.data as ILoginResponse
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async registerUser (registerDTO: IRegisterDTO): Promise<IRegisterResponse | null> {
        const url = ApiUrls.register
        try {
            const response = await this.axios.post(url, registerDTO)
            return response.data as IRegisterResponse
        } catch (error) {
            return null
        }
    }
}
