import { WordInterface, WordClass } from './word';
import { shuffle } from './Shuffle';
import { Puzzle } from './Puzzle';

export class MongoPuzzle {

    cards: String[];
    answerKey: number[];
    clue: String;

    constructor(puzzle: Puzzle, clue: string) {
        this.clue = clue;
        this.cards = [];
        this.answerKey = [];

        for(let i = 0; i < puzzle.cardComponents.length; i++){
            this.cards.push(puzzle.cardComponents[i].name);
        }
        for(let i = 0; i < puzzle.cardComponents.length; i++){
            if(puzzle.cardComponents[i].answerClass == "bomb"){
                this.answerKey.push(i)
            }
        }
        for(let i = 0; i < puzzle.cardComponents.length; i++){
            if(puzzle.cardComponents[i].answerClass == "correct"){
                this.answerKey.push(i)
            }
        }
    }
}
