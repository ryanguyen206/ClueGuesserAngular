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
    this.incorrectWords = this.words.filter((word) => word.answerClass === 'incorrect');
    this.bombWord = this.words.filter((word) => word.answerClass === 'bomb');
    for(let i = 0; i < this.correctWords.length; i++){
      this.numberOfCorrectWords++;
    }
    this.numberOfIncorrectGuessesRemaining = this.numberOfCorrectWords;
    this.numberOfCorrectGuessesRemaining = this.numberOfCorrectWords;
  }

  
  checkWord(word: WordInterface) {
    if(!this.isGameOver){
      if (!word.selected) {
        word.selected = true;
        this.isCorrect = this.correctWords.some((correctWord) => correctWord.name === word.name);
        this.isIncorrect = this.incorrectWords.some((incorrectWord) => incorrectWord.name === word.name);
        this.isBomb = this.bombWord.some((bombWord) => bombWord.name === word.name);
        
        if (this.isCorrect) {
          word.selectedClass = 'correct-answer'; // Apply the class for correct words
          this.numberOfCorrectGuessesRemaining--;
        } else if (this.isIncorrect){
          word.selectedClass = 'wrong-answer'; // Apply the class for incorrect words
          this.numberOfIncorrectGuessesRemaining--;
        } else if (this.isBomb){
          word.selectedClass = 'bomb'; // Apply the class for bomb words
          this.numberOfIncorrectGuessesRemaining = 0;
        }
      }
      if(this.numberOfCorrectGuessesRemaining == 0){
          this.winGame();
      }
      if(this.numberOfIncorrectGuessesRemaining == 0){
          this.loseGame();
      }
    }
  }

  winGame(){
    console.log("You Win");
    for(let i = 0; i < this.words.length; i++){
      if(this.words[i].selected == false){
        this.words[i].selected == true;
        let isCorrect = this.correctWords.some((correctWord) => correctWord.name === this.words[i].name);
        if (isCorrect) {
          this.words[i].selectedClass = 'correct-answer'; // Apply the class for correct words
        } else {
          this.words[i].selectedClass = 'wrong-answer'; // Apply the class for incorrect words
        }
      }
    }
    this.isGameOver = true;
  }
  loseGame(){
    console.log("You Lose");
    for(let i = 0; i < this.words.length; i++){
      if(this.words[i].selected == false){
        this.words[i].selected == true;
        let isCorrect = this.correctWords.some((correctWord) => correctWord.name === this.words[i].name);
        if (isCorrect) {
          this.words[i].selectedClass = 'correct-answer'; // Apply the class for correct words
        } else {
          this.words[i].selectedClass = 'wrong-answer'; // Apply the class for incorrect words
        }
      }
    }
    this.isGameOver = true;
  }
}

