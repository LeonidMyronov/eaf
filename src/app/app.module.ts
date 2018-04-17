import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { CustomFlexLayoutBreakPointsModule } from './custom-flexlayout-breakpoints.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './start-section/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TariffsComponent } from './start-section/tariffs/tariffs.component';
import { ContactsComponent } from './start-section/contacts/contacts.component';

import { reducers } from './app.reducers';

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
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CustomFlexLayoutBreakPointsModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    // StoreRouterConnectingModule,
    // !environment.production ? StoreDevtoolsModule.instrument() : [], // this will launch store-devtools only for dev mode
    // StoreDevtoolsModule.instrument()
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
