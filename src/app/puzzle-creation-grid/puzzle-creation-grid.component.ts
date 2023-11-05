import { Component, OnInit } from '@angular/core';
import { PUZZLEWORDS } from '../wordlist';
import { Puzzle } from '../Puzzle';
import { shuffle } from '../Shuffle';
import { HttpClient } from '@angular/common/http';
import {PuzzleCreationGridInterface, PuzzleCreationGridClass} from '../PuzzleCreationSchema'

@Component({
  selector: 'app-puzzle-creation-grid',
  templateUrl: './puzzle-creation-grid.component.html',
  styleUrls: ['./puzzle-creation-grid.component.css']
})
export class PuzzleCreationGridComponent implements OnInit {
  constructor(private http: HttpClient) { }

  //all of the words in the list
  orderedWords = PUZZLEWORDS;
  //shuffling all of the words, then taking first 25.
  selectedWords = shuffle(this.orderedWords).splice(1, 25);
  //after shuffling, assign each card correct, incorrect, bomb, randomID, numberOfCorrectAnswers. Essentially setting up the main structure of the puzzle.
  puzzle = new Puzzle(this.selectedWords);

  clue: string = '';

  ngOnInit(): void {
    // Initialization logic here (if needed)
  }


  submitClue(puzzle: Puzzle, userId:string) {
      let completedPuzzle = new PuzzleCreationGridClass();
      completedPuzzle.id = puzzle.id
      completedPuzzle.numberOfCorrectAnswers = puzzle.numberOfCorrectAnswers,
      completedPuzzle.clue = this.clue,
      completedPuzzle.personCreatedId = "123123123",
      completedPuzzle.cardComponents = puzzle.cardComponents
     
     

    this.http.post<any>('http://localhost:3000/puzzlecreation', completedPuzzle)
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
