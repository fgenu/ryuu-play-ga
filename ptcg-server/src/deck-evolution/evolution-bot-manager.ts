import {BotManager} from '../game/bots/bot-manager';
import {EvolutionBotGamesTask} from './evolution-bot-games-task';
import {Individual} from './individual';
import {CardManager, CardType, EnergyCard} from '../game';
import {GrassEnergy} from '../sets/set-diamond-and-pearl/grass-energy';
import {FireEnergy} from '../sets/set-diamond-and-pearl/fire-energy';
import {WaterEnergy} from '../sets/set-diamond-and-pearl/water-energy';
import {LightningEnergy} from '../sets/set-diamond-and-pearl/lightning-energy';
import {PsychicEnergy} from '../sets/set-diamond-and-pearl/psychic-energy';
import {FightingEnergy} from '../sets/set-diamond-and-pearl/fighting-energy';
import {DarknessEnergy} from '../sets/set-diamond-and-pearl/darkness-energy';
import {MetalEnergy} from '../sets/set-diamond-and-pearl/metal-energy';
import {FairyEnergy} from '../sets/set-diamond-and-pearl/fairy-energy';


export class EvolutionBotManager extends BotManager {
  private readonly _populationSize = 12; // TODO config file or something
  private static ev_instance: EvolutionBotManager; // bad solution probably

  constructor() {
    super();
    this.createPool(this._populationSize);
    this.botGameArranger = new EvolutionBotGamesTask(this.bots);
  }

  public static getInstance(): EvolutionBotManager {
    if (!EvolutionBotManager.ev_instance) {
      EvolutionBotManager.ev_instance = new EvolutionBotManager();
    }
    return EvolutionBotManager.ev_instance;
  }

  private createPool(population: number): void {
    for (let i = 1; i <= population; i++) {
      const botName = 'Bot #' + i;
      console.log('Creating ' + botName);
      const individual = new Individual(botName, this.createRandomDeck());
      this.registerBot(individual);
    }
  }

  private createRandomDeck(): string[] { // TODO move elsewhere
    // For now, it simply gets a random basic Pokémon and 59 corresponding energies.
    const pokemon = CardManager.getInstance().getRandomBasicPokemon();
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


}