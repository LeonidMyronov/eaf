import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromoComponent } from './promo.component';

const routes: Routes = [
  {
    path: '', component: PromoComponent// , children: [
      // { path: 'today', component: TodayComponent },
      // { path: 'statistic', component: StatisticComponent },
      // { path: 'statistic/:date', component: StatisticDateComponent },
      // { path: 'pt-statistic/:date', component: PtDateComponent },
      // { path: 'balance', component: BalanceComponent },
      // { path: 'guide', component: GuideComponent },
      // { path: 'news', component: NewsComponent },
      // { path: 'support', component: ContactsComponent },
      // { path: 'discount', component: DiscountComponent },
      // { path: 'discount/details', component: DiscountDetailsComponent },
      // { path: 'profile', component: ProfileComponent },
      // { path: 'postback', component: PostbackComponent },
      // { path: 'whitelabel', component: WhitelabelComponent },
      // { path: 'offer', component: OfferComponent },
      // { path: 'promo', loadChildren: './promo/promo.module#PromoModule'},
      // { path: 'main',  loadChildren: './secure-section/main.module#MainModule'},

      // { path: '**', redirectTo: 'promo' },
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PromoRoutingModule {}
