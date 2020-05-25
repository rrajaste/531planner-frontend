import { ITrainingWeek } from "./TrainingWeek";

export interface ITrainingCycle {
    id: string,
    startingDate: Date,
    endingDate: Date,
    trainingWeeks: ITrainingWeek[]
} 