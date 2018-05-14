import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { StoreModule } from '@ngrx/store';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from './shared/shared.module';

import { MainService } from './services/main.service';
import { MainStorageService } from './services/main-storage.service';

import { MainComponent } from './main/main.component';
import { TodayComponent } from './main/today/today.component';
import { StatisticComponent } from './main/statistic/statistic.component';

import { mainReducer } from './store/main.reducer';
import { BalanceComponent } from './main/balance/balance.component';

@NgModule({
  declarations: [
    MainComponent,
    TodayComponent,
    StatisticComponent,
    BalanceComponent,
  ],
  imports: [
    CoreModule,
    MainRoutingModule,
    SharedModule,
    StoreModule.forFeature('main', mainReducer)
  ],
  exports: [],
  providers: [MainService, MainStorageService]
})

export class MainModule {

}
