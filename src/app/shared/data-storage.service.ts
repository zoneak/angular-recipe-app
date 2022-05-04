import { map, take, tap, exhaustMap } from 'rxjs/operators';
import { Recipe } from './../recipes/recipes.model';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    // Overwrites existing recipes
    this.http.put('https://ak-ng-recipe-book-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    // get information on demand, not an ongoing subscription
    return this.http.get<Recipe[]>('https://ak-ng-recipe-book-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        });
      }),
      tap(recipes => { // tap = permite executar código sem alterar os dados afunilados pelo Observer
        console.log(recipes);
        this.recipeService.setRecipes(recipes); // overwrites current recipes
      })
    );
  }
}
