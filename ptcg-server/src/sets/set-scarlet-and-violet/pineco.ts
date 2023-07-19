import {PokemonCard} from '../../game/store/card/pokemon-card';
import {CardType, Stage} from '../../game/store/card/card-types';
import {StoreLike} from '../../game/store/store-like';
import {GamePhase, State} from '../../game/store/state/state';
import {AttackEffect} from '../../game/store/effects/game-effects';
import {Effect} from '../../game/store/effects/effect';
import {PlayerType, StateUtils} from '../../game';
import {PutDamageEffect} from '../../game/store/effects/attack-effects';
import {EndTurnEffect} from '../../game/store/effects/game-phase-effects';

export class Pineco extends PokemonCard {

  public stage: Stage = Stage.BASIC;

  public cardType: CardType = CardType.GRASS;

  public hp: number = 60;

  public weakness = [{ type: CardType.FIRE }];

  public resistance = [];

  public retreat = [ CardType.COLORLESS, CardType.COLORLESS ];

  public attacks = [{
    name: 'Guard Press',
    cost: [ CardType.COLORLESS, CardType.COLORLESS ],
    damage: 10,
    text: 'During your opponent’s next turn, this Pokémon takes 30 less damage from attacks ' +
        '(after applying Weakness and Resistance).'
  }];

  public set: string = 'SV1';

  public name: string = 'Pineco';

  public fullName: string = 'Pineco SVI';

  public readonly GUARD_PRESS_MARKER = 'GUARD_PRESS_MARKER';
  public readonly CLEAR_GUARD_PRESS_MARKER = 'CLEAR_GUARD_PRESS_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof PutDamageEffect
        && effect.target.marker.hasMarker(this.GUARD_PRESS_MARKER)) {
      if (state.phase === GamePhase.ATTACK) {
        effect.damage -= 30;
      }
      return state;
    }

    if (effect instanceof AttackEffect && effect.attack === this.attacks[0]) {
      const player = effect.player;
      const opponent = StateUtils.getOpponent(state, player);
      player.active.marker.addMarker(this.GUARD_PRESS_MARKER, this);
      opponent.marker.addMarker(this.CLEAR_GUARD_PRESS_MARKER, this);
      return state;
    }

    if (effect instanceof EndTurnEffect
        && effect.player.marker.hasMarker(this.CLEAR_GUARD_PRESS_MARKER, this)) {
      // TODO check if pineco being knocked out before opponent's turn's end could glitch this
      effect.player.marker.removeMarker(this.CLEAR_GUARD_PRESS_MARKER, this);
      const opponent = StateUtils.getOpponent(state, effect.player);
      opponent.forEachPokemon(PlayerType.TOP_PLAYER, (cardList) => {
        cardList.marker.removeMarker(this.GUARD_PRESS_MARKER, this);
      });
    }

    return state;
  }

}
