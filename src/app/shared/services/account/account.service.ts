import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public basePath = environment.baseUrl;
  public headers = new Headers({});
  
  constructor(private http: HttpService, private commmonService: CommonService) {
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getDashboardReport(){
    const url = `${this.basePath}api/Account/GetDashboardReport`;
    return this.http
    .get(url, this.http.headers)
    .pipe(catchError(this.commmonService.Errorhandling));
  }

  getAccountDetails(data:any){
    const url = `${this.basePath}api/Account/GetAllAccountDetails`;
    return this.http.post(url, data).pipe(catchError(this.commmonService.Errorhandling));
  }
}
