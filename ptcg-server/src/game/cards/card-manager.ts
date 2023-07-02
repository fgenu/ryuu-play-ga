import {Card} from '../store/card/card';
import {deepClone, getRandomItem} from '../../utils/utils';
import {Stage} from '../store/card/card-types';
import {PokemonCard} from '../store/card/pokemon-card';

export class CardManager {

  private static instance: CardManager;

  private cards: Card[] = [];

  public static getInstance(): CardManager {
    if (!CardManager.instance) {
      CardManager.instance = new CardManager();
    }

    return CardManager.instance;
  }

  public defineSet(cards: Card[]): void {
    this.cards.push(...cards);
  }

  public defineCard(card: Card): void {
    this.cards.push(card);
  }

  public getCardByName(name: string): Card | undefined {
    let card = this.cards.find(c => c.fullName === name);
    if (card !== undefined) {
      card = deepClone(card);
    }
    return card;
  }

  public isCardDefined(name: string): boolean {
    return this.cards.find(c => c.fullName === name) !== undefined;
  }

  public getAllCards(): Card[] {
    return this.cards;
  }

  public getRandomBasicPokemon(): PokemonCard {
    const allCards: Card[] = this.getAllCards();
    const allBasicPokemon: Card[] = allCards.filter((card: Card) => card instanceof PokemonCard && card.stage == Stage.BASIC);
    return getRandomItem(allBasicPokemon) as PokemonCard;
  }
}
