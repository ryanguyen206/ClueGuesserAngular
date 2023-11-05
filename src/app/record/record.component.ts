import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getRecords().subscribe((data) => {
      console.log(data);
    });
  }

  getRecords() : Observable<any> {
    return this.httpClient.get('http://localhost:3000/record');
  }


}
