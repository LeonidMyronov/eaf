import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoComponent } from './promo.component';
import { DiscountComponent } from '../discount/discount.component';
import { WpThemesComponent } from './wp-themes/wp-themes.component';
import { LandingComponent } from './landing/landing.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { GifComponent } from './gif/gif.component';
import { StaticComponent } from './static/static.component';

const routes: Routes = [
  {
    path: '', component: PromoComponent, children: [
      { path: 'static', component: StaticComponent },
      { path: 'gif', component: GifComponent },
      { path: 'wp', component: WpThemesComponent },
      { path: 'landing', component: LandingComponent },
      { path: 'calculator', component: CalculatorComponent },
      { path: 'discounts', component: DiscountComponent },
      { path: '**', redirectTo: 'static' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PromoRoutingModule {}
