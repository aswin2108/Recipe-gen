import { Injectable } from '@angular/core';
import { RawMealData } from './model/Meal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  constructor(private http: HttpClient) {}

  url = 'https://www.themealdb.com/api/json/v1/1/random.php';

  /**
   * getRecipe asyncronously fetches data by sending an HTTP request 
   * to the url and returns a unicast observable of type RawMealData
   * @returns A unicast observable which is of the form RawMealData
   */
  getRecipe(): Observable<RawMealData> {
    return this.http.get<RawMealData>(this.url);
  }
}
