import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get(`/users/loggedIn/`, { observe: 'response' });
  }

  get(route: string): Observable<EntityResponseType> {
    return this.http.get(`${route}`, { observe: 'response' });
  }

  find(route: string, id: string): Observable<EntityResponseType> {
    return this.http.get(`${route}/${id}`, { observe: 'response' });
  }

  list(route: string): Observable<EntityArrayResponseType> {
    return this.http.get<any[]>(route, { observe: 'response' });
  }

  listFilter(route: string, filter?: any): Observable<EntityArrayResponseType> {
    const query = filter || {};
    return this.http.get<any[]>(`${route}`, { observe: 'response', params: query });
  }

  create(route: string, entity: any): Observable<EntityResponseType> {
    return this.http.post(`${route}`, entity, { observe: 'response' });
  }

  update(route: string, entity: any): Observable<EntityResponseType> {
    return this.http.patch(`${route}`, entity, { observe: 'response' });
  }

  remove(route: string, entity?: any): Observable<EntityResponseType> {
    return this.http.delete(`${route}`, { observe: 'response' });
  }

  count(route: string, id?: any, filter?: any): Observable<EntityResponseType> {
    if (id) {
      return this.http.get(`${route}/count/${id}`, { observe: 'response' });
    } else {
      const query = filter || {};
      return this.http.get(`${route}/count`, { observe: 'response', params: query });
    }
  }

  verifyUser(route: string, email: any): Observable<EntityResponseType> {
    return this.http.post(`/users/${route}`, email, { observe: 'response' });
  }
}
