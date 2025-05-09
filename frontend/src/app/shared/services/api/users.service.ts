import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private apiServer = 'http://localhost:3000';
    private api = '/app/auth/signup';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {

    }

    register(user: User): Observable<User> {
        return this.httpClient.post<User>(this.api, user);
    }

    // create(user): Observable<User> {
    //     return this.httpClient.post<User>(this.apiServer + '/users/', JSON.stringify(user), this.httpOptions);
    // }

    // getById(id): Observable<User> {
    //     return this.httpClient.get<User>(this.apiServer + '/users/' + id);
    // }

    // getAll(): Observable<User[]> {
    //     return this.httpClient.get<User[]>(this.apiServer + '/users');
    // }

    // update(id, user): Observable<User> {
    //     return this.httpClient.put<User>(this.apiServer + '/users/' + id, JSON.stringify(user), this.httpOptions);
    // }

    // delete(id): Observable<any> {
    //     return this.httpClient.delete<User>(this.apiServer + '/users/' + id, this.httpOptions);
    // }
}
