import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyDW_QsXqoro_7baJUhX1ZxCI8ldN8eCBXY",
  authDomain: "quicklink-9aee8.firebaseapp.com",
  projectId: "quicklink-9aee8",
  storageBucket: "quicklink-9aee8.firebasestorage.app",
  messagingSenderId: "480399051833",
  appId: "1:480399051833:web:4c9ffb1b9c187d92bf11e8",
  measurementId: "G-CMDJK5NLC6"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};
