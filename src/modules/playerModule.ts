export interface IPlayer {
  name: string;
  score: number;
  flips: number;
}

export class Player implements IPlayer {
  name: string;
  score: number;
  flips: number;

  constructor(name: string) {
    this.name = name;
    this.score = 0;
    this.flips = 0;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getScore(): number {
    return this.score;
  }

  setScore(score: number): void {
    this.score = score;
  }

  getFlips(): number {
    return this.flips;
  }

  setFlips(flips: number): void {
    this.flips = flips;
  }
}
