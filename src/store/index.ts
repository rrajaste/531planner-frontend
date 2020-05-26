import Vue from "vue"
import Vuex, { Store } from "vuex"
import { ILoginDTO } from "@/types/ILoginDTO"
import { IRegisterDTO } from "@/types/IRegisterDTO"
import { AccountApi } from "@/services/AccountApi"
import { MuscleApi } from "@/services/MuscleApi"
import { IMuscle } from "@/domain/Muscle"
import { IRoutineGenerationInfo } from "@/domain/RoutineGenerationInfo"
import { IMuscleGroup } from "@/domain/MuscleGroup"
import { MuscleGroupsApi } from "@/services/MuscleGroupsApi"
import { INutritionIntake, INutritionIntakeEdit, INutritionIntakeCreate } from "@/domain/NutritionIntake"
import { IBodyMeasurement, IBodyMeasurementCreate, IBodyMeasurementEdit } from "@/domain/BodyMeasurement"
import { NutritionApi } from "@/services/NutritionApi"
import { BodyMeasurementApi } from "@/services/BodyMeasurementApi"
import { WorkoutRoutineApi } from "@/services/WorkoutRoutineApi"
import { IFullWorkoutRoutine, IBaseWorkoutRoutine } from "@/domain/WorkoutRoutine"
import { ITrainingCycle } from '@/domain/TrainingCycle'
import { TrainingCycleApi } from '@/services/TrainingCycleApi'
import { UnitTypes } from '@/types/UnitTypes'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jwt: null as string | null,
        unitType: UnitTypes.metric as string,
        username: null as string | null,
        muscles: {} as IMuscle[] | null,
        muscleGroups: [] as IMuscleGroup[],
        activeRoutine: {} as IBaseWorkoutRoutine,
        activeCycle: {} as ITrainingCycle,
        baseRoutines: [] as IBaseWorkoutRoutine[]
    },
    mutations: {
        setJwt (state, jwt: string | null) {
            state.jwt = jwt
        },
        setUnitType (state, unitType: string) {
            state.unitType = unitType
        },
        setUserName (state, userName: string) {
            state.username = userName
        },
        setMuscles (state, muscles: IMuscle[]) {
            state.muscles = muscles
        },
        setMuscleGroups (state, muscleGroups: IMuscleGroup[]) {
            state.muscleGroups = muscleGroups
        },
        setActiveRoutine (state, activeRoutine: IBaseWorkoutRoutine) {
            state.activeRoutine = activeRoutine
        },
        setActiveCycle (state, activeCycle: ITrainingCycle) {
            state.activeCycle = activeCycle
        },
        setBaseRoutines (state, baseRoutines: IBaseWorkoutRoutine[]) {
            state.baseRoutines = baseRoutines
        }
    },
    getters: {
        isLoggedIn (context): boolean {
            return context.jwt !== null
        },
        loggedInUserName (context): string | null {
            return context.username
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
        setUnitTypeMetric (context): void {
            context.commit("setUnitType", UnitTypes.metric)
        },
        setUnitTypeImperial (context): void {
            context.commit("setUnitType", UnitTypes.imperial)
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
        },
        async getActiveRoutine (context): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await WorkoutRoutineApi.getActiveRoutine(jwt)
                if (apiResponse !== null) {
                    context.commit("setActiveRoutine", apiResponse);
                }
            }
            return apiResponse !== null
        },
        async getBaseRoutines (context): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await WorkoutRoutineApi.getBaseRoutines(jwt)
                if (apiResponse !== null) {
                    context.commit("setBaseRoutine", apiResponse);
                }
            }
            return apiResponse !== null
        },
        async generateNewRoutine (context, info: IRoutineGenerationInfo): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await WorkoutRoutineApi.generateNewRoutine(info, jwt)
                if (apiResponse !== null) {
                    context.commit("setActiveCycle", apiResponse?.trainingCycles)
                    context.commit("setActiveRoutine", apiResponse as IBaseWorkoutRoutine)
                }
            }
            return apiResponse !== null
        },
        async getActiveCycle (context): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await TrainingCycleApi.getActive(jwt)
                if (apiResponse !== null) {
                    context.commit("setActiveCycle", apiResponse);
                }
            }
            return apiResponse !== null;
        }
    },
    modules: {
    }
})
