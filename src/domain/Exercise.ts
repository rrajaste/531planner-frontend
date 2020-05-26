import { IExerciseSet } from "./ExerciseSet";

export interface IExercise {
    id: string,
    name: string,
    description: string,
    typeName: string,
    typeDescription: string,
    warmUpSets: IExerciseSet[],
    workSets: IExerciseSet[]
}