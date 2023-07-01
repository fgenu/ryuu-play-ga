import {BotGamesTask} from '../game/bots/bot-games-task';
import {Individual} from './individual';
import {BotClient} from '../game/bots/bot-client';
import {Scheduler} from '../utils';


export class EvolutionBotGamesTask extends BotGamesTask {
  public startBotGames() {
    // maybe base it more on the parent's?
    // TODO allow loading progress from file
    const scheduler = Scheduler.getInstance();
    scheduler.run(async () => {
      await this.beginTournamentIteration();
    }, 1); // TODO
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
          // TODO can bots be in more than one game simultaneously?
        }
      });
    });
    /*(this.core as EvolutionCore).afterAllGamesDeleted = () => { // TODO ugly
      console.log('All games deleted.');
      this.endTournamentIteration();
    };*/
  }

/*  private endTournamentIteration(): void {
    console.log('Ending tournament!');
  }*/
}