import { NgModule } from '@angular/core';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { PromoRoutingModule } from './promo-routing.module';

import { PromoComponent } from './promo.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    PromoRoutingModule
  ],
  declarations: [
    PromoComponent,
    HeaderComponent,
  ]
})
export class PromoModule { }
