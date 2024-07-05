import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss']
})
export class CustomerformComponent implements OnInit {
  customerForm! : FormGroup;
  public userId: string = "";
  
  constructor(private fb: FormBuilder, private api: ApiService, 
    private router: Router, 
    private toastr: ToastrService,
    private auth: AuthService, 
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      Name: ['',Validators.required],
      email: ['',Validators.required],
      allowedResources: ['',Validators.required]
    })

    this.userStore.getUserIdFromStore()
      .subscribe(val =>{
        const UserIdFromToken = this.auth.getUserIdFromToken();
        this.userId = val || UserIdFromToken
        // console.log(this.userId);
      });
  }

  onCreate(){
    if(this.customerForm.valid){
      //perform logic for sign up
      const customerData = {
        ...this.customerForm.value,
        createdBy: this.userId
      };
      console.log(customerData);
      // console.log(customerData);
      this.api.createCustomer(customerData)
      .subscribe({
        next:(res=>{
          // alert(res.message);
          this.toastr.success('', res.message, {
            timeOut: 5000,
          });
          this.customerForm.reset();
          this.router.navigate(['dashboard']);
        }),
        error:(err=>{
          // alert(err?.error.message)
          this.toastr.error('', err.message, {timeOut: 5000,});
        })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.customerForm);
      //logic for throwing error
    }
  }

  

}



