export interface IBodyMeasurementCreate {
    weight: number,
    height: number,
    chest?: number,
    waist?: number,
    hip?: number,
    arm?: number,
    bodyFatPercentage?: number,
    unitTypeId: string,
} 

export interface IBodyMeasurementEdit extends IBodyMeasurementCreate {
    id: string
}


export interface IBodyMeasurement extends IBodyMeasurementCreate {
    unitType: string,
    loggedAt: string
}
