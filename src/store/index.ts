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
import { ITrainingWeek } from '@/domain/TrainingWeek'
import { TrainingCycleApi } from '@/services/TrainingCycleApi'
import { UnitTypes } from '@/types/UnitTypes'
import { UnitTypeConverter } from '@/calculators/unitTypeConverter'
import { IBodyMeasurementStatistics } from '@/domain/BodyMeasurementStatistics'
import { StatisticsApi } from '@/services/StatisticsApi'
import { INutritionStatistics } from '@/domain/NutritionStatistics'
import { CultureApi } from '@/services/CultureApi'
import { ICulture } from '@/domain/Culture'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        jwt: null as string | null,
        hasActiveRoutine: false as boolean,
        unitType: UnitTypes.metric as string,
        username: null as string | null,
        muscles: {} as IMuscle[] | null,
        muscleGroups: [] as IMuscleGroup[],
        bodyMeasurements: [] as IBodyMeasurement[],
        activeRoutine: null as IBaseWorkoutRoutine | null,
        activeCycle: null as ITrainingCycle | null,
        baseRoutines: [] as IBaseWorkoutRoutine[],
        bodyMeasurementToMutate: null as IBodyMeasurement | null,
        bodyMeasurementStatistics: null as IBodyMeasurementStatistics | null,
        nutritionIntakes: null as INutritionIntake[] | null,
        nutritionIntakeToMutate: null as INutritionIntake | null,
        nutritionStatistics: null as INutritionStatistics | null,
        cultures: null as ICulture[] | null
    },
    mutations: {
        setJwt(state, jwt: string | null) {
            state.jwt = jwt
        },
        setHasActiveRoutine(state, hasActiveRoutine: boolean) {
            state.hasActiveRoutine = hasActiveRoutine
        },
        setUnitType(state, unitType: string) {
            state.unitType = unitType
        },
        setUserName(state, userName: string | null) {
            state.username = userName
        },
        setMuscles(state, muscles: IMuscle[]) {
            state.muscles = muscles
        },
        setMuscleGroups(state, muscleGroups: IMuscleGroup[]) {
            state.muscleGroups = muscleGroups
        },
        setBodyMeasurements(state, bodyMeasurements: IBodyMeasurement[]) {
            state.bodyMeasurements = bodyMeasurements
        },
        setActiveRoutine(state, activeRoutine: IBaseWorkoutRoutine | null) {
            state.activeRoutine = activeRoutine
        },
        setActiveCycle(state, activeCycle: ITrainingCycle | null) {
            state.activeCycle = activeCycle
        },
        setBaseRoutines(state, baseRoutines: IBaseWorkoutRoutine[]) {
            state.baseRoutines = baseRoutines
        },
        setBodyMeasurementToMutate(state, bodyMeasurement: IBodyMeasurement) {
            state.bodyMeasurementToMutate = bodyMeasurement
        },
        setBodyMeasurementStatistics(state, statistics: IBodyMeasurementStatistics) {
            state.bodyMeasurementStatistics = statistics
        },
        setNutritionIntakes(state, intakes: INutritionIntake[]) {
            state.nutritionIntakes = intakes
        },
        setNutritionIntakeToMutate(state, intake: INutritionIntake) {
            state.nutritionIntakeToMutate = intake
        },
        setNutritionStatistics(state, stats: INutritionStatistics) {
            state.nutritionStatistics = stats
        },
        setCultures(state, cultures: ICulture[]) {
            state.cultures = cultures
        }
    },
    getters: {
        isLoggedIn(context): boolean {
            return context.jwt !== null
        },
        loggedInUserName(context): string | null {
            return context.username
        },
        convertedBodyMeasurements(context): IBodyMeasurement[] | null {
            if (context.unitType === UnitTypes.imperial) {
                return context.bodyMeasurements.map(
                    measurement => UnitTypeConverter.bodyMeasurementToImperial(measurement))
            }
            return context.bodyMeasurements
        },
        convertedBodyMeasurementToMutate(context): IBodyMeasurement | null {
            let mappedMeasurement = context.bodyMeasurementToMutate
            if (context.unitType === UnitTypes.imperial) {
                if (mappedMeasurement) {
                    mappedMeasurement = UnitTypeConverter.bodyMeasurementToImperial(mappedMeasurement)
                }
            }
            return mappedMeasurement
        },
        jwt(context): string | null {
            return context.jwt
        },
        unitTypeLengthAbbreviation(context) {
            return context.unitType === UnitTypes.metric ? "cm" : "in"
        },
        nutritionIntakeAbbreviation(context) {
            return "g"
        },
        unitTypeWeightAbbreviation(context): string | null {
            return context.unitType === UnitTypes.metric ? "kg" : "lb"
        },
        activeWeek(context): ITrainingWeek | null {
            if (context.activeCycle == null) {
                return null;
            }
            const currentDate = new Date()
            const foundWeek = context
                .activeCycle
                .trainingWeeks
                .find(week =>
                    currentDate >= new Date(week.startingDate) &&
                    new Date(week.endingDate) >= currentDate
                );
            return foundWeek === undefined ? null : foundWeek
        },
        isCycleOver(context): boolean | null {
            if (!context.activeCycle || !context.activeCycle.trainingWeeks) {
                return null
            }
            const currentDate = new Date()
            const lastWeek = context.activeCycle.trainingWeeks[context.activeCycle.trainingWeeks.length - 1]
            return lastWeek.endingDate < currentDate
        },
        firstWeekStartingDate(context): Date | null {
            if (!context.activeCycle || !context.activeCycle.trainingWeeks) {
                return null
            }
            const firstWeek = context.activeCycle.trainingWeeks[0]
            return firstWeek.startingDate
        },
        bodyMeasurementLogStartDate(context): Date | null {
            if (context.bodyMeasurements !== null && context.bodyMeasurements.length > 0) {
                return context.bodyMeasurements[0].loggedAt
            }
            return null
        }
    },
    actions: {
        logout(context): void {
            context.commit("setJwt", null)
            context.commit("setUserName", null)
            context.commit("setNutritionIntakes", null)
            context.commit("setNutritionIntakeToMutate", null)
            context.commit("setHasActiveRoutine", null)
            context.commit("setBodyMeasurements", null)
            context.commit("setNutritionStatistics", null)
            context.commit("setBodyMeasurementStatistics", null)
            context.commit("setBodyMeasurementToMutate", null)
            context.commit("setActiveRoutine", null)
            context.commit("setActiveCycle", null)
        },
        async login(context, loginInfo: ILoginDTO): Promise<boolean> {
            const response = await AccountApi.logUserIn(loginInfo)
            if (response !== null) {
                context.commit("setJwt", response.token)
                context.commit("setHasActiveRoutine", response.hasActiveRoutine)
                context.commit("setUserName", loginInfo.username)
            }
            return response !== null
        },
        setUnitTypeMetric(context): void {
            context.commit("setUnitType", UnitTypes.metric)
        },
        setUnitTypeImperial(context): void {
            context.commit("setUnitType", UnitTypes.imperial)
        },
        async register(context, registerInfo: IRegisterDTO): Promise<boolean> {
            const response = await AccountApi.registerUser(registerInfo)
            return response !== null
        },
        async getAllNutritionIntakes(context): Promise<boolean> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiResponse = await NutritionApi.getAll(jwt)
                context.commit("setNutritionIntakes", apiResponse)
                return apiResponse !== null
            }
            return false
        },
        async getSingleNutritionIntake(context, id: string): Promise<boolean> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiRepsonse = await NutritionApi.getSingle(id, jwt)
                context.commit("setNutritionIntakeToMutate", apiRepsonse)
                return apiRepsonse !== null
            }
            return false
        },
        async deleteNutritionIntake(context, id: string): Promise<boolean> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiRepsonse = NutritionApi.delete(id, jwt)
                context.commit("setNutritionIntakeToMutate", null)
                return apiRepsonse !== null
            }
            return false
        },
        async updateNutritionIntake(context, dto: INutritionIntakeEdit): Promise<boolean> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiResponse = await NutritionApi.update(dto, jwt)
                context.commit("setNutritionIntakeToMutate", null)
                return apiResponse !== null
            }
            return false
        },
        async createNutritionIntake(context, dto: INutritionIntakeCreate): Promise<boolean> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiResponse = await NutritionApi.create(dto, jwt)
                return apiResponse !== null
            }
            return false
        },
        async getAllBodyMeasurements(context): Promise<boolean | null> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiResponse = await BodyMeasurementApi.getAll(jwt)
                if (apiResponse !== null) {
                    context.commit("setBodyMeasurements", apiResponse);
                }
                return apiResponse !== null
            }
            return null
        },
        async getSingleBodyMeasurement(context, id: string): Promise<boolean> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiResponse = await BodyMeasurementApi.getSingle(id, jwt)
                if (apiResponse) {
                    context.commit("setBodyMeasurementToMutate", apiResponse)
                }
                return apiResponse !== null
            }
            return false
        },
        async deleteBodyMeasurement(context, id: string): Promise<boolean> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiResponse = await BodyMeasurementApi.delete(id, jwt)
                context.commit("setBodyMeasurementToMutate", null)
                return apiResponse !== null
            }
            return false
        },
        async updateBodyMeasurement(context, dto: IBodyMeasurementEdit): Promise<boolean> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiResponse = await BodyMeasurementApi.update(dto, jwt)
                context.commit("setBodyMeasurementToMutate", null)
                return apiResponse !== null
            }
            return false
        },
        async createBodyMeasurements(context, dto: IBodyMeasurementCreate): Promise<boolean> {
            const jwt = context.getters.jwt
            if (jwt !== null) {
                const apiResponse = await BodyMeasurementApi.create(dto, jwt)
                return apiResponse !== null
            }
            return false
        },
        async getActiveRoutine(context): Promise<boolean> {
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
        async getBaseRoutines(context): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await WorkoutRoutineApi.getBaseRoutines(jwt)
                if (apiResponse !== null) {
                    context.commit("setBaseRoutines", apiResponse);
                }
            }
            return apiResponse !== null
        },
        async generateNewRoutine(context, info: IRoutineGenerationInfo): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await WorkoutRoutineApi.generateNewRoutine(info, jwt)
                if (apiResponse !== null) {
                    context.commit("setActiveCycle", apiResponse.trainingCycles[0])
                    context.commit("setActiveRoutine", apiResponse as IBaseWorkoutRoutine)
                }
            }
            return apiResponse !== null
        },
        async getActiveCycle(context): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await TrainingCycleApi.getActive(jwt)
                if (apiResponse !== null) {
                    context.commit("setActiveCycle", apiResponse);
                }
            }
            return apiResponse !== null;
        },
        async deleteActiveRoutine(context): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await WorkoutRoutineApi.deleteActiveRoutine(jwt)
                if (apiResponse !== null) {
                    context.commit("setHasActiveRoutine", false);
                    context.commit("setActiveRoutine", null);
                    context.commit("setActiveCycle", null);
                }
            }
            return apiResponse !== null;
        },
        async getBodyMeasurementStatistics(context): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await StatisticsApi.getBodyMeasurementStatistics(jwt)
                if (apiResponse !== null) {
                    context.commit("setBodyMeasurementStatistics", apiResponse);
                }
            }
            return apiResponse !== null;
        },
        async getNutritionStatistics(context): Promise<boolean> {
            const jwt = context.getters.jwt
            let apiResponse = null;
            if (jwt !== null) {
                apiResponse = await StatisticsApi.getNutritionStatistics(jwt)
                if (apiResponse !== null) {
                    context.commit("setNutritionStatistics", apiResponse);
                }
            }
            return apiResponse !== null;
        },
        async getCultures(context): Promise<boolean> {
            const apiResponse = await CultureApi.getAll();
            context.commit("setCultures", apiResponse)
            return apiResponse !== null;
        }
    },
    modules: {
    }
})
