export interface IMemoryCard {
    cardId: string;
    image: string;
    count: number;
    flipped: boolean;
    set: boolean;
}

export interface IMemoryCardGroup {
    group: string;
    memoryCards: IMemoryCard[];
}

export class MemoryCard implements IMemoryCard {
    cardId: string;
    image: string;
    count: number;
    flipped: boolean;
    set: boolean;

    constructor(cardId: string, image: string, count: number, flipped: boolean, set: boolean) {
        this.cardId = cardId;
        this.image = image;
        this.count = count;
        this.flipped = false;
        this.set = false;
    }
}

const memoryCards: IMemoryCardGroup[] = [
    {
        group: "series",
        memoryCards: [
            {
                cardId: "breaking-bad",
                image: "./src/assets/cards/breaking_bad.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "damengambit",
                image: "./src/assets/cards/damengambit.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "friends",
                image: "./src/assets/cards/friends.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "game-of-thrones",
                image: "./src/assets/cards/game_of_thrones.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "haus-des-geldes",
                image: "./src/assets/cards/haus_des_geldes.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "rick_and_morty",
                image: "./src/assets/cards/rick_and_morty.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "star-trek",
                image: "./src/assets/cards/star_trek.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "the-office",
                image: "./src/assets/cards/the_office.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "sherlock",
                image: "./src/assets/cards/sherlock.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "better_call_saul",
                image: "./src/assets/cards/better_call_saul.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "stranger_things",
                image: "./src/assets/cards/stranger_things.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "the_twilight_zone",
                image: "./src/assets/cards/the_twilight_zone.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "the_walking_dead",
                image: "./src/assets/cards/the_walking_dead.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "the-wire",
                image: "./src/assets/cards/the_wire.png",
                count: 0,
                flipped: false,
                set: false,
              },
              {
                cardId: "vikings",
                image: "./src/assets/cards/vikings.png",
                count: 0,
                flipped: false,
                set: false,
              }
        ]
    }
  ];