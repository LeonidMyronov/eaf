import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
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
import { ContactsComponent } from './start-section/contacts/contacts.component';

import { reducers } from './app.reducers';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

// import { StoreRouterConnectingModule } from '@ngrx/router-store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TariffsComponent,
    ContactsComponent,
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
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
    // StoreRouterConnectingModule,
    // !environment.production ? StoreDevtoolsModule.instrument() : [], // this will launch store-devtools only for dev mode
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
