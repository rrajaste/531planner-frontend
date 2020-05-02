import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

import BodyMeasurementsIndex from '../views/BodyMeasurements/Index.vue'
import BodyMeasurementsCreate from '../views/BodyMeasurements/Create.vue'
import BodyMeasurementsEdit from '../views/BodyMeasurements/Edit.vue'
import BodyMeasurementsDelete from '../views/BodyMeasurements/Delete.vue'
import BodyMeasurementsDetails from '../views/BodyMeasurements/Details.vue'

import RoutinesIndex from '../views/Routines/Index.vue'
import RoutinesCreate from '../views/Routines/Create.vue'
import RoutinesEdit from '../views/Routines/Edit.vue'
import RoutinesDelete from '../views/Routines/Delete.vue'
import RoutinesDetails from '../views/Routines/Details.vue'

import NutritionIndex from '../views/Nutrition/Index.vue'
import NutritionCreate from '../views/Nutrition/Create.vue'
import NutritionEdit from '../views/Nutrition/Edit.vue'
import NutritionDelete from '../views/Nutrition/Delete.vue'
import NutritionDetails from '../views/Nutrition/Details.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [

  { path: '/', name: 'Home', component: Home },

  // ========================== BODY MEASUREMENTS ====================================

  { path: '/bodymeasurements', name: 'BodyMeasurementsIndex', component: BodyMeasurementsIndex },
  { path: '/bodymeasurements/create', name: 'BodyMeasurementsCreate', component: BodyMeasurementsCreate },
  { path: '/bodymeasurements/edit/:id', name: 'BodyMeasurementsEdit', component: BodyMeasurementsEdit, props: true },
  { path: '/bodymeasurements/delete/:id', name: 'BodyMeasurementsDelete', component: BodyMeasurementsDelete, props: true },
  { path: '/bodymeasurements/details/:id', name: 'BodyMeasurementsDetails', component: BodyMeasurementsDetails, props: true },

  // ========================== NUTRITION ============================================

  { path: '/nutrition', name: 'NutritionIndex', component: NutritionIndex },
  { path: '/nutrition/create', name: 'NutritionCreate', component: NutritionCreate },
  { path: '/nutrition/edit/:id', name: 'NutritionEdit', component: NutritionEdit, props: true },
  { path: '/nutrition/delete/:id', name: 'NutritionDelete', component: NutritionDelete, props: true },
  { path: '/nutrition/details/:id', name: 'NutritionDetails', component: NutritionDetails, props: true },

  // ========================== ROUTINES =============================================

  { path: '/routines', name: 'RoutinesIndex', component: RoutinesIndex },
  { path: '/routines/create', name: 'RoutinesCreate', component: RoutinesCreate, props: true },
  { path: '/routines/edit/:id', name: 'RoutinesEdit', component: RoutinesEdit, props: true },
  { path: '/routines/delete/:id', name: 'RoutinesDelete', component: RoutinesDelete, props: true },
  { path: '/routines/Details/:id', name: 'RoutinesDetails', component: RoutinesDetails, props: true }
]

const router = new VueRouter({
  routes
})

export default router
