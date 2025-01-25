import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // for firebase
    AngularFireAuthModule, AngularFirestoreModule,
    AuthModule, SharedModule, BrowserAnimationsModule
  ],
  providers: [ // Services and other providers
    provideClientHydration(withEventReplay()), provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
