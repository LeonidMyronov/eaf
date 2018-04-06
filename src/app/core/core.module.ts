import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppStorageService } from './app-storage.service';
import { HelperService } from './helper.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [AppStorageService, HelperService]
})

export class CoreModule {}
