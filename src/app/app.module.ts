import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFlexLayoutBreakPointsModule } from './custom-flexlayout-breakpoints.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { RunService } from './core/run.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './start-section/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TariffsComponent } from './start-section/tariffs/tariffs.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

import { reducers } from './app.reducers';
import { AuthEffects } from './auth/store/auth.effects';
import { UserEffects } from './secure-section/user/store/user.effects';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TariffsComponent,
    MobileMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    CustomFlexLayoutBreakPointsModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [], // this will launch store-devtools only for dev mode
    // StoreDevtoolsModule.instrument()
  ],
  providers: [
    AuthService, RunService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
