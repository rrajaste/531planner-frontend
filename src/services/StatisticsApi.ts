import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { IBodyMeasurementStatistics } from "@/domain/BodyMeasurementStatistics"
import { INutritionStatistics } from '@/domain/NutritionStatistics'

export abstract class StatisticsApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getBodyMeasurementStatistics (jwt: string): Promise<IBodyMeasurementStatistics | null> {
        const url = ApiUrls.userStatistics + "/" + ApiUrls.bodyMeasurements
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IBodyMeasurementStatistics
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async getNutritionStatistics (jwt: string): Promise<INutritionStatistics | null> {
        const url = ApiUrls.userStatistics + "/" + ApiUrls.nutritions
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as INutritionStatistics
            }
            return null
        } catch (error) {
            return null
        }
    }
}
