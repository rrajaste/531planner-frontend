import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { UnitType } from "@/domain/UnitType"

export abstract class UnitTypeApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getAll (jwt: string): Promise<UnitType[] | null> {
        const url = ApiUrls.unitTypes
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as UnitType[]
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async getSingle (id: string, jwt: string): Promise<UnitType | null> {
        const url = ApiUrls.unitTypes
        try {
            const response = await this.axios.get(url + id, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as UnitType
            }
            return null
        } catch (error) {
            return null
        }
    }
}
