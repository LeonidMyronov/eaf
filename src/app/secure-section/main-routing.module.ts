import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayComponent } from './main/today/today.component';
import { StatisticComponent } from './main/statistic/statistic.component';

const routes: Routes = [
  {path: '', component: TodayComponent},
  {path: 'statistic', component: StatisticComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {

}
