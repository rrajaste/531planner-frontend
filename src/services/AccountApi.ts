import Axios from "axios"
import { ILoginDTO } from "@/types/ILoginDTO"
import { IRegisterDTO } from "@/types/IRegisterDTO"
import { ApiUrls } from "./ApiUrls"

interface IRegisterResponse {
    email?: string;
    username?: string;
}

export abstract class AccountApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getJwt (loginDTO: ILoginDTO): Promise<string | null> {
        const url = ApiUrls.login
        try {
            const response = await this.axios.post(url, loginDTO)
            if (response.status === 200) {
                return response.data.token
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
            console.log(response)
            return response.data as IRegisterResponse
        } catch (error) {
            return null
        }
    }
}
