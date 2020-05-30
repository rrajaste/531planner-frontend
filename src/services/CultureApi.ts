import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { ICulture } from '@/domain/Culture'

export abstract class CultureApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getAll (): Promise<ICulture[] | null> {
        const url = ApiUrls.culture
        try {
            const response = await this.axios.get(url)
            if (response.status === 200) {
                return response.data as ICulture[]
            }
            return null
        } catch (error) {
            return null
        }
    }
}
