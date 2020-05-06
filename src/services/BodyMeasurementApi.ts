import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { IBodyMeasurementCreate, IBodyMeasurementEdit, IBodyMeasurement } from "@/domain/BodyMeasurement"

export abstract class BodyMeasurementApi {
    private static axios = Axios.create(
        {
            baseURL: ApiUrls.apiBaseUrl,
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getAll (jwt: string): Promise<IBodyMeasurement[] | null> {
        const url = ApiUrls.bodyMeasurements
        try {
            const response = await this.axios.get<IBodyMeasurement[]>(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async getSingle (id: string, jwt: string): Promise<IBodyMeasurement | null> {
        const url = ApiUrls.bodyMeasurements
        try {
            const response = await this.axios.get(url + id, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IBodyMeasurement
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async delete (id: string, jwt: string): Promise<IBodyMeasurement | null> {
        const url = ApiUrls.bodyMeasurements
        try {
            const response = await this.axios.delete<IBodyMeasurement>(url + id, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async create (dto: IBodyMeasurementCreate, jwt: string): Promise<IBodyMeasurement | null> {
        const url = ApiUrls.bodyMeasurements
        console.log("sent data", JSON.stringify(dto))
        try {
            const response = await this.axios.post<IBodyMeasurement>(url, dto, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data
            }
            return null
        } catch (error) {
            console.log("error", error as Function)
            return null
        }
    }

    static async update (dto: IBodyMeasurementEdit, jwt: string): Promise<IBodyMeasurement | null> {
        const url = ApiUrls.bodyMeasurements
        try {
            const response = await this.axios.put(url + dto.id, dto, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IBodyMeasurement
            }
            return null
        } catch (error) {
            console.log("error", error)
            return null
        }
    }
}
