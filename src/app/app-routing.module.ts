import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

/**
 * Routing configuration of the application.
 * @type {Routes}
 */
const routes: Routes = [];

/**
 * @module AppRoutingModule
 * Module to handle routing within the application.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
