import { Component, OnInit } from '@angular/core';
import { PUZZLEWORDS } from '../wordlist';
import { Puzzle } from '../Puzzle';
import { shuffle } from '../Shuffle';
import { HttpClient } from '@angular/common/http';
import { MongoPuzzle } from '../MongoPuzzle';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puzzle-creation-grid',
  templateUrl: './puzzle-creation-grid.component.html',
  styleUrls: ['./puzzle-creation-grid.component.css']
})
export class PuzzleCreationGridComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  //shuffling all of the words, then taking first 25.
  selectedWords = shuffle(PUZZLEWORDS).splice(1, 25);
  //after shuffling, assign each card correct, incorrect, bomb, randomID, numberOfCorrectAnswers. Essentially setting up the main structure of the puzzle.
  puzzle = new Puzzle(this.selectedWords);

  clue: string = '';

  ngOnInit(): void {
    // Initialization logic here (if needed)
  }

  submitClue() {
    if (this.clue.length == 0)
    {
      this.toastr.error('Clue cannot be invalid', 'Error!', {
        timeOut:3000
      })
    }
    let mongoPuzzle = new MongoPuzzle(this.puzzle, this.clue);

    this.http.get<any>('https://clueguessernodeserver.azurewebsites.net/users').subscribe(
      // this.http.get<any>('http://localhost:3000/users').subscribe(
        (response) => {
            for(let i = 0; i < response.length; i++){
              if(response[i].email == sessionStorage.getItem("Email:")){
                mongoPuzzle.userId = response[i]._id
                this.submitPuzzle(mongoPuzzle);
              }
      }})
    }
  
  submitPuzzle(mongoPuzzle: MongoPuzzle){
    this.http.post<any>('https://clueguessernodeserver.azurewebsites.net/puzzle', mongoPuzzle)
    // this.http.post<any>('http://localhost:3000/puzzle', mongoPuzzle)
      .subscribe(
        (response) => {
          // Handle the response from the server here
          this.toastr.success(`Your clue ${this.clue.toUpperCase()} has been submitted`, `Success!`, {
            timeOut:3000,
          })
          this.clue = ''
          console.log('POST request successful:', response);
          this.refreshPage()
        },
        (error) => {
          // Handle any errors here
          console.error('POST request error:', error);
        }
      );

  }

  refreshPage() {
    setTimeout(() => {
      this.router.navigate(['/tutorial'], { skipLocationChange: true }).then(() => {
        this.router.navigate(['/puzzle-creation']);
      });
    }, 2200)
  }
}
