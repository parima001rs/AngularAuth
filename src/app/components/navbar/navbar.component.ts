import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public users: any = [];
  public fullName: string = "";
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.userStore.getFullNameFromStore()
    .subscribe(val =>{
      const FullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || FullNameFromToken
    });

  }

  logout(){
    this.auth.signOut();
  }

}
