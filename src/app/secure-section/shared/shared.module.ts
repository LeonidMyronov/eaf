import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';

import { GraphComponent } from './graph/graph.component';
import { ShortTimePipe } from './pipes/short-time.pipe';
import { ConversionComponent } from './conversion/conversion.component';
import { TermPickerPanelComponent } from './term-picker-panel/term-picker-panel.component';
import { PixelTrackingListComponent } from './pixel-tracking-list/pixel-tracking-list.component';

@NgModule({
  declarations: [
    GraphComponent,
    ShortTimePipe,
    ConversionComponent,
    TermPickerPanelComponent,
    PixelTrackingListComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    GraphComponent,
    ShortTimePipe,
    ConversionComponent,
    TermPickerPanelComponent,
    PixelTrackingListComponent,
  ]
})

export class SharedModule {}
