import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../Response';
import { FornecedorInterface } from '../Fornecedor';
@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/fornecedor`

  constructor(private http: HttpClient) { }

  createFornecedor(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  getFornecedores(): Observable<Response<FornecedorInterface[]>>{
    return this.http.get<Response<FornecedorInterface[]>>(this.apiUrl);
  }

  removeFornecedor(id: number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  getFornecedor(id: number): Observable<Response<FornecedorInterface>>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<FornecedorInterface>>(url);
  }

  updateFornecedor(id: number, formData: FormData): Observable<FormData>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }


  getFornecedoresS(): Observable<Response<FornecedorInterface[]>>{
    return this.http.get<Response<FornecedorInterface[]>>(this.apiUrl);
  }

}