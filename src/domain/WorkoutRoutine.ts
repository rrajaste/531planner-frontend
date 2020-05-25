import { ITrainingCycle } from "./TrainingCycle"

export interface IBaseWorkoutRoutine {
    id: string,
    name: string,
    description: string
}

export interface IUserBaseWorkoutRoutine {
    id: string,
    name: string,
    description: string
    trainingCycles: ITrainingCycle[]
}