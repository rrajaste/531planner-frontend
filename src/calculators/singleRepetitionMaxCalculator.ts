export default class {
    static GetSingleRepMax(weight: number, reps: number) {
        return Math.round(weight / (1.0278 - (0.0278 * reps)))
    }
}
