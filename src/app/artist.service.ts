import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artista} from "./artista";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiServerUrl = 'http://localhost:8080/festimania/api/v1/festival';

  constructor(private http: HttpClient) { }

  public addArtistToFestival(festivalId: string, artist: Artista): Observable<any> {
    const token = localStorage.getItem('authToken'); // Recuperar el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token al header
    return this.http.put(`${this.apiServerUrl}/festival/${festivalId}/artista/${artist.id}/${artist.nombre}`, {}, { headers });
  }


  public addArtist(artist: Artista): Observable<Artista> {
    const token = localStorage.getItem('authToken'); // Recuperar el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Agregar el token al header
    return this.http.post<Artista>(`${this.apiServerUrl}/artista`, artist, { headers });
  }


}
