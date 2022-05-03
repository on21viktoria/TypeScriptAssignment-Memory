export interface IMemoryCard {
  cardId: string;
  image: string;
  count: number;
}

export interface IMemoryCardGroup {
  group: string;
  memoryCards: IMemoryCard[];
}

export class MemoryCard implements IMemoryCard {
  cardId: string;
  image: string;
  count: number;

  constructor(
    cardId: string,
    image: string,
    count: number,
  ) {
    this.cardId = cardId;
    this.image = image;
    this.count = count;
  }
}

export const memoryCardGroups: IMemoryCardGroup[] = [
  {
    group: "series",
    memoryCards: [
      {
        cardId: "breaking-bad",
        image: "./src/assets/cards/breaking_bad.png",
        count: 0
      },
      {
        cardId: "damengambit",
        image: "./src/assets/cards/damengambit.png",
        count: 0
      },
      {
        cardId: "friends",
        image: "./src/assets/cards/friends.png",
        count: 0
      },
      {
        cardId: "game-of-thrones",
        image: "./src/assets/cards/game_of_thrones.png",
        count: 0
      },
      {
        cardId: "haus-des-geldes",
        image: "./src/assets/cards/haus_des_geldes.png",
        count: 0
      },
      {
        cardId: "rick_and_morty",
        image: "./src/assets/cards/rick_and_morty.png",
        count: 0
      },
      {
        cardId: "star-trek",
        image: "./src/assets/cards/star_trek.png",
        count: 0
      },
      {
        cardId: "the-office",
        image: "./src/assets/cards/the_office.png",
        count: 0
      },
      {
        cardId: "sherlock",
        image: "./src/assets/cards/sherlock.png",
        count: 0
      },
      {
        cardId: "better_call_saul",
        image: "./src/assets/cards/better_call_saul.png",
        count: 0
      },
      {
        cardId: "stranger_things",
        image: "./src/assets/cards/stranger_things.png",
        count: 0
      },
      {
        cardId: "the_twilight_zone",
        image: "./src/assets/cards/the_twilight_zone.png",
        count: 0
      },
      {
        cardId: "the_walking_dead",
        image: "./src/assets/cards/the_walking_dead.png",
        count: 0
      },
      {
        cardId: "the-wire",
        image: "./src/assets/cards/the_wire.png",
        count: 0
      },
      {
        cardId: "vikings",
        image: "./src/assets/cards/vikings.png",
        count: 0
      },
    ],
  },
];
