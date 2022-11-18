import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public basePath = environment.baseUrl;
  public headers = new Headers({});
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  login(data:any){
    const params = new HttpParams().set('EmailId',data.loginId).set('password',data.password);
    const url = `${this.basePath}api/Login`; 
    return this.http.postParams(url, {},params).pipe(catchError(this.commmonService.Errorhandling));
  }

  getLoginDetails() {
    return JSON.parse(localStorage.getItem('loginDetails') || '{}');
  }

  getRolefromlocal(){
    let role = JSON.parse(localStorage.getItem('role') || '{}')
    return JSON.parse(localStorage.getItem('role') || '{}')
  }
}
