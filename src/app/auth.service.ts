import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface AuthenticationResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = 'http://localhost:8080/festimania/api/v1/auth'; // Cambia esto si es necesario

  constructor(private http: HttpClient) {}

  // Método de inicio de sesión
  login(username: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiServerUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('authToken', response.token); // Guarda el token en localStorage
        })
      );
  }
}
