import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { TodayComponent } from './main/today/today.component';
import { StatisticComponent } from './main/statistic/statistic.component';
import { BalanceComponent } from './main/balance/balance.component';
import { GuideComponent } from './main/guide/guide.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'today', component: TodayComponent },
      { path: 'statistic', component: StatisticComponent },
      { path: 'balance', component: BalanceComponent },
      { path: 'guide', component: GuideComponent },
      { path: '**', redirectTo: 'guide' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {

}
