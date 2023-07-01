require('./config');

const { CardManager } = require('./output/game/cards/card-manager');
const { DeckEvolutionApp } = require('./output/deck-evolution/deck-evolution-app');
const { StateSerializer } = require('./output/game/serializer/state-serializer');
const { EvolutionBotManager } = require("./output/deck-evolution/evolution-bot-manager");
const { config } = require('./output/config');
const sets = require('./output/sets');

config.core.schedulerStartNextHour = false;
config.bots.actionDelay = 0;

const process = require('process');
const cardManager = CardManager.getInstance();
cardManager.defineSet(sets.setDiamondAndPearl); // TODO pick only the energies?
cardManager.defineSet(sets.setBlackAndWhite);
cardManager.defineSet(sets.setBlackAndWhite2);
cardManager.defineSet(sets.setBlackAndWhite3);
cardManager.defineSet(sets.setBlackAndWhite4);

StateSerializer.setKnownCards(cardManager.getAllCards());
// TODO change to use my own

const botManager = EvolutionBotManager.getInstance();

const app = new DeckEvolutionApp();

app.connectToDatabase()
  .catch(error => {
    console.log('Unable to connect to database.');
    console.error(error.message);
    process.exit(1);
  })
  .then(() => app.configureBotManager(botManager))
  .then(() => app.start())
  .then(() => {
    const address = config.backend.address;
    const port = config.backend.port;
    console.log('Application started on ' + address + ':' + port + '.');
  })
  .catch(error => {
    console.error(error.message);
    console.log('Application not started.');
    process.exit(1);
  });