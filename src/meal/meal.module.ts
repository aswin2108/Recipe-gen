import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealRoutingModule } from './meal-routing.module';
import { MealComponent } from './meal.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [MealComponent, RecipeComponent],
  imports: [
    CommonModule,
    MealRoutingModule,
    NgxSpinnerModule,
  ],
})
export class MealModule {}
