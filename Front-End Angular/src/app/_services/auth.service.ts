
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = {
    isAdmin: true // Change this to simulate different user roles
  };

  isAdmin(): boolean {
    return this.currentUser.isAdmin;
  }
}