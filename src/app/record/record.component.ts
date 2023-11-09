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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.postPuzzleCreation().subscribe((data) => {
      console.log(data);
    });
  }

  getRecords() : Observable<any> {
    return this.httpClient.get('http://localhost:3000/record');
  }

  postUser() : Observable<any> {
    return this.httpClient.post('http://localhost:3000/record', {
      email: 'swag',
      name: 'swag@gmail.com',
      guessingScore: 500,
      creationScore: 600
    })
  }
  postPuzzleCreation(): Observable<any> {
    // Step 1: Retrieve the words from the WordSchema collection
    return this.httpClient.get<any[]>('http://localhost:3000/puzzle-creation').pipe(
      mergeMap((words: any[]) => {
        // Step 2: Create a new PuzzleCreation document with the retrieved words as cards
        const puzzleCreationData = {
          cards: words, // Assuming that words is an array of WordSchema documents
          clue: 'hello'
        };
  
        // Send a POST request to create a new PuzzleCreation document
        return this.httpClient.post('http://localhost:3000/puzzle-creation', puzzleCreationData);
      })
    );
  }

  

}
