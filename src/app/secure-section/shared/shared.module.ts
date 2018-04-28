import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';

import { GraphComponent } from './graph/graph.component';

@NgModule({
  declarations: [
    GraphComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    GraphComponent
  ]
})

export class SharedModule {}
