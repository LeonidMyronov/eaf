import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { TodayComponent } from './main/today/today.component';
import { StatisticComponent } from './main/statistic/statistic.component';
import { BalanceComponent } from './main/balance/balance.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'today', component: TodayComponent },
      { path: 'statistic', component: StatisticComponent },
      { path: 'balance', component: BalanceComponent },
      { path: '**', redirectTo: 'balance' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {

}
