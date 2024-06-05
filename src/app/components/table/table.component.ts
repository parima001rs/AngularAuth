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
  // public customers: Customer[] = [];
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
              console.log(devices);
            });
        });
      });

  }

}
