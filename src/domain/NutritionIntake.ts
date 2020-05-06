export interface INutritionIntakeCreate {
    calories: number,
    protein?: number,
    fats?: number,
    carbohydrates?: number,
    unitTypeId: string
}

export interface INutritionIntakeEdit extends INutritionIntakeCreate {
    id: string
}

export interface INutritionIntake extends INutritionIntakeCreate{
    UnitType: string,
    LoggedAt: string
}
