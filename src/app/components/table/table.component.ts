import { Component, OnInit } from '@angular/core';
import { from, map, mergeMap, switchMap, toArray, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public customers: any = [];
  public devices: any = [];
  // public devicesArray: any[] = [];
  // public devicesNewArray: any;

  public isPlanActive(value: number): boolean {
    return value === 1;
  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {

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
      endDate: device.endDate
    };
    this.api.updateDevice(device.deviceId, updatePayload).subscribe({
      next: (response) => {
        console.log('Update successful', response);
        device.isEdit = false; // Hide the input fields after successful update
      },
      error: (error) => {
        console.error('Update failed', error);
      }
    });
  }

  onDelete(device: any){
    this.api.deleteDevice(device.deviceId).subscribe({
      next: (response) => {
        console.log('Delete successful', response);
      },
      error: (error) => {
        console.error('Delete failed', error);
      }
    });
}


  onCancel(deviceObj: any){
    deviceObj.isEdit = false;
  }
}