import {Card, CardManager, CardTag, DeckAnalyser, EnergyCard, EnergyType, PokemonCard, Stage} from '../game';
import {getRandomItem, shuffle} from '../utils';

export class DeckRecombiner {

  public static breedDecks(father: string[], mother: string[], cardLoss: number): string[] {
    shuffle(father);
    shuffle(mother);
    const cut: number = Math.floor(Math.random() * 60);
    const child: DeckAnalyser = new DeckAnalyser (father.slice(0, cut).concat(mother.slice(cut)));
    shuffle(child.cards);
    child.cards.splice(0, cardLoss);
    DeckRecombiner.haveAtLeastOneBasicPokemon(child);
    do {
      DeckRecombiner.addSomeCards(child);
      DeckRecombiner.removeInvalidCards(child);
    } while (!child.isValid());
    return child.cards.map((card: Card) => card.fullName);
  }

  private static haveAtLeastOneBasicPokemon(deck: DeckAnalyser): void {
    const hasBasic = deck.cards.some((card: Card) =>
      card instanceof PokemonCard && card.stage === Stage.BASIC
    );
    if (!hasBasic) {
      const pokemon = CardManager.getInstance().getRandomBasicPokemon();
      if (deck.cards.length == 60) {
        const randomIndex = Math.floor(Math.random() * 60);
        deck.cards[randomIndex] = pokemon;
      } else {
        deck.cards.push(pokemon);
      }
    }
  }

  private static removeInvalidCards(deck: DeckAnalyser): void {
    const countMap: { [name: string]: number } = { };
    const indexesToRemove: number[] = [];
    let hasAceSpec: boolean = false;

    deck.cards.forEach((card: Card, index: number) => {
      // Count cards, except basic energies
      if (!(card instanceof EnergyCard) || card.energyType !== EnergyType.BASIC) {
        countMap[card.name] = (countMap[card.name] || 0) + 1;
        if (countMap[card.name] > 4) {
          indexesToRemove.push(index);
        }
      }

      if (card.tags.includes(CardTag.ACE_SPEC)) {
        if (hasAceSpec) {
          indexesToRemove.push(index);
        }
        hasAceSpec = true;
      }
    });

    indexesToRemove.sort().reverse().forEach((indexToRemove: number): void => {
      // removes from the end to avoid mistaken removals
      deck.cards.splice(indexToRemove, 1);
    });
  }

  private static addSomeCards(deck: DeckAnalyser): void {
    const allCards: Card[] = CardManager.getInstance().getAllCards();
    while (deck.cards.length < 60) {
      if (Math.random() > 0.5) {
        // 50% chance of adding random card
        deck.cards.push(getRandomItem(allCards));
      } else {
        // 50% chance of duplicating a card
        if (deck.cards.length > 0) {
          deck.cards.push(getRandomItem(deck.cards));
        }
      }
    }
  }

}