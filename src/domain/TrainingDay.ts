import { IExercise } from "./Exercise";

export interface ITrainingDay {
    id: string,
    name: string,
    description: string,
    typeName: string,
    mainLifts: IExercise[], 
    accessoryLifts: IExercise[] 
}
