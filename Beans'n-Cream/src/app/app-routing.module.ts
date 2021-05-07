import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoffeeOrderComponent } from './coffee-order/coffee-order.component';

const routes: Routes = [
  {
    path: '',
    component: CoffeeOrderComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
