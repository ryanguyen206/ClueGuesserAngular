import { Component, OnInit } from '@angular/core';
import {WORDS} from '../mock-words';
import {Word} from '../word'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  userInput: string = '';
  confirming: boolean = false;
  words: Word[] = WORDS;
  correctWord: Word | undefined;

  // Need to change the clue later on 
  clue: string = 'Animal'; 
  clueVisible: boolean = false;


  toggleClue() {
    this.clueVisible = !this.clueVisible;
  }
  
  constructor() {
    this.selectCorrectWord();
  }

  selectCorrectWord() {
    //Only picks the word that matches the clue which is animal at the moment
    const correctWords = this.words.filter((word) => word.bIsCorrect);
    const randomIndex = Math.floor(Math.random() * correctWords.length);
    this.correctWord = correctWords[randomIndex];
  }

  confirm() {
    if (this.confirming) {
      this.checkUserInput();
    } else {
      this.confirming = true;
      alert('Are you sure you want to confirm?');
    }
  }

  checkUserInput() {
    // Trim is there for additional, accidental, and extra spacebar inputs
    //lowercase is to make it where user can put bird instead of Bird

    const userInputClean = this.userInput.trim().toLowerCase();
    const correctWordClean = this.correctWord?.name.toLowerCase();

    //Popup will appear if user is right or wrong
    if (userInputClean === correctWordClean) {
      alert('Correct!');
    } else {
      alert('Incorrect. Try again.');
    }

    // Reset input and confirmation alert
    this.userInput = '';
    this.confirming = false;
  }
}
