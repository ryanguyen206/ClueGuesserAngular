import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  allUsers: any = [];
  winRatio: number = -1;
  sortOrders: { [key: string]: string } = {};

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<any>('http://localhost:3000/users').subscribe(
      (response) => {
          this.allUsers = response;
      },
      (error) => {
          console.error('USERS GET request error:', error);
      });

  }

  winRatioCalculator(numerator: number, denominator: number): number{
    return Math.trunc(numerator / denominator * 100)/100;
  }

  sortData(property: string): void {
    const sortOrder = this.sortOrders[property] === 'asc' ? 1 : -1;

    this.allUsers.sort((a: any, b: any) => {
      const valueA = a[property];
      const valueB = b[property];

      if (typeof valueA === 'string') {
        return sortOrder * valueA.localeCompare(valueB);
      } else {
        return sortOrder * (valueA - valueB);
      }
    });

    this.sortOrders[property] = this.sortOrders[property] === 'asc' ? 'desc' : 'asc';
  }
}
