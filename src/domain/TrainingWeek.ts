import { ITrainingDay } from "./TrainingDay";

export interface ITrainingWeek {
    id: string,
    weekNumber: number,
    isDelaod: boolean,
    startingDate: Date,
    endingDate: Date,
    trainingDays: ITrainingDay[]
}