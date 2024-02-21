import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'meal',
    pathMatch: 'full',
  },
  { path: 'meal', loadChildren: () => import('./../meal/meal.module').then(m => m.MealModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
