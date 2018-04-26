import { NgModule } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { AuthService } from './auth.service';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CoreModule,
    // https://github.com/DethAriel/ng-recaptcha
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
