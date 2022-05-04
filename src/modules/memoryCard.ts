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
        image: "./src/assets/cards/series/breaking_bad.png",
        count: 0
      },
      {
        cardId: "damengambit",
        image: "./src/assets/cards/series/damengambit.png",
        count: 0
      },
      {
        cardId: "friends",
        image: "./src/assets/cards/series/friends.png",
        count: 0
      },
      {
        cardId: "game-of-thrones",
        image: "./src/assets/cards/series/game_of_thrones.png",
        count: 0
      },
      {
        cardId: "haus-des-geldes",
        image: "./src/assets/cards/series/haus_des_geldes.png",
        count: 0
      },
      {
        cardId: "rick_and_morty",
        image: "./src/assets/cards/series/rick_and_morty.png",
        count: 0
      },
      {
        cardId: "star-trek",
        image: "./src/assets/cards/series/star_trek.png",
        count: 0
      },
      {
        cardId: "the-office",
        image: "./src/assets/cards/series/the_office.png",
        count: 0
      },
      {
        cardId: "sherlock",
        image: "./src/assets/cards/series/sherlock.png",
        count: 0
      },
      {
        cardId: "better_call_saul",
        image: "./src/assets/cards/series/better_call_saul.png",
        count: 0
      },
      {
        cardId: "stranger_things",
        image: "./src/assets/cards/series/stranger_things.png",
        count: 0
      },
      {
        cardId: "the_twilight_zone",
        image: "./src/assets/cards/series/the_twilight_zone.png",
        count: 0
      },
      {
        cardId: "the_walking_dead",
        image: "./src/assets/cards/series/the_walking_dead.png",
        count: 0
      },
      {
        cardId: "the-wire",
        image: "./src/assets/cards/series/the_wire.png",
        count: 0
      },
      {
        cardId: "vikings",
        image: "./src/assets/cards/series/vikings.png",
        count: 0
      },
    ],
  },
  {
  group: "videogames",
      memoryCards: [
        {
          cardId: "among-us",
          image: "./src/assets/cards/videogames/among_us.png",
          count: 0
        },
        {
          cardId: "call-of-duty",
          image: "./src/assets/cards/videogames/call_of_duty.png",
          count: 0
        },
        {
          cardId: "final-fantasy",
          image: "./src/assets/cards/videogames/final_fantasy.png",
          count: 0
        },
        {
          cardId: "grand-theft-auto",
          image: "./src/assets/cards/videogames/grand_theft_auto.png",
          count: 0
        },
        {
          cardId: "halo",
          image: "./src/assets/cards/videogames/halo.png",
          count: 0
        },
        {
          cardId: "league-of-legends",
          image: "./src/assets/cards/videogames/league_of_legends.png",
          count: 0
        },
        {
          cardId: "mario",
          image: "./src/assets/cards/videogames/mario.png",
          count: 0
        },
        {
          cardId: "minecraft",
          image: "./src/assets/cards/videogames/minecraft.png",
          count: 0
        },
        {
          cardId: "monster-hunter",
          image: "./src/assets/cards/videogames/monster_hunter.png",
          count: 0
        },
        {
          cardId: "persona-5",
          image: "./src/assets/cards/videogames/persona_5.png",
          count: 0
        },
        {
          cardId: "pokemon",
          image: "./src/assets/cards/videogames/pokemon.png",
          count: 0
        },
        {
          cardId: "red-dead-redemption",
          image: "./src/assets/cards/videogames/red_dead_redemption.png",
          count: 0
        },
        {
          cardId: "skyrim",
          image: "./src/assets/cards/videogames/skyrim.png",
          count: 0
        },
        {
          cardId: "the-legend-of-zelda",
          image: "./src/assets/cards/videogames/the_legend_of_zelda.png",
          count: 0
        },
        {
          cardId: "tomb-raider",
          image: "./src/assets/cards/videogames/tomb_raider.png",
          count: 0
        }
      ]
    }
];
