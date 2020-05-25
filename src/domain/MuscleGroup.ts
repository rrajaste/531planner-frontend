import { IMuscle } from "./Muscle"

export interface IMuscleGroup {
    id: string,
    name: string,
    description: string,
    muscles: IMuscle[]
}
