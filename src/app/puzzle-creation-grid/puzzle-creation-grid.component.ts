import { Component, OnInit } from '@angular/core';
import {PUZZLEWORDS} from '../wordlist';
import { Puzzle } from '../Puzzle';
import { shuffle } from '../Shuffle';

@Component({
  selector: 'app-puzzle-creation-grid',
  templateUrl: './puzzle-creation-grid.component.html',
  styleUrls: ['./puzzle-creation-grid.component.css']
})
export class PuzzleCreationGridComponent implements OnInit {

  constructor() { }

  orderedWords = PUZZLEWORDS;
  selectedWords = shuffle(this.orderedWords).splice(1, 25);
  puzzle = new Puzzle(this.selectedWords);

  ngOnInit(): void {
  }

}
