import { WordInterface, WordClass } from './word';
import { shuffle } from './Shuffle';

export class Puzzle {

    id: number;
    cardComponents: WordInterface[];
    numberOfCorrectAnswers: number;

    constructor(wordlist: string[]) {
        this.id = Math.random()*1000 // random ID, doesn't matter except it needs to be unique so we can reference it later
        this.numberOfCorrectAnswers = Math.floor(Math.random() * 3) + 2; // returns a number between 1 and 4 inclusive
        this.cardComponents = [];
        let n = this.numberOfCorrectAnswers + 1;
        wordlist.forEach(element => {
        if(n == this.numberOfCorrectAnswers){
            this.cardComponents.push(new WordClass(element, "bomb")); // The fist word in the stack is always the bomb word
            n--; 
        }
        else if(n > 0){
            this.cardComponents.push(new WordClass(element, "correct")); // Then the next 1 - 4 words are the correct answers
            n--; 
        }
        else {
            this.cardComponents.push(new WordClass(element, "incorrect")); // All of the other words are wrong answers
        }
        });
        shuffle(this.cardComponents); 
    }
}
