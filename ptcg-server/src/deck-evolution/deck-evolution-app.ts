import {Individual} from './individual';
import {GameSettings} from '../game';
import {EvolutionCore} from './evolution-core';


export class DeckEvolutionApp {
  private core: EvolutionCore;
  private individuals: Individual[];
  private gameSettings: GameSettings;


  constructor() {
    this.core = new EvolutionCore();
    this.individuals = this.createPool();
    this.gameSettings = new GameSettings();
    this.gameSettings.recordingEnabled = false;
  }

  private createPool(): Individual[] {
    // TODO
    return [];
  }

  private beginTournamentIteration(): void { // TODO perhaps move logic to EvolutionCore?
    this.individuals.forEach((individual: Individual) => {
      this.individuals.forEach((opponent: Individual) => {
        if (individual != opponent) {
          this.core.createGame(individual.client, individual.deck, this.gameSettings, opponent.client);
          // TODO can bots be in more than one game simultaneously?
        }
      });
    });
    this.core.afterAllGamesDeleted = () => {
      console.log('All games deleted');
    };
  }
}