import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';

import { AppStorageService } from './app-storage.service';
import { HelperService } from './helper.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    MatSelectModule, MatFormFieldModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    MatSelectModule, MatFormFieldModule
  ],
  providers: [AppStorageService, HelperService]
})

export class CoreModule {}
