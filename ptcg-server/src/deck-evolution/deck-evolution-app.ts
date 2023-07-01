import {Individual} from './individual';
import {Card, CardManager, CardType, EnergyCard, GameSettings, PokemonCard, Stage, SuperType} from '../game';
import {EvolutionCore} from './evolution-core';
import {GrassEnergy} from '../sets/set-diamond-and-pearl/grass-energy';
import {DarknessEnergy} from '../sets/set-diamond-and-pearl/darkness-energy';
import {MetalEnergy} from '../sets/set-diamond-and-pearl/metal-energy';
import {FairyEnergy} from '../sets/set-diamond-and-pearl/fairy-energy';
import {FightingEnergy} from '../sets/set-diamond-and-pearl/fighting-energy';
import {PsychicEnergy} from '../sets/set-diamond-and-pearl/psychic-energy';
import {LightningEnergy} from '../sets/set-diamond-and-pearl/lightning-energy';
import {WaterEnergy} from '../sets/set-diamond-and-pearl/water-energy';
import {FireEnergy} from '../sets/set-diamond-and-pearl/fire-energy';


export class DeckEvolutionApp {
  private readonly _populationSize = 4; // TODO config file or something

  private core: EvolutionCore;
  private individuals: Individual[];
  private gameSettings: GameSettings;

  constructor() {
    this.core = new EvolutionCore();
    this.individuals = [];
    this.gameSettings = new GameSettings();
    this.gameSettings.recordingEnabled = false;
  }

  public run(): void {
    console.log('Beginning');
    this.individuals = this.createPool(this._populationSize);
    // TODO allow loading progress from file
    // this.beginTournamentIteration();
    // TODO temporarily trying to get a single game running
    this.core.createGame(individuals[0], individual.deck, this.gameSettings, opponent);

  }

  private createPool(population: number): Individual[] {
    const pool: Individual[] = [];
    for (let i = 1; i <= population; i++) {
      const botName = 'Bot #' + i;
      console.log('Creating ' + botName);
      const individual = new Individual(botName, this.createRandomDeck());
      this.core.connect(individual);
      pool.push(individual);
    }
    return pool;
  }

  private createRandomDeck(): string[] {
    // For now, it simply gets a random basic Pokémon and 59 corresponding energies.
    const allCards: Card[] = CardManager.getInstance().getAllCards();
    const allBasicPokemon: Card[] = allCards.filter((card: Card) => card.superType == SuperType.POKEMON && (card as PokemonCard).stage == Stage.BASIC);
    const pokemon: PokemonCard = this.getRandomItem(allBasicPokemon) as PokemonCard;
    let energy: EnergyCard;
    switch (pokemon.cardType) {
      case CardType.GRASS:
        energy = new GrassEnergy();
        break;
      case CardType.FIRE:
        energy = new FireEnergy();
        break;
      case CardType.WATER:
        energy = new WaterEnergy();
        break;
      case CardType.LIGHTNING:
        energy = new LightningEnergy();
        break;
      case CardType.PSYCHIC:
        energy = new PsychicEnergy();
        break;
      case CardType.FIGHTING:
        energy = new FightingEnergy();
        break;
      case CardType.DARK:
        energy = new DarknessEnergy();
        break;
      case CardType.METAL:
        energy = new MetalEnergy();
        break;
      default:
        energy = new FairyEnergy(); // Not ideal, but w/e for now
        break;
    }
    const deck: string[] = Array<string>(59).fill(energy.fullName);
    deck.push(pokemon.fullName);
    console.log('Created deck: ' + deck);
    return deck;
  }

  private getRandomItem<T>(list: T[]): T | undefined { // TODO move to a utils or something
    if (list.length === 0) {
      return undefined;
    }

    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

  private beginTournamentIteration(): void { // TODO perhaps move logic to EvolutionCore?
    console.log('Beginning a tournament!');
    this.individuals.forEach((individual: Individual) => {
      this.individuals.forEach((opponent: Individual) => {
        if (individual != opponent) {
          this.core.createGame(individual, individual.deck, this.gameSettings, opponent);
          console.log('Pitted ' + individual.name + ' against ' + opponent.name);
          // TODO currently, it seems all bots are watching all games. Maybe close them?
          // TODO can bots be in more than one game simultaneously?
        }
      });
    });
    this.core.afterAllGamesDeleted = () => {
      console.log('All games deleted.');
      this.endTournamentIteration();
    };
  }

  private endTournamentIteration(): void {
    console.log('Ending tournament!');
  }
}