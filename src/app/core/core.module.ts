import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

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
    MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule,
    DropdownDirective,
    HomeTimeFormatPipe,
    ServerTimeFormatPipe,
    TranslateModule
  ],
  providers: [AppStorageService, HelperService]
})

export class CoreModule {}
