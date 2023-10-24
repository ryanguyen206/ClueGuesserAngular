// Use these functions to randomly shuffle arrays. I kept using it in different spots so I put the functions here to save space. - Joe
import { Word } from './word';
    
    export function shuffleStringArray(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
          // Generate a random index between 0 and i
          const j = Math.floor(Math.random() * (i + 1));
          
          // Swap elements array[i] and array[j]
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

    export function shuffleWordArray(array: Word[]) {
        for (let i = array.length - 1; i > 0; i--) {
          // Generate a random index between 0 and i
          const j = Math.floor(Math.random() * (i + 1));
          
          // Swap elements array[i] and array[j]
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }