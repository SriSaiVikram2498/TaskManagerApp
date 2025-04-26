import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user; // <-- Important for chaining in component
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(`${this.baseUrl}account/register`, model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          return user; // 👈 Return the user so the component can handle redirection
        }
        return null;
      })
    );
  }
  

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    this.currentUserSource.next(null);
    localStorage.removeItem('user');
  }
}
