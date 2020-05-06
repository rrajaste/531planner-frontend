import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { INutritionIntake, INutritionIntakeCreate, INutritionIntakeEdit } from "@/domain/NutritionIntake"

export abstract class NutritionApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getAll (jwt: string): Promise<INutritionIntake[] | null> {
        const url = ApiUrls.nutritions
        try {
            const response = await this.axios.get<INutritionIntake[]>(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async getSingle (id: string, jwt: string): Promise<INutritionIntake | null> {
        const url = ApiUrls.nutritions
        try {
            const response = await this.axios.get<INutritionIntake>(url + id, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async delete (id: string, jwt: string): Promise<INutritionIntake | null> {
        const url = ApiUrls.nutritions
        try {
            const response = await this.axios.delete<INutritionIntake>(url + id, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async create (dto: INutritionIntakeCreate, jwt: string): Promise<INutritionIntake | null> {
        const url = ApiUrls.nutritions
        try {
            const response = await this.axios.post<INutritionIntake>(url, dto, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async update (dto: INutritionIntakeEdit, jwt: string): Promise<INutritionIntake | null> {
        const url = ApiUrls.nutritions
        try {
            const response = await this.axios.put<INutritionIntake>(url + dto.id, dto, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data
            }
            return null
        } catch (error) {
            return null
        }
    }
}
