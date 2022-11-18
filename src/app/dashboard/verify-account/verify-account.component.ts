import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  role:any;
  isAdmin = false;

  constructor(
    private authService:AuthService
  ) { 
    this.role = this.authService.getRolefromlocal();
    this.role == 'mahesh@gmail.com' ?
    this.isAdmin = true : this.isAdmin = false;
  }

  ngOnInit(): void {
  }

}
