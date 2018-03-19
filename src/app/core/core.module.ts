import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppStorageService } from './app-storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [AppStorageService]
})

export class CoreModule {}
