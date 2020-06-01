import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { IBaseWorkoutRoutine, IFullWorkoutRoutine } from "@/domain/WorkoutRoutine"
import { IRoutineGenerationInfo } from "@/domain/RoutineGenerationInfo"
import store from '@/store'

export abstract class WorkoutRoutineApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getBaseRoutines(jwt: string): Promise<IBaseWorkoutRoutine[] | null> {
        const url = ApiUrls.baseWorkoutRoutines + this.getRequestCultureQueryString()
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IBaseWorkoutRoutine[]
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async getActiveRoutine(jwt: string): Promise<IFullWorkoutRoutine | null> {
        const url = ApiUrls.userWorkoutRoutines + "/" + ApiUrls.active + this.getRequestCultureQueryString()
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IFullWorkoutRoutine
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async deleteActiveRoutine(jwt: string): Promise<IBaseWorkoutRoutine | null> {
        const url = ApiUrls.userWorkoutRoutines + "/" + ApiUrls.delete + this.getRequestCultureQueryString()
        try {
            const response = await this.axios.post(url, {}, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IBaseWorkoutRoutine
            }
            return null
        } catch (error) {
            return null
        }
    }

    static async generateNewRoutine(newRoutineInfo: IRoutineGenerationInfo, jwt: string): Promise<IFullWorkoutRoutine | null> {
        const url = ApiUrls.userWorkoutRoutines + "/" + ApiUrls.generateRoutine + this.getRequestCultureQueryString()
        try {
            const response = await this.axios.post(url, newRoutineInfo, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IFullWorkoutRoutine
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
