import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MainRoutingModule } from './main-routing.module';

import { MainService } from './services/main.service';
import { MainStorageService } from './services/main-storage.service';

import { MainComponent } from './main/main.component';
import { TodayComponent } from './main/today/today.component';
import { StatisticComponent } from './main/statistic/statistic.component';

import { mainReducer } from './store/main.reducer';
import { MainEffects } from './store/main.effects';
import { BalanceComponent } from './main/balance/balance.component';
import { GuideComponent } from './main/guide/guide.component';
import { NewsComponent } from './main/news/news.component';
import { NewsItemComponent } from './main/news/news-item/news-item.component';
import { DiscountComponent } from './main/discount/discount.component';
import { DiscountDetailsComponent } from './main/discount-details/discount-details.component';
import { StatisticDateComponent } from './main/statistic/statistic-date/statistic-date.component';
import { PtDateComponent } from './main/pixel-tracking/pt-date/pt-date.component';
import { ProfileComponent } from './main/profile/profile.component';

@NgModule({
  declarations: [
    MainComponent,
    TodayComponent,
    StatisticComponent,
    BalanceComponent,
    GuideComponent,
    NewsComponent,
    NewsItemComponent,
    DiscountComponent,
    DiscountDetailsComponent,
    StatisticDateComponent,
    PtDateComponent,
    ProfileComponent,
  ],
  imports: [
    CoreModule,
    MainRoutingModule,
    SharedModule,
    StoreModule.forFeature('main', mainReducer),
    EffectsModule.forFeature([MainEffects])
  ],
  exports: [],
  providers: [MainService, MainStorageService]
})

export class MainModule {

}
