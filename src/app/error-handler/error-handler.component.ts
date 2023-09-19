import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent {
  constructor(private router: Router) {

  }
}
