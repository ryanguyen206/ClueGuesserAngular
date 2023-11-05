import { WordInterface } from "./word";

export interface PuzzleCreationGridInterface {
    cardComponents: WordInterface[];
    numberOfCorrectAnswers: number;
    id:number
    personCreatedId:string
    clue:string
}

export class PuzzleCreationGridClass {
    id = 4;
    cardComponents = [
        {
            id:1,
            name:"fart",
            answerClass:"incorrect"
        }
    ];
    numberOfCorrectAnswers = 4;
    clue = ""
    personCreatedId = ""
}
