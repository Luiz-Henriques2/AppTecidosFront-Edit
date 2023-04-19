import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../Response';
import { TecidoInterface } from '../Tecido';

@Injectable({
  providedIn: 'root'
})
export class TecidoService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/tecido`

  constructor(private http: HttpClient) { }

  getTecidos(): Observable<Response<TecidoInterface[]>>{
    return this.http.get<Response<TecidoInterface[]>>(this.apiUrl);
  }

  createTecido(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}