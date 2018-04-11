import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { AuthService } from './auth.service';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule,
    // https://github.com/DethAriel/ng-recaptcha
    // RecaptchaModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
  ],
  exports: [
    SignupComponent,
    LoginComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'en', // use EN language
    },
  ]
})

export class AuthModule {}
