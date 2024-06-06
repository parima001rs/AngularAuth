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
  // updateDevice(device: any) {
  //   console.log(device);
  //   const updatePayload = {
  //     // ... properties you want to update ...
  //     startDate: device.startDate,
  //     endDate: device.endDate,
  //     isPlanActive: device.isPlanActive
  //   };
  
  //   this.api.updateDevice(device.deviceId, updatePayload).subscribe({
  //     next: (response) => {
  //       // Handle the successful update
  //       console.log('Device updated successfully', response);
  //     },
  //     error: (error) => {
  //       // Handle any errors
  //       console.error('Error updating device', error);
  //     }
  //   });
  // }

}
