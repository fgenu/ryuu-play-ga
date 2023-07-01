import {BotGamesTask} from '../game/bots/bot-games-task';
import {Individual} from './individual';
import {BotClient} from '../game/bots/bot-client';
import {EvolutionCore} from './evolution-core';

export class EvolutionBotGamesTask extends BotGamesTask {

  private tournamentCounter: number = 0;

  constructor(bots: BotClient[]) {
    super(bots);
  }

  public startBotGames() {
    // TODO allow loading progress from file?
    this.beginTournamentIteration();
    (this.bots[0].core as EvolutionCore).afterAllGamesDeleted = () => { // TODO ugly
      console.log('All games deleted.');
      this.endTournamentIteration();
    };
  }

  private beginTournamentIteration(): void {
    this.tournamentCounter++;
    console.log('Beginning tournament #' + this.tournamentCounter + '!');
    this.bots.forEach((individual: BotClient) => {
      this.bots.forEach((opponent: BotClient) => {
        if (individual != opponent) {
          const deck: string[] = (individual as Individual).deck;
          individual.createGame(deck, undefined, opponent);
          console.log('Pitted ' + individual.name + ' against ' + opponent.name);
          // TODO currently, it seems all bots are watching all games. Maybe close them?
        }
      });
    });
  }

  private endTournamentIteration(): void {
    console.log('Ending tournament #' + this.tournamentCounter + '.');
    // save results
    // TODO
    // select elite
    // TODO
    // breed and mutate
    // TODO
    // start again
    this.beginTournamentIteration();
  }
}