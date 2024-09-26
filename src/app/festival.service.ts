import {Festival} from "./festival";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class FestivalService {
  private apiServerUrl = 'http://localhost:8080/festimania/api/v1/festival';

  constructor(private http: HttpClient) { }

  public getFestivals(): Observable<Festival[]> {
    return this.http.get<Festival[]>(`${this.apiServerUrl}`);
  }

  public addFestival(festival: Festival): Observable<Festival> {
    return this.http.post<Festival>(`${this.apiServerUrl}`, festival);
  }

  public updateFestival(festival: Festival): Observable<Festival> {
    return this.http.put<Festival>(`${this.apiServerUrl}/${festival.id}`, festival);
  }

  public deleteFestival(festivalId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${festivalId}`);
  }
}


