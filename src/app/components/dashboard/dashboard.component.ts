import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public users: any = [];
  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit(){
    this.api.getUsers()
    .subscribe(res=>{
      this.users = res;
    })
  }

  logout(){
    this.auth.signOut();
  }

}
