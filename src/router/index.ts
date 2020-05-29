import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

import AccountLogin from '../views/Account/Login.vue'
import AccountRegister from '../views/Account/Register.vue'

import BodyMeasurementsIndex from '../views/BodyMeasurements/Index.vue'
import BodyMeasurementsCreate from '../views/BodyMeasurements/Create.vue'
import BodyMeasurementsEdit from '../views/BodyMeasurements/Edit.vue'
import BodyMeasurementsDelete from '../views/BodyMeasurements/Delete.vue'
import BodyMeasurementsDetails from '../views/BodyMeasurements/Details.vue'

import RoutinesActive from '../views/Routines/Active.vue'
import RoutinesIndex from '../views/Routines/Index.vue'
import RoutineGenerate from '../views/Routines/Generate.vue'

import NutritionIndex from '../views/Nutrition/Index.vue'
import NutritionCreate from '../views/Nutrition/Create.vue'
import NutritionEdit from '../views/Nutrition/Edit.vue'
import NutritionDelete from '../views/Nutrition/Delete.vue'
import NutritionDetails from '../views/Nutrition/Details.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [

    { path: '/', name: 'Home', component: Home },

    // ========================== ACCOUNT ==============================================

    { path: '/Account/Register', name: 'AccountRegister', component: AccountRegister },
    { path: '/Account/Login', name: 'AccountLogin', component: AccountLogin },

    // ========================== BODY MEASUREMENTS ====================================

    { path: '/bodymeasurements', name: 'BodyMeasurementsIndex', component: BodyMeasurementsIndex },
    { path: '/bodymeasurements/create', name: 'BodyMeasurementsCreate', component: BodyMeasurementsCreate },
    { path: '/bodymeasurements/edit/:id', name: 'BodyMeasurementsEdit', component: BodyMeasurementsEdit, props: true },
    { path: '/bodymeasurements/delete/:id', name: 'BodyMeasurementsDelete', component: BodyMeasurementsDelete, props: true },

    // ========================== NUTRITION ============================================

    { path: '/nutrition', name: 'NutritionIndex', component: NutritionIndex },
    { path: '/nutrition/create', name: 'NutritionCreate', component: NutritionCreate },
    { path: '/nutrition/edit/:id', name: 'NutritionEdit', component: NutritionEdit, props: true },
    { path: '/nutrition/delete/:id', name: 'NutritionDelete', component: NutritionDelete, props: true },

    // ========================== ROUTINES =============================================

    { path: '/routines', name: 'RoutinesIndex', component: RoutinesIndex },
    { path: '/routines/activecycle', name: 'RoutinesActive', component: RoutinesActive },
    { path: '/routines/generate', name: 'RoutineGenerate', component: RoutineGenerate }
]

const router = new VueRouter({
    routes
})

export default router
