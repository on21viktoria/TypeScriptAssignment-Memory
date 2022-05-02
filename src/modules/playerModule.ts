export interface IPlayer {
    name: string;
    color: string;
    score: number;
}

export class Player implements IPlayer {
    name: string;
    color: string;
    score: number;

    constructor(name: string, color: string, score: number) {
        this.name = name;
        this.color = color;
        this.score = score;
    }

    getName() : string {
        return this.name;
    }

    setName(name: string) : void {
        this.name = name;
    }

    getScore() : number {
        return this.score;
    }

    setScore(score: number) : void {
        this.score = score;
    }
}

