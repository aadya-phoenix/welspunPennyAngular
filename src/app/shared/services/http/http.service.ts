import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public headers = new HttpHeaders({});
  public params = new HttpParams({});

  constructor(private httpClient: HttpClient) {}

  public get(urlString: string, headers: HttpHeaders): Observable<any> {
    const url = urlString;
    return this.httpClient.get(url, { headers });
  }

  public getParams(urlString: string, headers: HttpHeaders, params:HttpParams): Observable<any>{
    const url = urlString;
    return this.httpClient.get(url, { headers, params }); 
  }

  public postParams(
    urlString: string,
    payload: any,
    params:HttpParams,
    headers?: HttpHeaders
  ): Observable<any> {
    const url = urlString;
    return this.httpClient.post(url, payload, { headers,params });
  }

  public post(
    urlString: string,
    payload: any,
    headers?: HttpHeaders
  ): Observable<any> {
    const url = urlString;
    return this.httpClient.post(url, payload, { headers });
  }


  public put(
    urlString: string,
    payload: any,
    headers: HttpHeaders
  ): Observable<any> {
    const url = urlString;
    return this.httpClient.put(url, payload, { headers });
  }

  public delete(urlString: string, headers: HttpHeaders, params?:HttpParams): Observable<any> {
    const url = urlString;
    return this.httpClient.delete(url, { headers, params });
  }
}