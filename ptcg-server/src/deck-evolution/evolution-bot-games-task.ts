import {BotGamesTask} from '../game/bots/bot-games-task';
import {Individual} from './individual';
import {BotClient} from '../game/bots/bot-client';
import {EvolutionCore} from './evolution-core';

export class EvolutionBotGamesTask extends BotGamesTask {

  constructor(bots: BotClient[]) {
    super(bots);
  }

  public startBotGames() {
    console.log('starting bot games');
    // maybe base it more on the parent's?
    // TODO allow loading progress from file?
    this.beginTournamentIteration();
    (this.bots[0].core as EvolutionCore).afterAllGamesDeleted = () => { // TODO ugly
      console.log('All games deleted.');
      this.endTournamentIteration();
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private beginTournamentIteration(): void {
    console.log('Beginning a tournament!');
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
    console.log('Ending tournament!');
  }
}