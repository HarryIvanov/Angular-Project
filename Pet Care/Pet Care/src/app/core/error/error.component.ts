import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  apiError$: Observable<any>;

  constructor(private errorService: ErrorService) {
    this.apiError$ = this.errorService.apiError$;
  }

  ngOnInit(): void {}
}
