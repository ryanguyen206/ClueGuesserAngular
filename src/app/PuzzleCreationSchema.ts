import { WordInterface } from "./word";

export interface PuzzleCreationGridInterface {
    cardComponents: WordInterface[];
    numberOfCorrectAnswers: number;
    id:number
    personCreatedId:string
    clue:string
}

export class PuzzleCreationGridClass {
    id: number;
    cardComponents: any[]; // You should define a type for cardComponents
    numberOfCorrectAnswers: number;
    clue: string;
    personCreatedId: string;

    constructor(id:number, cardComponents: any, numberOfCorrectAnswers:number, clue: string, personCreatedId: string ) {
        this.id = id
        this.cardComponents = cardComponents
        this.numberOfCorrectAnswers = numberOfCorrectAnswers;
        this.clue = clue;
        this.personCreatedId = personCreatedId;
    }
}
