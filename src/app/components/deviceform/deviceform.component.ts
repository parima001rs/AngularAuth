import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-deviceform',
  templateUrl: './deviceform.component.html',
  styleUrls: ['./deviceform.component.scss']
})
export class DeviceformComponent implements OnInit {
  deviceForm! : FormGroup;
  
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.deviceForm = this.fb.group({
      deviceId: ['',Validators.required],
      applicationId: ['',Validators.required],
      startDate: ['',Validators.required],
      endDate: ['',Validators.required],
    })
  }

  onRegister(){
    if(this.deviceForm.valid){
      //perform logic for sign up
      this.api.registerDevice(this.deviceForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.deviceForm.reset();
          this.router.navigate(['dashboard']);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.deviceForm);
      //logic for throwing error
    }
  }
  

}
