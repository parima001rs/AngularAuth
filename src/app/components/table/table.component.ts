import { Component, OnInit } from '@angular/core';
import { from, map, mergeMap, switchMap, toArray, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

// interface Customer {
//   customerId: string;
//   name: string;
//   email: string;
//   devices?: Device[]; // Optional property to hold devices
// }

// interface Device {
//   deviceId: string;
//   applicationId: string;
//   startDate: string;
//   endDate: string;
//   IsPlanActive: boolean;
// }

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public customers: any = [];
  // public customers: Customer[] = [];
  // public devices: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getCustomers()
    .subscribe(res=>{
      this.customers = res;
    });

      // this.api.getCustomers()
      //   .subscribe(customers => {
      //     this.customers = customers;
      //     this.customers.forEach(customer => {
      //       this.api.getDevicesById(customer.customerId)
      //         .subscribe(devices => {
      //           customer.devices = devices; // Add a new property to each customer for their devices
      //         });
      //     });
      //   });

    // this.api.getCustomers()
    // .subscribe(res => {
    //   this.customers = res;
    //   res.forEach(customer => {
    //     this.api.getDevicesById(customer.customerId)
    //       .subscribe(devices => {
    //         customer.devices = devices; // Add a new property to each customer for their devices
    //       });
    //   });
    // });

  

  }

}
