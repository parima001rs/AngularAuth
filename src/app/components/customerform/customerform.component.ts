import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss']
})
export class CustomerformComponent implements OnInit {
  customerForm! : FormGroup;
  
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      Name: ['',Validators.required],
      email: ['',Validators.required],
    })
  }

  onCreate(){
    if(this.customerForm.valid){
      //perform logic for sign up
      this.api.createCustomer(this.customerForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.customerForm.reset();
          this.router.navigate(['dashboard']);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.customerForm);
      //logic for throwing error
    }
  }
  
  onClose(){
    this.router.navigate(['dashboard']);
  }

}



