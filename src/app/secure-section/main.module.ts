import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { StoreModule } from '@ngrx/store';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from './shared/shared.module';

import { MainService } from './services/main.service';

import { MainComponent } from './main/main.component';
import { TodayComponent } from './main/today/today.component';
import { StatisticComponent } from './main/statistic/statistic.component';

import { mainReducer } from './store/main.reducer';

@NgModule({
  declarations: [
    MainComponent,
    TodayComponent,
    StatisticComponent,
  ],
  imports: [
    CoreModule,
    MainRoutingModule,
    SharedModule,
    StoreModule.forFeature('main', mainReducer)
  ],
  exports: [],
  providers: [MainService]
})

export class MainModule {

}
