import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { TodayComponent } from './main/today/today.component';
import { StatisticComponent } from './main/statistic/statistic.component';
import { BalanceComponent } from './main/balance/balance.component';
import { GuideComponent } from './main/guide/guide.component';
import { NewsComponent } from './main/news/news.component';
import { ContactsComponent } from '../start-section/contacts/contacts.component';
import { DiscountComponent } from './main/discount/discount.component';
import { DiscountDetailsComponent } from './main/discount-details/discount-details.component';
import { StatisticDateComponent } from './main/statistic/statistic-date/statistic-date.component';
import { PtDateComponent } from './main/pixel-tracking/pt-date/pt-date.component';
import { ProfileComponent } from './main/profile/profile.component';
import { PostbackComponent } from './main/postback/postback.component';
import { WhitelabelComponent } from './main/whitelabel/whitelabel.component';
import { OfferComponent } from './main/offer/offer.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'today', component: TodayComponent },
      { path: 'statistic', component: StatisticComponent },
      { path: 'statistic/:date', component: StatisticDateComponent },
      { path: 'pt-statistic/:date', component: PtDateComponent },
      { path: 'balance', component: BalanceComponent },
      { path: 'guide', component: GuideComponent },
      { path: 'news', component: NewsComponent },
      { path: 'support', component: ContactsComponent },
      { path: 'discount', component: DiscountComponent },
      { path: 'discount/details', component: DiscountDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'postback', component: PostbackComponent },
      { path: 'whitelabel', component: WhitelabelComponent },
      { path: 'offer', component: OfferComponent },
      { path: 'promo', loadChildren: './main/promo/promo.module#PromoModule'},
      { path: '**', redirectTo: 'offer' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {

}
