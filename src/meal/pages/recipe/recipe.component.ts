import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MealService } from 'src/app/shared/meal.service';
import { Meal, RawMealData } from 'src/app/shared/model/Meal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  constructor(
    private mealsService: MealService,
    private sanitize: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {}

  newMeal: Meal = new Meal();
  ytLink: string = '';

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.spinner.show();
    const self = this;
    this.mealsService.getRecipe().subscribe({
      next(data: { [key: string]: any }) {
        self.ytLink = data['meals'][0].strYoutube;

        const cleanUpData = () => {
          let incredients = [];
          let measurements = [];
          let insrtuctions = [];
          let tags = [];

          for (const key in data['meals'][0]) {
            if (key.includes('strIngredient')) {
              if (
                data['meals'][0][key as keyof RawMealData] !== '' &&
                data['meals'][0][key as keyof RawMealData] !== null
              )
                incredients.push(data['meals'][0][key as keyof RawMealData]);
            } else if (key.includes('strMeasure')) {
              if (data['meals'][0][key as keyof RawMealData] !== '')
                measurements.push(data['meals'][0][key as keyof RawMealData]);
            } else if (key.includes('strInstructions')) {
              insrtuctions =
                data['meals'][0][key as keyof RawMealData].split('\r\n');
              if (insrtuctions.length === 1)
                insrtuctions = data['meals'][0][key as keyof RawMealData].split(
                  '\r\n' || '.'
                );
            } else if (key.includes('strTags')) {
              if (data['meals'][0].strTags !== null)
                tags = data['meals'][0][key as keyof RawMealData].split(',');
            }
          }

          self.convertUrl(data['meals'][0].strYoutube);

          self.newMeal.incredients = incredients;
          self.newMeal.measurements = measurements;
          self.newMeal.instructions = insrtuctions;
          self.newMeal.tags = tags;
          self.newMeal.idMeal = data['meals'][0].idMeal;
          self.newMeal.strArea = data['meals'][0].strArea;
          self.newMeal.strCategory = data['meals'][0].strCategory;
          self.newMeal.strMeal = data['meals'][0].strMeal;
          self.newMeal.mealThumb = data['meals'][0].strMealThumb;
          self.newMeal.strSource = data['meals'][0].strSource;
        };
        cleanUpData();
      },
      error(msg) {
        console.log(msg);
      },
      complete() {
        self.spinner.hide();
      },
    });
  }
  convertUrl(url: string): void {
    const sanitizedUrl = url.replace('watch?v=', 'embed/');
    this.newMeal.strYoutube =
      this.sanitize.bypassSecurityTrustResourceUrl(sanitizedUrl);
  }
}
