import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpringService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'text/plain; charset=utf-8' })
  };

  constructor( private http: HttpClient) { }

  getPublicPortal() {
    return this.http.get('http://localhost:8081/', {observe: 'response'});
  }

  getPublicFunction1() {
    return this.http.get('http://localhost:8081/func', {observe: 'response'});
  }

  getAdminPortal() {
    return this.http.get('http://localhost:8081/api/v1/admin', {observe: 'response'});
  }

  getAdminFunction1() {
    return this.http.get('http://localhost:8081/api/v1/admin/func', {observe: 'response'});
  }

  getUserPortal() {
    return this.http.get('http://localhost:8081/api/v1/user', {observe: 'response'});
  }

  getUserFunction1() {
    return this.http.get('http://localhost:8081/api/v1/user/func', {observe: 'response'});
  }
}
