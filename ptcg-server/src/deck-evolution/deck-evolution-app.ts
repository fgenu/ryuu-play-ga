import {EvolutionCore} from './evolution-core';
import {App} from '../backend/app';


export class DeckEvolutionApp extends App {

  constructor() {
    super();
    this.core = new EvolutionCore();
  }

/*  public runDeckEvolution(): void {
    console.log('Beginning');
    this.individuals = this.createPool(this._populationSize);
    // TODO allow loading progress from file
    // this.beginTournamentIteration();
    // TODO temporarily trying to get a single game running
    // Opponent seems to be without deck! Save it somehow
    this.core.createGame((this.individuals)[0], (this.individuals)[0].deck, this.gameSettings, this.individuals[1]);
  }*/
}