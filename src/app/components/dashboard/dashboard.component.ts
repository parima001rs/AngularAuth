import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public users: any = [];
  public fullName: string = "";
  public role!: string;
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit(){
    // this.api.getUsers()
    // .subscribe(res=>{
    //   this.users = res;
    // });

    this.userStore.getFullNameFromStore()
    .subscribe(val =>{
      const FullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || FullNameFromToken
    });

    this.userStore.getRoleFromStore()
    .subscribe(val =>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  logout(){
    this.auth.signOut();
  }

}
