import { ITrainingCycle } from "./TrainingCycle"

export interface IBaseWorkoutRoutine {
    id: string,
    name: string,
    description: string
}

export interface IFullWorkoutRoutine {
    id: string,
    name: string,
    description: string
    trainingCycles: ITrainingCycle[]
}