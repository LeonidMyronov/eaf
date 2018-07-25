import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatSelectModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatProgressSpinnerModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { AppStorageService } from './app-storage.service';
import { HelperService } from './helper.service';

import { DropdownDirective } from './directives/dropdown.directive';
import { HomeTimeFormatPipe } from './pipes/home-time.pipe';
import { ServerTimeFormatPipe } from './pipes/server-time.pipe';
import { ContactsComponent } from '../start-section/contacts/contacts.component';
import { ServerErrorsInterceptor } from './server-errors.interceptor';
import { AuthTokenInterceptor } from './auth-token.interceptor';

@NgModule({
  declarations: [
    DropdownDirective,
    HomeTimeFormatPipe,
    ServerTimeFormatPipe,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatProgressSpinnerModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatProgressSpinnerModule,
    DropdownDirective,
    HomeTimeFormatPipe,
    ServerTimeFormatPipe,
    TranslateModule,
    ContactsComponent
  ],
  providers: [AppStorageService, HelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    }
  ]
})

export class CoreModule {}
