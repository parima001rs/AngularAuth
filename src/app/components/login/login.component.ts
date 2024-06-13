import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm! : FormGroup;
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){
      // console.log(this.loginForm.value);
      //send the obj to database
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          // alert(res.message);
          this.toastr.success('Login Success!', '', {
            timeOut: 5000,
          });
          
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
        },
        error:(err)=>{
          // alert(err?.error.message)
          this.toastr.error('Something went wrong', err.message, {
            timeOut: 5000,
          });
          // console.log(err);
        }
      })
    }
    else{
      //throw the error using toaster and with req. fields
      ValidateForm.validateAllFormFields(this.loginForm);
      //alert("Your form is invalid");
    }
  }
  checkValidEmail(event: string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }
  
  confirmToReset(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      // console.log(this.resetPasswordEmail);
      const buttonRef = document.getElementById("closeBtn");
      buttonRef?.click();

      //API call to be done

      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next:(res)=>{
          this.toastr.success('Reset Success!', '', {
            timeOut: 5000,
          });
          // alert("Reset Success!");
          this.resetPasswordEmail = "";
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click();
        },
        error:(err)=>{
          this.toastr.error('Something went wrong', err.message, {
            timeOut: 5000,
          });
          // alert("Something went wrong!");
          // console.log(err.response.data.message);
        
        }
      })
    }
  }
}
