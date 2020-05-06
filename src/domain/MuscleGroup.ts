import { Muscle } from "./Muscle"

export interface MuscleGroup {
    id: string,
    name: string,
    description: string,
    muscles: Muscle[]
}
