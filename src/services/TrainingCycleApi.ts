import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { ITrainingCycle } from "@/domain/TrainingCycle"
import store from '@/store'

export abstract class TrainingCycleApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getActive (jwt: string): Promise<ITrainingCycle | null> {
        const url = ApiUrls.trainingcycles + "/" + ApiUrls.active + "/" + this.getRequestCultureQueryString()
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as ITrainingCycle
            }
            return null
        } catch (error) {
            return null
        }
    }

    static getRequestCultureQueryString(): string {
        return store.state.currentCulture.code === "et-EE" ? "?culture=et-EE" : "?culture=en-GB"
    }
}
