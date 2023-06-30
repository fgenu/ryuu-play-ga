import {Core} from '../game/core/core';
import {Game} from '../game/core/game';

export class EvolutionCore extends Core {
  public set afterAllGamesDeleted(value: () => void) {
    this._afterAllGamesDeleted = value;
  }
  private _afterAllGamesDeleted: () => void = (): void => {};
  public deleteGame(game: Game): void {
    super.deleteGame(game);
    if (this.games.length == 0) {
      this._afterAllGamesDeleted();
    }
  }
}