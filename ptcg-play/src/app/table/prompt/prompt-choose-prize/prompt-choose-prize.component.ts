import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GameState, Card, ChoosePrizePrompt } from 'ptcg-server';

import { GameService } from '../../../api/services/game.service';

@Component({
  selector: 'ptcg-prompt-choose-prize',
  templateUrl: './prompt-choose-prize.component.html',
  styleUrls: ['./prompt-choose-prize.component.scss']
})
export class PromptChoosePrizeComponent implements OnInit, OnChanges {

  @Input() prompt: ChoosePrizePrompt;
  @Input() gameState: GameState;

  public cards: Card[];
  public cardbackMap: {[index: number]: boolean} = {};
  public allowedCancel: boolean;
  public promptId: number;
  public message: string;
  public isInvalid = false;
  private result: number[] = [];

  constructor(
    private gameService: GameService
  ) { }

  public cancel() {
    const gameId = this.gameState.gameId;
    const id = this.promptId;
    this.gameService.resolvePrompt(gameId, id, null);
  }

  public confirm() {
    const gameId = this.gameState.gameId;
    const id = this.promptId;
    this.gameService.resolvePrompt(gameId, id, this.result);
  }

  public onChange(result: number[]) {
    const count = this.prompt.options.count;
    this.result = result;
    this.isInvalid = result.length !== count;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.prompt && this.gameState) {
      const state = this.gameState.state;
      const prompt = this.prompt;
      const player = state.players.find(p => p.id === this.prompt.playerId);
      if (player === undefined) {
        return;
      }

      const cards: Card[] = [];
      const cardbackMap: {[index: number]: boolean} = {};
      player.prizes.forEach((prize) => {
        prize.cards.forEach(card => {
          cardbackMap[cards.length] = prize.isSecret;
          cards.push(card);
        });
      });

      this.cards = cards;
      this.cardbackMap = cardbackMap;
      this.allowedCancel = prompt.options.allowCancel;
      this.message = prompt.message;
      this.promptId = prompt.id;
    }
  }

}