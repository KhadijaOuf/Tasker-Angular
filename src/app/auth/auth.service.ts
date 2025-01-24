import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string): void {
    console.log('Logging in with:', email, password);
    // Ajoutez ici la logique pour appeler une API ou gérer l'authentification
  }

}
