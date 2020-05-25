import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { IMuscleGroup } from "@/domain/MuscleGroup"

export abstract class MuscleGroupsApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getAll (jwt: string): Promise<IMuscleGroup[] | null> {
        const url = ApiUrls.muscleGroups
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IMuscleGroup[]
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async getSingle (id: string, jwt: string): Promise<IMuscleGroup | null> {
        const url = ApiUrls.muscleGroups
        try {
            const response = await this.axios.get(url + id, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IMuscleGroup
            }
            return null
        } catch (error) {
            return null
        }
    }
}
