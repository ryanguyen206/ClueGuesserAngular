import { Component, OnInit } from '@angular/core';
import { PUZZLEWORDS } from '../wordlist';
import { Puzzle } from '../Puzzle';
import { shuffle } from '../Shuffle';
import { HttpClient } from '@angular/common/http';
import { MongoPuzzle } from '../MongoPuzzle';
import { User } from '../user';

@Component({
  selector: 'app-puzzle-creation-grid',
  templateUrl: './puzzle-creation-grid.component.html',
  styleUrls: ['./puzzle-creation-grid.component.css']
})
export class PuzzleCreationGridComponent implements OnInit {
  constructor(private http: HttpClient) { }

  //shuffling all of the words, then taking first 25.
  selectedWords = shuffle(PUZZLEWORDS).splice(1, 25);
  //after shuffling, assign each card correct, incorrect, bomb, randomID, numberOfCorrectAnswers. Essentially setting up the main structure of the puzzle.
  puzzle = new Puzzle(this.selectedWords);

  clue: string = '';

  ngOnInit(): void {
    // Initialization logic here (if needed)
  }

  submitClue(userId:string) {
      /* let completedPuzzle = new PuzzleCreationGridClass(this.puzzle.id, this.puzzle.cardComponents, this.puzzle.numberOfCorrectAnswers, this.clue, userId);
      completedPuzzle.id = this.puzzle.id
      completedPuzzle.numberOfCorrectAnswers = this.puzzle.numberOfCorrectAnswers,
      completedPuzzle.clue = this.clue,
      completedPuzzle.personCreatedId = "123123123",
      completedPuzzle.cardComponents = this.puzzle.cardComponents
      */

    let mongoPuzzle = new MongoPuzzle(this.puzzle, this.clue);
    this.checkUsers(mongoPuzzle);

  }

  checkUsers(mongoPuzzle: MongoPuzzle){

    this.http.get<any>('http://localhost:3000/users').subscribe(
        (response) => {
            let isEmailRegistered = false;
            console.log('USERS GET request successful:', response);
            for(let i = 0; i < response.length; i++){
              if(response[i].email == sessionStorage.getItem("Email:")){
                isEmailRegistered = true;
                mongoPuzzle.userId = response[i]._id
                this.submitPuzzle(mongoPuzzle);
              }
            }
            if(isEmailRegistered == false){

              let newUser = new User(
                sessionStorage.getItem("Name:"),
                sessionStorage.getItem("Email:"),
              );

              this.http.post<any>('http://localhost:3000/users', newUser)
              .subscribe(
                (response) => {
                  // Handle the response from the server here
                  console.log('POST USER request successful:', response);
                },
                (error) => {
                  // Handle any errors here
                  console.error('POST USER request error:', error);
                }
              );

              this.checkUsers(mongoPuzzle);
            }
        },
        (error) => {
            console.error('USERS GET request error:', error);
        });

  }

  submitPuzzle(mongoPuzzle: MongoPuzzle){

    this.http.post<any>('http://localhost:3000/puzzle', mongoPuzzle)
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
