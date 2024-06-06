import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { guidValidator } from 'src/app/helpers/validateguid';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-deviceform',
  templateUrl: './deviceform.component.html',
  styleUrls: ['./deviceform.component.scss']
})
export class DeviceformComponent implements OnInit {
  deviceForm! : FormGroup;
  
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.deviceForm = this.fb.group({
      custId: [''],
      // deviceId: ['',Validators.required],
      deviceId: ['', [Validators.required, guidValidator()]],
      applicationId: ['',Validators.required],
      startDate: ['',Validators.required],
      endDate: ['',Validators.required],
      // isPlanActive: ['',Validators.required]
    })

    this.route.params.subscribe(params => {
      const customerId = params['customerId'];
      this.deviceForm.patchValue({
        custId: customerId // Set the customerId to the form control
      });
    });
  }

  onRegister(){
    if(this.deviceForm.valid){
      //perform logic for sign up
      console.log(this.deviceForm.value);
      console.log(this.deviceForm.valid);
      this.api.registerDevice(this.deviceForm.value)
      .subscribe({
        next:(res=>{
          console.log("success");
          alert(res.message);
          this.deviceForm.reset();
          this.router.navigate(['table']);
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
