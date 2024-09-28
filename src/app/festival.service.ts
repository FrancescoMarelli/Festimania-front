import {Festival} from "./festival";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class FestivalService {
  private apiServerUrl = 'http://localhost:8080/festimania/api/v1/festival';
  private authToken: string | undefined;

  constructor(private http: HttpClient) { }

  public getFestivals(): Observable<Festival[]> {
    return this.http.get<Festival[]>(`${this.apiServerUrl}`);
  }

  public getFestivalById(festivalId: string): Observable<Festival> {
    return this.http.get<Festival>(`${this.apiServerUrl}/${festivalId}`);
  }

  public addFestival(festival: Festival): Observable<Festival> {
    const token = localStorage.getItem('authToken'); // Recupera el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agrega el token al header
    return this.http.post<Festival>(`${this.apiServerUrl}`, festival, { headers });
  }



  public updateFestival(festival: Festival): Observable<Festival> {
    return this.http.put<Festival>(`${this.apiServerUrl}/${festival.id}`, festival);
  }

  public deleteFestival(festivalId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${festivalId}`);
  }

}



