export interface INutritionIntakeCreate {
    calories: number,
    protein: number,
    fats: number,
    carbohydrates: number
}

export interface INutritionIntakeEdit extends INutritionIntakeCreate {
    id: string
}

export interface INutritionIntake extends INutritionIntakeCreate {
    loggedAt: Date
}
