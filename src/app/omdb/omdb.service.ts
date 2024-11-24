import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  private readonly baseUrl = 'http://www.omdbapi.com/?apikey=85000aa9&';

  private httpClient = inject(HttpClient)

  constructor(private http: HttpClient) {}

  public getFilmes(term: string): Observable<any> {
    return this.http.get(`${this.baseUrl}s=${encodeURIComponent(term)}`);
  }

  public getFilmeDetalhes(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}i=${encodeURIComponent(id)}`);
  }
}
