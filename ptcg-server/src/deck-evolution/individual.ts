import {SimpleBot} from '../simple-bot/simple-bot';
import {Game} from '../game/core/game';
import {Client} from '../game/client/client.interface';
import {GameWinner, Player} from '../game';

export class Individual extends SimpleBot {
  public deck: string[]; // Each item should be a card's full name.
  public score: number;
  public updatedOnIteration: number;

  constructor(name: string, deck: string[], score: number = 0, updatedOnIteration: number = 0) {
    super(name);
    this.deck = deck;
    this.score = score;
    this.updatedOnIteration = updatedOnIteration;
  }

  public async loadDeck(): Promise<string[]> {
    return this.deck;
  }

  public onGameLeave(game: Game, client: Client): void {
    const myPlayer: Player | null = this.getMyPlayer(game);
    if (myPlayer) {
      // console.log(this.name + ' leaving game ' + game.id + ' after turn ' + game.state.turn);
      this.updateFitnessScore(game, myPlayer);
    }
    super.onGameLeave(game, client);
  }

  private getMyPlayer(game: Game) {
    let myPlayer: Player | null = null;
    if (game.state.players[GameWinner.PLAYER_1].id == this.id) {
      myPlayer = game.state.players[GameWinner.PLAYER_1];
    } else if (game.state.players[GameWinner.PLAYER_2].id == this.id) {
      myPlayer = game.state.players[GameWinner.PLAYER_2];
    }
    return myPlayer;
  }

  private updateFitnessScore(game: Game, myPlayer: Player) {
    this.score += 6 - myPlayer.getPrizeLeft();
    if (game.state.players[game.state.winner] == myPlayer) {
      this.score += 6;
    }
    // console.log('ID' + this.id + ' ' + this.name + ' score is now ' + this.score + ' after game ' + game.id);
  }
}