import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { HomeComponent } from './start-section/home/home.component';
import { TariffsComponent } from './start-section/tariffs/tariffs.component';
import { ContactsComponent } from './start-section/contacts/contacts.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'tariffs', component: TariffsComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'main',  loadChildren: './secure-section/main.module#MainModule', canLoad: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // <-- debugging purposes only],
    // preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
