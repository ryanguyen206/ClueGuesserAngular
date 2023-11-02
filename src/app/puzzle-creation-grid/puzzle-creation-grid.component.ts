import { Component, OnInit } from '@angular/core';
import { PUZZLEWORDS } from '../wordlist';
import { Puzzle } from '../Puzzle';
import { shuffle } from '../Shuffle';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-puzzle-creation-grid',
  templateUrl: './puzzle-creation-grid.component.html',
  styleUrls: ['./puzzle-creation-grid.component.css']
})
export class PuzzleCreationGridComponent implements OnInit {
  constructor(private http: HttpClient) { }

  orderedWords = PUZZLEWORDS;
  selectedWords = shuffle(this.orderedWords).splice(1, 25);
  puzzle = new Puzzle(this.selectedWords);

  ngOnInit(): void {
    // Initialization logic here (if needed)
  }

  submitClue() {
    const puzzle = {
      id: '2367',
      user: 'account',
      cardComponents: [],
      numberOfCorrectAnswers: 4
    };

    this.http.post<any>('http://localhost:3000/puzzlecreation', puzzle)
      .subscribe(
        (response) => {
          // Handle the response from the server here
          console.log('POST request successful:', response);
        },
        (error) => {
          // Handle any errors here
          console.error('POST request error:', error);
        }
      );
  }
}
