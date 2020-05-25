import Vue from "vue"
import Vuex from "vuex"
import { ILoginDTO } from "@/types/ILoginDTO"
import { IRegisterDTO } from "@/types/IRegisterDTO"
import { AccountApi } from "@/services/AccountApi"
import { MuscleApi } from "@/services/MuscleApi"
import { IMuscle } from "@/domain/Muscle"
import { UnitType } from "@/domain/UnitType"
import { IMuscleGroup } from "@/domain/MuscleGroup"
import { UnitTypeApi } from "@/services/UnitTypeApi"
import { MuscleGroupsApi } from "@/services/MuscleGroupsApi"
import { INutritionIntake, INutritionIntakeEdit, INutritionIntakeCreate } from "@/domain/NutritionIntake"
import { IBodyMeasurement, IBodyMeasurementCreate, IBodyMeasurementEdit } from "@/domain/BodyMeasurement"
import { NutritionApi } from "@/services/NutritionApi"
import { BodyMeasurementApi } from "@/services/BodyMeasurementApi"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jwt: null as string | null,
        username: null as string | null,
        muscles: null as IMuscle[] | null,
        muscleGroups: null as IMuscleGroup[] | null,
        unitTypes: null as UnitType[] | null
    },
    mutations: {
        setJwt (state, jwt: string | null) {
            state.jwt = jwt
        },
        setUserName (state, userName: string | null) {
            state.username = userName
        },
        setMuscles (state, muscles: IMuscle[] | null) {
            state.muscles = muscles
        },
        setMuscleGroups (state, muscleGroups: IMuscleGroup[] | null) {
            state.muscleGroups = muscleGroups
        },
        setUnitTypes (state, unitTypes: UnitType[] | null) {
            state.unitTypes = unitTypes
        }
    },
    getters: {
        isLoggedIn (context): boolean {
            return context.jwt !== null
        },
        loggedInUserName (context): string | null {
            return context.username
        },
        muscles (context): IMuscle[] | null {
            return context.muscles
        },
        muscleGroups (context): IMuscleGroup[] | null {
            return context.muscleGroups
        },
        unitTypes (context): UnitType[] | null {
            return context.unitTypes
        },
        jwt (context): string | null {
            return context.jwt
        }
    },
    actions: {
        logout (context): void {
            context.commit("setJwt", null)
            context.commit("setUserName", null)
        },
        async login (context, loginInfo: ILoginDTO): Promise<boolean> {
            const jwt = await AccountApi.getJwt(loginInfo)
            if (jwt !== null) {
                context.commit("setJwt", jwt)
                context.commit("setUserName", loginInfo.username)
            }
            return jwt !== null
        },
        async register (context, registerInfo: IRegisterDTO): Promise<boolean> {
            const response = await AccountApi.registerUser(registerInfo)
            return response !== null
        },
        async getMuscles (context): Promise<IMuscle[] | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                if (context.getters.muscles === null) {
                    const muscles = await MuscleApi.getAll(jwt)
                    context.commit("setMuscles", muscles)
                    return muscles
                }
                return context.getters.muscles
            }
            return null
        },
        async getMuscleGroups (context): Promise<IMuscleGroup[] | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                if (context.getters.unitTypes === null) {
                    const muscleGroups = await MuscleGroupsApi.getAll(jwt)
                    context.commit("setMuscleGroups", muscleGroups)
                    return muscleGroups
                }
                return context.getters.muscleGroups
            }
            return null
        },
        async getAllNutritionIntakes (context): Promise<INutritionIntake[] | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await NutritionApi.getAll(jwt)
            }
            return null
        },
        async getSingleNutritionIntake (context, id: string): Promise<INutritionIntake | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await NutritionApi.getSingle(id, jwt)
            }
            return null
        },
        async deleteNutritionIntake (context, id: string): Promise<INutritionIntake | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await NutritionApi.delete(id, jwt)
            }
            return null
        },
        async updateNutritionIntake (context, dto: INutritionIntakeEdit): Promise<INutritionIntake | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await NutritionApi.update(dto, jwt)
            }
            return null
        },
        async createNutritionIntake (context, dto: INutritionIntakeCreate): Promise<INutritionIntake | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await NutritionApi.create(dto, jwt)
            }
            return null
        },
        async getAllBodyMeasurements (context): Promise<IBodyMeasurement[] | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await BodyMeasurementApi.getAll(jwt)
            }
            return null
        },
        async getSingleBodyMeasurement (context, id: string): Promise<IBodyMeasurement | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await BodyMeasurementApi.getSingle(id, jwt)
            }
            return null
        },
        async deleteBodyMeasurement (context, id: string): Promise<IBodyMeasurement | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await BodyMeasurementApi.delete(id, jwt)
            }
            return null
        },
        async updateBodyMeasurement (context, dto: IBodyMeasurementEdit): Promise<IBodyMeasurement | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await BodyMeasurementApi.update(dto, jwt)
            }
            return null
        },
        async createBodyMeasurements (context, dto: IBodyMeasurementCreate): Promise<IBodyMeasurement | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                return await BodyMeasurementApi.create(dto, jwt)
            }
            return null
        }

    },
    modules: {
    }
})
