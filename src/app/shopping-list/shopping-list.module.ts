import { SharedModule } from './../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent }
    ])
  ]
})
export class ShoppingListModule {

}
