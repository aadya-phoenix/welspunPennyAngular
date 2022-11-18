import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  public basePath = environment.baseUrl;
  public headers = new Headers({});
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  add(data:any){
    const url = `${this.basePath}api/Users`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }

  getUsers(){
    const url = `${this.basePath}api/Users`;
    return this.http
    .get(url, this.http.headers)
    .pipe(catchError(this.commmonService.Errorhandling));
  }

  getUserDetails(id:any){
    const url = `${this.basePath}api/Users/GetUserById/${id}`;
    return this.http
    .get(url, this.http.headers)
    .pipe(catchError(this.commmonService.Errorhandling));
  }

  delete(id:any){
    const url = `${this.basePath}api/Users/DeleteUser/${id}`;
    return this.http
    .delete(url, this.http.headers)
    .pipe(catchError(this.commmonService.Errorhandling));
  }

  edit(data:any){
    const url = `${this.basePath}api/Users/UpdateUser`;
    return this.http
    .put(url, data,this.http.headers)
    .pipe(catchError(this.commmonService.Errorhandling)); 
  }
}
