export class User {

    name: string | null;
    email: string | null;
    guessingScore: number;
    creationScore: number;
    totalWins: number;
    totalGames: number;

    constructor(name: string | null, email: string | null) {
        this.name = name;
        this.email = email;
        this.guessingScore = 0;
        this.creationScore = 0;
        this.totalWins = 0;
        this.totalGames = 0;
    }
}
