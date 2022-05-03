import { Player } from "./playerModule";

export enum Difficulty {
    easy,
    medium,
    hard,
}

export interface Store {
    cardId: string,
    cardName: string,
    position: number,
    timesFlipped: number
}

export interface Bot extends Player{
    difficulty: Difficulty;
    store: Store[];
}

export class Bot extends Player implements Bot {
    
}