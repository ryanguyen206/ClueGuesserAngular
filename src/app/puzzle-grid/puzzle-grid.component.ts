import { Component, OnInit } from '@angular/core';
import {WORDS} from '../mock-words';
import { Puzzle } from '../Puzzle';
import {WordInterface} from '../word'
import { HttpClient } from '@angular/common/http';
import { MongoPuzzle } from '../MongoPuzzle';
import { WordClass } from '../word';

@Component({
  selector: 'app-puzzle-grid',
  templateUrl: './puzzle-grid.component.html',
  styleUrls: ['./puzzle-grid.component.css']
})
export class PuzzleGridComponent implements OnInit {

  words: WordInterface[];
  clue: string;

  //orderedWords = WORDS;

  //shuffledWords = shuffleArray(this.orderedWords);

  constructor(private http: HttpClient) { 

    this.words = [];
    this.clue = '';

    this.http.get<any>('http://localhost:3000/puzzle').subscribe(
      (response) => {
        console.log('GET request successful:', response);
        let mongoPuzzle = response[0];
        this.clue = mongoPuzzle.clue;
    
        for(let i = 0; i < mongoPuzzle.cards.length; i++){
          this.words.push(new WordClass(mongoPuzzle.cards[i], "incorrect"))
        }
        for(let i = 0; i < mongoPuzzle.answerKey.length; i++){
          if(i == 0){
            this.words[i].answerClass = "bomb";
          } else {
            this.words[i].answerClass = "correct";
          }
        }
        console.log(this.words);
      },
      (error) => {
        console.error('GET request error:', error);
      });
  }

  ngOnInit(): void {
  }

  getWords(): void {

  }

}

function shuffleArray(array: WordInterface[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


