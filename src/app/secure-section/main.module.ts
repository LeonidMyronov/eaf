import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main/main.component';
import { TodayComponent } from './main/today/today.component';
import { StatisticComponent } from './main/statistic/statistic.component';

@NgModule({
  declarations: [
    MainComponent,
    TodayComponent,
    StatisticComponent
  ],
  imports: [
    CoreModule,
    MainRoutingModule
  ],
  exports: []
})

export class MainModule {

}
