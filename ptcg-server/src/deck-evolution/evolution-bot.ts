import {SimpleBot} from '../simple-bot/simple-bot';
import {Game} from '../game/core/game';
import {Client} from '../game/client/client.interface';

export class EvolutionBot extends SimpleBot {
  public onGameLeave(game: Game, client: Client): void {
    console.log('Leaving game! Result: ');
    // TODO increase or decrease score based on results
    super.onGameLeave(game, client);
  }
}