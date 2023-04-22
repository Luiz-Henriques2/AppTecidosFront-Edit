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

  getTecido(id: number): Observable<Response<TecidoInterface>>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<TecidoInterface>>(url);
  }

  createTecido(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  removeTecido(id: number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  updateTecido(id: number, formData: FormData): Observable<FormData>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }

}
