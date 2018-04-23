import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';

import { AppStorageService } from './app-storage.service';
import { HelperService } from './helper.service';

import { DropdownDirective } from './directives/dropdown.directive';
import { HomeTimeFormatPipe } from './pipes/home-time.pipe';
import { ServerTimeFormatPipe } from './pipes/server-time.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    HomeTimeFormatPipe,
    ServerTimeFormatPipe
  ],
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
    MatSelectModule, MatFormFieldModule,
    DropdownDirective,
    HomeTimeFormatPipe,
    ServerTimeFormatPipe
  ],
  providers: [AppStorageService, HelperService]
})

export class CoreModule {}
