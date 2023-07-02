import {BotGamesTask} from '../game/bots/bot-games-task';
import {Individual} from './individual';
import {BotClient} from '../game/bots/bot-client';
import {EvolutionCore} from './evolution-core';
import {DeckRecombiner} from './deck-recombiner';
import {logToFile} from '../utils';

export class EvolutionBotGamesTask extends BotGamesTask {

  private readonly _elitePercentage = 0.5;
  private readonly _cardBreedingLossRate = 5;

  private tournamentCounter: number = 0;
  private logFilePath: string = 'ga_run_' + new Date().toISOString() + '.txt';

  constructor(bots: BotClient[]) {
    super(bots);
  }

  public startBotGames() {
    // TODO allow loading progress from file?
    this.beginTournamentIteration();
    (this.bots[0].core as EvolutionCore).afterAllGamesDeleted = () => { // TODO ugly
      console.log('All games deleted.');
      this.endTournamentIteration();
    };
  }

  private beginTournamentIteration(): void {
    this.tournamentCounter++;
    console.log('Beginning tournament #' + this.tournamentCounter + '!');
    this.bots.forEach((individual: BotClient) => {
      this.bots.forEach((opponent: BotClient) => {
        if (individual != opponent) {
          const deck: string[] = (individual as Individual).deck;
          individual.createGame(deck, undefined, opponent);
          console.log('Pitted ' + individual.name + ' against ' + opponent.name);
          // TODO currently, it seems all bots are watching all games. Maybe close them?
        }
      });
    });
  }

  private endTournamentIteration(): void {
    console.log('Ending tournament #' + this.tournamentCounter + '.');
    // sort the best
    this.bots.sort((a, b) => ((a as Individual).score > (b as Individual).score ? -1 : 1));
    // save results
    this.writeResults();
    // select elite
    const cuttingPoint = this.bots.length * this._elitePercentage;
    const elite = this.bots.slice(0, cuttingPoint) as Individual[];
    const losers = this.bots.slice(cuttingPoint) as Individual[];
    losers.forEach((loser: BotClient) =>{
      const father: Individual = elite[Math.floor(Math.random() * elite.length)];
      const mother: Individual = elite[Math.floor(Math.random() * elite.length)];
      // breed and mutate
      (loser as Individual).deck = DeckRecombiner.breedDecks(father.deck, mother.deck, this._cardBreedingLossRate);
      (loser as Individual).updatedOnIteration = this.tournamentCounter;
    });
    // start again
    this.beginTournamentIteration();
  }

  private writeResults(): void {
    logToFile(this.logFilePath, '####################### TOURNAMENT NUMBER ' + this.tournamentCounter + '#######################');
    logToFile(this.logFilePath, '\n');
    this.bots.forEach((bot: BotClient) => {
      const individual: Individual = bot as Individual;
      logToFile(this.logFilePath, '== ' + individual.name + ' ==');
      logToFile(this.logFilePath, 'Score: ' + individual.score);
      logToFile(this.logFilePath, 'Last changed on tournament: ' + individual.updatedOnIteration);
      logToFile(this.logFilePath, 'Deck: ' + individual.deck);
    });
    logToFile(this.logFilePath, '\n');
  }
}