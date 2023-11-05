// This is an experimental word class which probably won't be used in production

export interface WordInterface {
    id: number;
    name: string;
    answerClass: string;
    //Selected keeps track on if a word has been clicked
    selected: boolean;
    //SelectedClass is to apply the if the word is correct or not. "?" is for the property being optional
    selectedClass?: string;
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