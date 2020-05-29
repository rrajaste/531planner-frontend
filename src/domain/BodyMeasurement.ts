export interface IBodyMeasurementCreate {
    weight: number,
    height: number,
    chest: number,
    waist: number,
    hip: number,
    arm: number,
    bodyFatPercentage: number,
} 

export interface IBodyMeasurementEdit extends IBodyMeasurementCreate {
    id: string
}


export interface IBodyMeasurement extends IBodyMeasurementEdit {
    loggedAt: Date
}
