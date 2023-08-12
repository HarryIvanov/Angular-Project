import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private apiError$$ = new BehaviorSubject<any>(null);

  get apiError$(): Observable<any> {
    return this.apiError$$.asObservable();
  }

  setError(error: any): void {
    this.apiError$$.next(error);
  }
}