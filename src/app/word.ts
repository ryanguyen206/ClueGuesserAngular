// This is an experimental word class which probably won't be used in production

export interface Word {
    id: number;
    name: string;
    answerClass: string;
  }

  export class Word implements Word {
    id: number;
    name: string;
    answerClass: string;
    constructor(word: string, answerClass: string){
      this.id = Math.random()*1000;
      this.name = word;
      this.answerClass = answerClass;
    }
  }