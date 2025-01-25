import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User | null>;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.afAuth.authState; // observable (the logged-in user)
  }

  // SignIn services :
  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      alert("Error in Sign in");
      throw error;
    }
  }

  /*async googleSignIn(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.afAuth.signInWithPopup(provider);
    } catch (error) {
      console.log("Error in Google Sign In");
      throw error;
    }
  }

  async facebookSignIn(): Promise<void> {
  }

  async githubSignIn(): Promise<void> {

  }
*/

  // signUp services :
  async signUp(): Promise<void> {
  }

  /* googleSignUp() {
   }
 
   facebookSignUp() {
   }
 
   githubSignUp() {
   } */

  // Sign out
  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error: any) {
      alert("Sign-out error:");
      throw error;
    }
  }
}
