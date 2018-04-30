import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';

import { GraphComponent } from './graph/graph.component';
import { ShortTimePipe } from './pipes/short-time.pipe';
import { ConversionComponent } from './conversion/conversion.component';

@NgModule({
  declarations: [
    GraphComponent,
    ShortTimePipe,
    ConversionComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    GraphComponent,
    ShortTimePipe,
    ConversionComponent
  ]
})

export class SharedModule {}
