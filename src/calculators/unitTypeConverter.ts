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
}
