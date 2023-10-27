import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router,) { }

  goToPrivate (path:string): Observable<number>  {
    this.http
      .get('http://localhost:8081/api/v1' + path, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          return response.body as number;
          if (response.status === 200) {
            // this.router.navigate(['/user/func']);
          } else {
            console.error('Received a non-200 status code:', response.status);
          }
        },
        (error) => {
          // Handle error if needed
          console.error('An error occurred:', error);
        }
        return 0;
      );
  }
}


