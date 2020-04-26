// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  RecaptchaModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaFormsModule,
  RECAPTCHA_LANGUAGE
} from 'ng-recaptcha';

// Components
import { LoginComponent } from './login/login.component';
import { ResetLinkComponent } from './reset/reset-link.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password/forgot-password.component';

// Modules
import { PublicRoutingModule } from './public.routing';

// Environments
import { environment } from '@env/environment';

@NgModule({
  declarations: [
    LoginComponent,
    ResetLinkComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.siteRecaptchaKey,
    } as RecaptchaSettings,
  },
  {
    provide: RECAPTCHA_LANGUAGE,
    useValue: 'es',
  },
]
})
export class PublicModule { }
