import {EvolutionCore} from './evolution-core';
import {App} from '../backend/app';


export class DeckEvolutionApp extends App {

  constructor() {
    super();
    this.core = new EvolutionCore();
  }

}