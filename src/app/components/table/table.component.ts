import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerformComponent } from '../customerform/customerform.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public customers: any = [];
  public devices: any = [];
  public fullName: string = "";
  public role!: string;
  public userId: string = "";

  public isPlanActive(value: number): boolean {
    return value === 1;
  }
  
 
  constructor(private api: ApiService, 
    private auth: AuthService, 
    private userStore: UserStoreService,
    private toastr: ToastrService,
    private dialogRef: MatDialog) { }

  ngOnInit(): void {

    //to get role
    this.userStore.getRoleFromStore()
    .subscribe(val =>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });

    this.userStore.getUserIdFromStore()
      .subscribe(val =>{
        const UserIdFromToken = this.auth.getUserIdFromToken();
        this.userId = val || UserIdFromToken
      });

    //to get customer and their resp. devices
    this.api.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
        this.customers.forEach((customer: { customerId: string; devices: any[]; }) => {
          this.api.getDevicesById(customer.customerId)
            .subscribe(devices => {
              customer.devices = devices; // Add a new property to each customer for their devices
              // console.log(devices);
            });
        });
      });

      

  }


  onEdit(deviceObj: any) {
    deviceObj.isEdit = true;
  }

  onUpdate(device: any): void {
    const updatePayload = {
      startDate: device.startDate,
      endDate: device.endDate,
      ModifiedBy: this.userId
    };
    this.api.updateDevice(device.deviceId, updatePayload).subscribe({
      next: (response) => {
        //console.log('Update successful', response);
        device.isEdit = false; // Hide the input fields after successful update
        this.toastr.success('Update successful!', '', {
          timeOut: 5000,
        });
      },
      error: (error) => {
        //console.error('Update failed', error);
        this.toastr.error('Update failed', '', {
          timeOut: 5000,
        });
      }
    });
  }

  onDelete(device: any){
    this.api.deleteDevice(device.deviceId).subscribe({
      next: (response) => {
        // console.log('Delete successful', response);
        this.toastr.success('Delete successful!', '', {
          timeOut: 5000,
        });
      },
      error: (error) => {
        // console.error('Delete failed', error);
        this.toastr.error('Delete failed', '', {
          timeOut: 5000,
        });
      }
    });
}


  onCancel(deviceObj: any){
    deviceObj.isEdit = false;
  }
}