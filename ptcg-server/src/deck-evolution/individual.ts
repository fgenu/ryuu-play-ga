import {EvolutionBot} from './evolution-bot';

export class Individual {
  public client: EvolutionBot;
  public deck: string[]; // Each item should be a card's full name.
  public score: number;
  public updatedOnIteration: number;

  constructor(client: EvolutionBot, deck: string[], score: number = 0, updatedOnIteration: number = 0) {
    this.client = client;
    this.deck = deck;
    this.score = score;
    this.updatedOnIteration = updatedOnIteration;
  }
}