import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from "./recipes.model";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

 /*  private recipes: Recipe[] = [
    new Recipe('Burger', 'This is a test', 'https://s2.glbimg.com/9zc9T-9LwXwKG_8XOq_9EF67bSQ=/620x455/e.glbimg.com/og/ed/f/original/2021/04/30/receita-hamburguer-smash-burguer-bacon-cheddaar.jpg',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]),
    new Recipe('A Test Recipe 2', 'This is a test', 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/upwk62046885-wikimedia-image.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b48af5b2f7fec0e642b3e1da6cf5a9a9',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 1)
    ])
  ]; */
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice()); // precisa adicionar pois no getRecipes() retorna um slice diferente do qual estamos alterando
  }

  getRecipes() {
    return this.recipes.slice(); // returns a copy of the array so it doesn't mess up the original
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice()); // precisa adicionar pois no getRecipes() retorna um slice diferente do qual estamos alterando
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice()); // precisa adicionar pois no getRecipes() retorna um slice diferente do qual estamos alterando
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice()); // precisa adicionar pois no getRecipes() retorna um slice diferente do qual estamos alterando
  }
}
