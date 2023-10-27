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
  clue: string = 'Animal';
  isCorrect: boolean | null = null;

  constructor() {
    this.selectCorrectWords();
  }


  selectCorrectWords() {
    // Filter correct words based on the "correct" class
    this.correctWords = this.words.filter((word) => word.answerClass === 'correct');
  }

  checkWord(word: WordInterface) {
    // Check if the clicked word is in the list of correct words
    this.isCorrect = this.correctWords.some((correctWord) => correctWord.name === word.name);
  }
}
