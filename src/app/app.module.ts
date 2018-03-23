import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { CustomFlexLayoutBreakPointsModule } from './custom-flexlayout-breakpoints.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './start-section/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TariffsComponent } from './start-section/tariffs/tariffs.component';
import { ContactsComponent } from './start-section/contacts/contacts.component';

// import { StoreRouterConnectingModule } from '@ngrx/router-store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TariffsComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    CustomFlexLayoutBreakPointsModule,
    CoreModule,
    // StoreModule.forRoot(reducers),
    // StoreRouterConnectingModule,
    // !environment.production ? StoreDevtoolsModule.instrument() : [], // this will launch store-devtools only for dev mode
    // StoreDevtoolsModule.instrument()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
