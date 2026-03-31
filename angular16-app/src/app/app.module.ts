import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

/**
 * Routes for this microfrontend
 * Note: These are internal routes within the Angular 16 app
 * The parent route (/angular16) is handled by single-spa
 */
const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      // Use hash routing to avoid conflicts with single-spa routing
      useHash: true,
    }),
  ],
  providers: [
    // Set base href for this microfrontend
    { provide: APP_BASE_HREF, useValue: '/angular16/' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
