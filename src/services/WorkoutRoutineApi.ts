import Axios from "axios"
import { ApiUrls } from "./ApiUrls"
import { IBaseWorkoutRoutine, IFullWorkoutRoutine } from "@/domain/WorkoutRoutine"
import { IRoutineGenerationInfo } from "@/domain/RoutineGenerationInfo"

export abstract class MuscleApi {
    private static axios = Axios.create({
        baseURL: ApiUrls.apiBaseUrl
    })

    static async getBaseRoutines (jwt: string): Promise<IBaseWorkoutRoutine[] | null> {
        const url = ApiUrls.baseWorkoutRoutines
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IBaseWorkoutRoutine[]
            }
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async getActiveRoutine (jwt: string): Promise<IFullWorkoutRoutine | null> {
        const url = ApiUrls.userWorkoutRoutines + ApiUrls.active
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IFullWorkoutRoutine
            }
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async deleteActiveRoutine (jwt: string): Promise<IBaseWorkoutRoutine | null> {
        const url = ApiUrls.userWorkoutRoutines + ApiUrls.delete
        try {
            const response = await this.axios.get(url, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IBaseWorkoutRoutine
            }
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async generateNewRoutine (newRoutineInfo: IRoutineGenerationInfo, jwt: string): Promise<IBaseWorkoutRoutine | null> {
        const url = ApiUrls.userWorkoutRoutines + ApiUrls.delete
        try {
            const response = await this.axios.post(url, newRoutineInfo, { headers: { Authorization: "Bearer " + jwt } })
            if (response.status === 200) {
                return response.data as IBaseWorkoutRoutine
            }
            return null
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
