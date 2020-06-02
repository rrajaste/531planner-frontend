import { IBodyMeasurement } from '@/domain/BodyMeasurement'
import store from '@/store'

export class UnitTypeConverter {
    static kilogramsToPounds(kilograms: number) {
        return kilograms * 2.2046226218488
    }

    static poundsToKilograms(pounds: number) {
        return pounds / 2.2046226218488
    }

    static inchesToCentimeters(inches: number) {
        return inches * 2.54
    }

    static centimetersToInches(centimeters: number) {
        return centimeters / 2.54
    }

    static feetToInches(feet: number) {
        return feet * 12
    }

    static bodyMeasurementToImperial(bodyMeasurement: IBodyMeasurement) {
        const convertedMeasurement: IBodyMeasurement = {
            weight: Math.round(UnitTypeConverter.kilogramsToPounds(bodyMeasurement.weight) * 100) / 100,
            height: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.height) * 100) / 100,
            arm: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.arm) * 100) / 100,
            hip: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.hip) * 100) / 100,
            chest: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.chest) * 100) / 100,
            waist: Math.round(UnitTypeConverter.centimetersToInches(bodyMeasurement.waist) * 100) / 100,
            bodyFatPercentage: bodyMeasurement.bodyFatPercentage,
            id: bodyMeasurement.id,
            loggedAt: bodyMeasurement.loggedAt
        }
        return convertedMeasurement
    }

    static bodyMeasurementToMetric(bodyMeasurement: IBodyMeasurement) {
        const convertedMeasurement: IBodyMeasurement = {
            weight: Math.round(bodyMeasurement.weight * 100) / 100,
            height: Math.round(bodyMeasurement.height * 100) / 100,
            arm: Math.round(bodyMeasurement.arm * 100) / 100,
            hip: Math.round(bodyMeasurement.hip * 100) / 100,
            chest: Math.round(bodyMeasurement.chest * 100) / 100,
            waist: Math.round(bodyMeasurement.waist * 100) / 100,
            bodyFatPercentage: bodyMeasurement.bodyFatPercentage,
            id: bodyMeasurement.id,
            loggedAt: bodyMeasurement.loggedAt
        }
        return convertedMeasurement
    }

    static toLocalString(date: Date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(store.state.currentCulture.code, options)
    }
}
