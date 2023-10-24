import { Word } from './word';
import { shuffleWordArray } from './Shuffle';

export class Puzzle {

    id: number;
    cardComponents: Word[];
    numberOfCorrectAnswers: number;

    constructor(wordlist: string[]) {
        this.id = Math.random()*1000 // random ID, doesn't matter except it needs to be unique so we can reference it later
        this.numberOfCorrectAnswers = Math.floor(Math.random() * 4) + 1; // returns a number between 1 and 4 inclusive
        this.cardComponents = [];
        let n = this.numberOfCorrectAnswers + 1;
        wordlist.forEach(element => {
        if(n == this.numberOfCorrectAnswers){
            this.cardComponents.push(new Word(element, "bomb")); // The fist word in the stack is always the bomb word
            n--; 
        }
        if(n > 0){
            this.cardComponents.push(new Word(element, "correct")); // Then the next 1 - 4 words are the correct answers
            n--; 
        }
        else {
            this.cardComponents.push(new Word(element, "incorrect")); // All of the other words are wrong answers
        }
        });
        shuffleWordArray(this.cardComponents); 
    }
}
