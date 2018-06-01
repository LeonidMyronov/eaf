import { NgModule } from '@angular/core';
import { CoreModule } from '../../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { PromoRoutingModule } from './promo-routing.module';

import { PromoComponent } from './promo.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    // CoreModule,
    // SharedModule,
    CommonModule,
    PromoRoutingModule
  ],
  declarations: [
    PromoComponent,
  ]
})
export class PromoModule { }
