import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataConstants } from 'src/app/shared/constant/dataConstants';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MasterService } from 'src/app/shared/services/master/master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  role:any;
  isAdmin = false;
  userObj:any=[];
  dateFormate= dataConstants.dateFormate;

  constructor(
    private auth:AuthService,
    private masterService:MasterService,
    private router:Router
  ) { 
    this.role = this.auth.getRolefromlocal();
    this.role == 'mahesh@gmail.com' ?
    this.isAdmin = true : this.isAdmin = false;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  editEmployee(item:any){
    this.router.navigateByUrl(`dashboard/edit/${item.id}`)
  }

  getUsers(){
    this.masterService.getUsers().subscribe({
      next:(res:any)=>{
        this.userObj = res;
      },
      error:(err:any)=>{}
    })
  }

  delete(item: any){
    Swal.fire({
       title: 'Are you sure want to remove?',
       text: 'You will not be able to recover this request!',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Yes, delete it!',
       cancelButtonText: 'No, keep it'
     }).then((result) => {
       if (result.value) {
         this.masterService.delete(item.id).subscribe({
          next :(res:any)=>{
          this.getUsers();
           Swal.fire(
             'Deleted!',
             'Your request has been deleted.',
             'success'
           )},
         error:  (err:any)=>{
         }
        })
       }
     }) 
  }

}
