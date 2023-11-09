// This is an experimental word class which probably won't be used in production

export interface WordInterface {
    id: number;
    name: string;
    answerClass: string;
    selected: boolean;
  }

  export class WordClass implements WordInterface {
    id: number;
    name: string;
    answerClass: string;
    selected = false;
    constructor(word: string, answerClass: string){
      this.id = Math.random()*1000;
      this.name = word;
      this.answerClass = answerClass;
    }
  }