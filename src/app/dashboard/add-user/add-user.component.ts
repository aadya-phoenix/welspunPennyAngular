import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MasterService } from 'src/app/shared/services/master/master.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm:FormGroup;
  today = new Date();
  role:any;
  isAdmin = false;
  id:any;
  userDetails:any;

  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private masterService:MasterService,
    private route:ActivatedRoute,
    private router:Router
  ) { 
    this.role = this.auth.getRolefromlocal();
    this.role == 'mahesh@gmail.com' ?
    this.isAdmin = true : this.isAdmin = false;

    this.route.paramMap.subscribe((params: ParamMap) => {
      const Id = params.get('id');
      this.id = Id ? Id : 0;
    });

    this.userForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      emailID: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
   });
  }

  ngOnInit(): void {
    this.id ? this.getDetails() : '';
  }

  save(){
    if (this.userForm.invalid) {
      return;
    }
    const body = this.userForm.value;
    this.id ? this.editUser(body):this.addUser(body);
  }

  addUser(body:any){
    body.id='';
    body.status = 1;
    body.lastLoginSource = '';
    this.masterService.add(body).subscribe({
      next:(res: any) => {
         this.router.navigateByUrl('dashboard/user'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  editUser(body:any){
    body.id = this.id;
    body.status = 1;
    body.lastLoginSource='',
    this.masterService.edit(body).subscribe({
      next:(res: any) => {
         this.router.navigateByUrl('dashboard/user'); 
      },
      error:(err:any) =>{
      }
    }); 
  }

  getDetails(){
    this.masterService.getUserDetails(this.id).subscribe({
      next:(res)=>{
        this.userDetails = res[0];
        this.userForm.controls['userName'].setValue(this.userDetails.userName);
        this.userForm.controls['address1'].setValue(this.userDetails.address1);
        this.userForm.controls['emailID'].setValue(this.userDetails.emailID);
        this.userForm.controls['mobileNo'].setValue(this.userDetails.mobileNo);
        this.userForm.controls['description'].setValue(this.userDetails.description);
        this.userForm.controls['emailID'].setValue(this.userDetails.emailID);
      },
      error:(err)=>{}
    });
  }

  back(){
    this.router.navigateByUrl('dashboard/user'); 
  }
}
