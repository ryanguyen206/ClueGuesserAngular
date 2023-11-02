import { Component, OnInit } from '@angular/core';
import {PUZZLEWORDS} from '../wordlist';
import { Puzzle } from '../Puzzle';
import { shuffle } from '../Shuffle';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

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

  


  async submitClue() {
    const puzzle = { 
      id: '2367',
      user: 'account',
      cardComponents: [],
      numberOfCorrectAnswers: 4


    }

    try{
      const response = await fetch('http://localhost:3000/puzzlecreation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(puzzle)

      });

    }
    catch(error){
      console.error('Error:', error);
    }

  }
}
