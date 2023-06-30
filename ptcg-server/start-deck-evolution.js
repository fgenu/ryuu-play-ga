const { CardManager } = require('./output/game/cards/card-manager');
const { DeckEvolutionApp } = require('./output/deck-evolution/deck-evolution-app');
const process = require('process');
const sets = require("./output/sets");

const cardManager = CardManager.getInstance();
const app = new DeckEvolutionApp();

console.log('Starting script.');
cardManager.defineSet(sets.setDiamondAndPearl); // TODO pick only the energies?
cardManager.defineSet(sets.setBlackAndWhite);
cardManager.defineSet(sets.setBlackAndWhite2);
cardManager.defineSet(sets.setBlackAndWhite3);
cardManager.defineSet(sets.setBlackAndWhite4);
app.run();
// process.exit(0);