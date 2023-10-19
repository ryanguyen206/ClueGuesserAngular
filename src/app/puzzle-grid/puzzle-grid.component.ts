import { Component, OnInit } from '@angular/core';
import {WORDS} from '../mock-words';

@Component({
  selector: 'app-puzzle-grid',
  templateUrl: './puzzle-grid.component.html',
  styleUrls: ['./puzzle-grid.component.css']
})
export class PuzzleGridComponent implements OnInit {

  words = WORDS;

  constructor() { }

  ngOnInit(): void {
  }

  getWords(): void {

  }

}
