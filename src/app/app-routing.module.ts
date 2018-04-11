import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './start-section/home/home.component';
import { TariffsComponent } from './start-section/tariffs/tariffs.component';
import { ContactsComponent } from './start-section/contacts/contacts.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tariffs', component: TariffsComponent},
  {path: 'contacts', component: ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
