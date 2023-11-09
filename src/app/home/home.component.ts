import { Component, OnInit } from '@angular/core';
import {WORDS} from '../mock-words';
import {WordInterface} from '../word'


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

  constructor() {
    this.selectCorrectWords();
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
   }
}

