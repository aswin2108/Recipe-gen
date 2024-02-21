import { Injectable } from '@angular/core';
import { RawMealData } from './model/Meal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http:HttpClient) { }

  url='https://www.themealdb.com/api/json/v1/1/random.php';

  getRecipe(){
    return this.http.get<RawMealData>(this.url);
  }
}
