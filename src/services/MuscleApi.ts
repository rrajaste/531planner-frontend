import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { IMuscle } from "@/domain/Muscle"

export abstract class MuscleApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getAll (jwt: string): Promise<IMuscle[] | null> {
        const url = ApiUrls.muscles
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IMuscle[]
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async getSingle (id: string, jwt: string): Promise<IMuscle | null> {
        const url = ApiUrls.muscles
        try {
            const response = await this.axios.get(url + id, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IMuscle
            }
            return null
        } catch (error) {
            return null
        }
    }
}
