import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../types/Login';
import { USER_ACCESS_TOKEN } from '../shared/constants';





@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private readonly userIdKey = 'user_id';
  public user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    const token = localStorage.getItem(USER_ACCESS_TOKEN) 
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  
  
  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }
  ngOnDestroy(): void {
    throw new Error();
  }
  


  login(email: string, password: string) {
   
    
    return this.http
      .post<LoginRequest>('/server/users/login', { email, password })
      .pipe(tap((loginRequest) => {
        localStorage.setItem(USER_ACCESS_TOKEN, loginRequest.accessToken);
        
        this.user$$.next(loginRequest.user);
      }));
  }

  

  logout(): void {
    this.user = undefined;
    localStorage.clear()
  }

  register(
    email: string,
    password: string,
    rePassword: string,
  ) {
    const { appUrl } = environment
    return this.http
      .post<User>(`${appUrl}/users/register`, {
        email,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  getInfo() {
    const { appUrl } = environment
    return this.http.get<User>(`${appUrl}/users/profile`)
  }

  setUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }
  
}
