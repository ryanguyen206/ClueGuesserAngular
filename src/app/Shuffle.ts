    //T is a generic. It knows which 'type' aka string[] or Word[] is passed in based on the argument.
    export function shuffle<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
          // Generate a random index between 0 and i
          const j = Math.floor(Math.random() * (i + 1));
          
          // Swap elements array[i] and array[j]
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }


 