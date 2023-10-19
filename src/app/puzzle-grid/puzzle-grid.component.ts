import { Component, OnInit } from '@angular/core';
import {WORDS} from '../mock-words';
import {Word} from '../word'

@Component({
  selector: 'app-puzzle-grid',
  templateUrl: './puzzle-grid.component.html',
  styleUrls: ['./puzzle-grid.component.css']
})
export class PuzzleGridComponent implements OnInit {

  orderedWords = WORDS;

  shuffledWords = shuffleArray(this.orderedWords);

  constructor() { }

  ngOnInit(): void {
  }

  getWords(): void {

  }

}

function shuffleArray(array: Word[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
