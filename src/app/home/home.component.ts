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

  constructor(private http: HttpClient) {
    this.selectCorrectWords();

    this.words = [];
    this.clue = '';

    this.http.get<any>('http://localhost:3000/puzzle').subscribe(
      (response) => {
        console.log('GET request successful:', response);
        let mongoPuzzle = response[Math.floor(Math.random()*response.length)];
        this.clue = mongoPuzzle.clue;
        this.numberOfCorrectGuessesRemaining = mongoPuzzle.answerKey.length - 1;
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
        console.log(this.words);
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
        this.isGameOver = true;
        this.changeStatus("you lose"); 
      } else if (this.numberOfCorrectGuessesRemaining == 0)
      {
        this.isGameOver = true;
        this.changeStatus("you win"); 
      }
   }

   changeStatus(status: string) {
   
      for(let i=0; i<this.words.length; i++)
      {
        this.words[i].selected = true;
      }
      console.log(status);  
   }
}

