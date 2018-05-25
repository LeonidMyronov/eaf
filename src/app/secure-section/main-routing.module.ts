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

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'today', component: TodayComponent },
      { path: 'statistic', component: StatisticComponent },
      { path: 'statistic/:date', component: StatisticDateComponent },
      { path: 'balance', component: BalanceComponent },
      { path: 'guide', component: GuideComponent },
      { path: 'news', component: NewsComponent },
      { path: 'support', component: ContactsComponent },
      { path: 'discount', component: DiscountComponent },
      { path: 'discount/details', component: DiscountDetailsComponent },
      { path: '**', redirectTo: 'statistic' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {

}
