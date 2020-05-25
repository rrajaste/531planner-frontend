import { IExerciseSet } from "./ExerciseSet";

export interface ITrainingDay {
    id: string,
    name: string,
    description: string,
    typeName: string,
    typeDescription: string,
    exerciseType: string,
    warmUpSets: IExerciseSet[]
    workSets: IExerciseSet[]
}
