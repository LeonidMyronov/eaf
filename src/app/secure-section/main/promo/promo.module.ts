import { NgModule } from '@angular/core';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { PromoRoutingModule } from './promo-routing.module';

import { PromoStorageService } from './services/promo-storage.service';

import { PromoComponent } from './promo.component';
import { HeaderComponent } from './header/header.component';
import { StaticComponent } from './static/static.component';
import { GifComponent } from './gif/gif.component';
import { WpThemesComponent } from './wp-themes/wp-themes.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    PromoRoutingModule
  ],
  declarations: [
    PromoComponent,
    HeaderComponent,
    StaticComponent,
    GifComponent,
    WpThemesComponent,
    CalculatorComponent,
    LandingComponent,
  ],
  providers: [PromoStorageService]
})
export class PromoModule { }
