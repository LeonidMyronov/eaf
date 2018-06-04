import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';

import { GraphComponent } from './graph/graph.component';
import { ShortTimePipe } from './pipes/short-time.pipe';
import { ConversionComponent } from './conversion/conversion.component';
import { TermPickerPanelComponent } from './term-picker-panel/term-picker-panel.component';
import { PixelTrackingListComponent } from './pixel-tracking-list/pixel-tracking-list.component';
import { DatePickerPanelComponent } from './date-picker-panel/date-picker-panel.component';
import { AlignRowHeightDirective } from './directives/align-row-height.directive';
import { DiscountComponent } from '../main/discount/discount.component';

@NgModule({
  declarations: [
    GraphComponent,
    ShortTimePipe,
    ConversionComponent,
    TermPickerPanelComponent,
    PixelTrackingListComponent,
    DatePickerPanelComponent,
    AlignRowHeightDirective,
    DiscountComponent
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
    DatePickerPanelComponent,
    AlignRowHeightDirective,
    DiscountComponent
  ]
})

export class SharedModule {}
