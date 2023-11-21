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
}
