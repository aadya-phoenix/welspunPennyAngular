import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/services/account/account.service';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  role:any;
  isAdmin = false;

  constructor(
    private authService:AuthService,
    private accountService:AccountService
  ) { 
    this.role = this.authService.getRolefromlocal();
    this.role == 'mahesh@gmail.com' ?
    this.isAdmin = true : this.isAdmin = false;
  }

  ngOnInit(): void {
    this.getCounters();
  }

  getCounters(){
    this.accountService.getDashboardReport().subscribe({
      next:(res)=>{},
      error:(err)=>{}
    });
  }

}
