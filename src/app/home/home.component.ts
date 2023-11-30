import { Component, OnInit } from '@angular/core';
import {WORDS} from '../mock-words';
import {WordInterface} from '../word'
import { HttpClient } from '@angular/common/http';
import { WordClass } from '../word';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  words: WordInterface[] = WORDS;
  correctWords: WordInterface[] = [];
  incorrectWords: WordInterface[] = [];
  bombWord: WordInterface[] =[];
  clue: string = 'Animal';
  isCorrect: boolean | null = null;
  isIncorrect: boolean | null = null;
  isBomb: boolean | null = null;
  selectedWord: WordInterface | null = null;
  numberOfCorrectWords: number = 0;
  numberOfIncorrectGuessesRemaining: number = 0;
  numberOfCorrectGuessesRemaining: number = 0;
  isGameOver: boolean = false;
  isLogedIn: boolean = false;
  puzzleID : string = "override"
  isWinner: number = 0;

  constructor(private http: HttpClient) {


    this.selectCorrectWords();

    this.words = [];
    this.clue = '';

    this.http.get<any>('https://clueguessernodeserver.azurewebsites.net/puzzle').subscribe(
      // this.http.get<any>('http://localhost:3000/puzzle').subscribe(
      (response) => {
        let mongoPuzzle = response[Math.floor(Math.random()*response.length)];
        this.puzzleID = mongoPuzzle._id;
        this.clue = mongoPuzzle.clue;
        this.numberOfCorrectGuessesRemaining = mongoPuzzle.answerKey.length - 1;
        this.numberOfCorrectWords = this.numberOfCorrectGuessesRemaining;
        this.numberOfIncorrectGuessesRemaining = this.numberOfCorrectGuessesRemaining;
    
        for(let i = 0; i < mongoPuzzle.cards.length; i++){
          this.words.push(new WordClass(mongoPuzzle.cards[i], "incorrect"))
        }
        for(let i = 0; i < mongoPuzzle.answerKey.length; i++){
          if(i == 0){
            this.words[mongoPuzzle.answerKey[i]].answerClass = "bomb";
          } else {
            this.words[mongoPuzzle.answerKey[i]].answerClass = "correct";
          }
        }

      },
      (error) => {
        console.error('GET request error:', error);
      });
  }


  selectCorrectWords() {
      this.correctWords = this.words.filter((word) => word.answerClass === 'correct');
      this.numberOfIncorrectGuessesRemaining = this.correctWords.length;
      this.numberOfCorrectGuessesRemaining = this.correctWords.length;
  }

  checkWord(word: WordInterface) {
    if(!this.isGameOver && !word.selected && this.numberOfIncorrectGuessesRemaining > 0){
        word.selected = true;
        if(word.answerClass ==='correct')
        {
          this.numberOfCorrectGuessesRemaining--;
        }
        else if (word.answerClass === 'incorrect'){
          this.numberOfIncorrectGuessesRemaining--;
        } else if (word.answerClass === 'bomb'){
          this.numberOfIncorrectGuessesRemaining = 0;
        }
      }

    if(this.numberOfIncorrectGuessesRemaining == 0)
      {
        let scoreToUpdate = (this.numberOfCorrectWords - this.numberOfCorrectGuessesRemaining) * 25;
        this.isGameOver = true;
        this.endGame(scoreToUpdate);

      } else if (this.numberOfCorrectGuessesRemaining == 0)
      {
        let scoreToUpdate = this.numberOfCorrectWords * 25;
        this.isGameOver = true;
        this.isWinner = 1;
        this.endGame(scoreToUpdate);
      }

     
   }

   endGame(score : number) {
      for(let i=0; i<this.words.length; i++)
      {
        this.words[i].selected = true;
      }

      this.updateScores(score);
   }

   updateScores(score : number)
   {
      const email = sessionStorage.getItem("Email:")
        const dataToUpdate = {
          scoreToUpdate: score,
          email: email,
          puzzleID: this.puzzleID,
          isWinner: this.isWinner
        };
        this.http.put<any>('https://clueguessernodeserver.azurewebsites.net/users', dataToUpdate).subscribe((response) => {
          // this.http.put<any>('http://localhost:3000/users', dataToUpdate).subscribe((response) => {
          console.log('PUT request successful:', response);
        }, 
        (error) => {
          console.error('PUT request error:', error);
        },
        )
   }



  
}

