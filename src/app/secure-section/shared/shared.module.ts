import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';

import { GraphComponent } from './graph/graph.component';
import { ShortTimePipe } from './pipes/short-time.pipe';
import { ConversionComponent } from './conversion/conversion.component';
import { TermPickerPanelComponent } from './term-picker-panel/term-picker-panel.component';

@NgModule({
  declarations: [
    GraphComponent,
    ShortTimePipe,
    ConversionComponent,
    TermPickerPanelComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    GraphComponent,
    ShortTimePipe,
    ConversionComponent,
    TermPickerPanelComponent
  ]
})

export class SharedModule {}
