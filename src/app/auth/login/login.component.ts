import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  roles:any;
  
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router: Router,
    private commonService: CommonService,
  ) { 
    this.loginForm = this.fb.group({
      loginId: new FormControl('',[]),
      password: new FormControl('',[]),
    });
  }

  ngOnInit(): void {
    localStorage.setItem('token', JSON.stringify({}));
    localStorage.setItem('loginDetails', JSON.stringify({}));
    localStorage.setItem('role', JSON.stringify({}));
  }

  login(){
    if(this.loginForm.valid){
      this.commonService.showLoading();
      let loginDetails = this.loginForm.value;
      this.authService.login(loginDetails).subscribe({
        next:(res:any)=>{
        if(res){
          if(res.isValidUser)
          {
            let roleObj = loginDetails.loginId;
            localStorage.setItem('role', JSON.stringify(roleObj));
            this.router.navigateByUrl('dashboard');
          }
          else{
            Swal.fire({
              title: 'Incorrect Username or Password',
              text: 'Please login again!',
              icon: 'error',
            });
          }
          this.commonService.hideLoading();
        }
       },
       error:(err:any) =>{
        this.commonService.hideLoading();
      } 
      });
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
