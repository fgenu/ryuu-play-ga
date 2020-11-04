export enum GameCoreError {
  REPLAY_INVALID_STATE = 'REPLAY_INVALID_STATE',
  SERIALIZER_ERROR = 'SERIALIZER_ERROR',
  SIMULATOR_STATE_NOT_STABLE = 'SIMULATOR_STATE_NOT_STABLE',
}

export enum GameStoreMessage {
  ASLEEP_FLIP = 'ASLEEP_FLIP',
  CONFUSION_FLIP = 'CONFUSION_FLIP',
  BOT_NOT_INITIALIZED = 'BOT_NOT_INITIALIZED',
  BOT_NOT_FOUND = 'BOT_NOT_FOUND',
  BOT_NO_DECK = 'BOT_NO_DECK',
  BURNED_DAMAGE_FLIP = 'BURNED_DAMAGE_FLIP',
  CLIENT_NOT_CONNECTED = 'CLIENT_NOT_CONNECTED',
  GAME_NOT_FOUND = 'GAME_NOT_FOUND',
  ACTION_IN_PROGRESS = 'ACTION_IN_PROGRESS',
  ILLEGAL_ACTION = 'ILLEGAL_ACTION',
  INVALID_DECK = 'INVALID_DECK',
  GAME_INVITATION_MESSAGE = 'GAME_INVITATION_MESSAGE',
  ALREADY_PLAYING = 'ALREADY_PLAYING',
  MAX_PLAYERS_REACHED = 'MAX_PLAYERS_REACHED',
  SETUP_PLAYER_NO_BASIC = 'SETUP_NO_BASIC',
  SETUP_OPPONENT_NO_BASIC = 'SETUP_OPPONENT_NO_BASIC',
  SETUP_WHO_BEGINS_FLIP = 'SETUP_WHO_BEGINS_FLIP',
  CHOOSE_STARTING_POKEMONS = 'CHOOSE_STARTING_POKEMONS',
  UNKNOWN_CARD = 'UNKNOWN_CARD',
  UNKNOWN_POWER = 'UNKNOWN_POWER',
  NOT_YOUR_TURN = 'NOT_YOUR_TURN',
  PROMPT_ALREADY_RESOLVED = 'PROMPT_ALREADY_RESOLVED',
  INVALID_TARGET = 'INVALID_TARGET',
  UNKNOWN_ATTACK = 'UNKNOWN_ATTACK',
  ENERGY_ALREADY_ATTACHED = 'ENERGY_ALREADY_ATTACHED',
  SUPPORTER_ALREADY_PLAYED = 'SUPPORTER_ALREADY_PLAYED',
  STADIUM_ALREADY_PLAYED = 'STADIUM_ALREADY_PLAYED',
  SAME_STADIUM_ALREADY_IN_PLAY = 'SAME_STADIUM_ALREADY_IN_PLAY',
  STADIUM_ALREADY_USED = 'STADIUM_ALREADY_USED',
  NO_STADIUM_IN_PLAY = 'NO_STADIUM_IN_PLAY',
  POKEMON_TOOL_ALREADY_ATTACHED = 'POKEMON_TOOL_ALREADY_ATTACHED',
  NOT_ENOUGH_ENERGY = 'NOT_ENOUGH_ENERGY',
  RETREAT_MESSAGE = 'RETREAT_MESSAGE',
  CHOOSE_NEW_ACTIVE_POKEMON = 'CHOOSE_NEW_ACTIVE_POKEMON',
  CHOOSE_PRIZE_CARD = 'CHOOSE_PRIZE_CARD',
  INVALID_GAME_STATE = 'INVALID_GAME_STATE',
  RETREAT_ALREADY_USED = 'RETREAT_ALREADY_USED',
  CANNOT_PLAY_THIS_CARD = 'CANNOT_PLAY_THIS_CARD',
  CANNOT_USE_POWER = 'CANNOT_USE_POWER',
  CANNOT_USE_STADIUM = 'CANNOT_USE_STADIUM',
  INVALID_PROMPT_RESULT = 'INVALID_PROMPT_RESULT',
  BLOCKED_BY_SPECIAL_CONDITION = 'BLOCKED_BY_SPECIAL_CONDITION',
  BLOCKED_BY_EFFECT = 'BLOCKED_BY_EFFECT',
  BLOCKED_BY_ABILITY = 'BLOCKED_BY_ABILITY',
  POWER_ALREADY_USED = 'POWER_ALREADY_USED',
  POKEMON_CANT_EVOLVE_THIS_TURN = 'POKEMON_CANT_EVOLVE_THIS_TURN',
}

export enum GameCardMessage {

  CHOOSE_ONE_POKEMON = 'CHOOSE_ONE_POKEMON',
  CHOOSE_ANY_TWO_CARDS = 'CHOOSE_ANY_TWO_CARDS',
  CHOOSE_ANY_CARD = 'CHOOSE_ANY_CARD',
  CHOOSE_BASIC_POKEMON = 'CHOOSE_BASIC_POKEMON',
  CHOOSE_OPPONENTS_POKEMON = 'CHOOSE_OPPONENTS_POKEMON',
  CHOOSE_TRAINER_CARD = 'CHOOSE_TRAINER_CARD',
  CHOOSE_ENERGY_CARD = 'CHOOSE_ENERGY_CARD',
  CHOOSE_CARD_TO_DISCARD = 'CHOOSE_CARD_TO_DISCARD',
  CHOOSE_MATCHING_STAGE_2 = 'CHOOSE_MATCHING_STAGE_2',
  CHOOSE_UP_TO_2_POKEMONS_WITH_TOOL = 'CHOOSE_UP_TO_2_POKEMONS_WITH_TOOL',
  CARDS_SHOWED_BY_THE_OPPONENT = 'CARDS_SHOWED_BY_THE_OPPONENT',
  CHOOSE_3_POKEMON_AND_BASIC_ENERGY = 'CHOOSE_3_POKEMON_AND_BASIC_ENERGY',
  WANT_OPPONENT_TO_SWITCH_POKEMON = 'WANT_OPPONENT_TO_SWITCH_POKEMON',
  WANT_DISCARD_ENERGY = 'WANT_DISCARD_ENERGY',
  COIN_FLIP = 'COIN_FLIP',
  CHOOSE_SUPPORTER_CARD = 'CHOOSE_SUPPORTER_CARD',
  USE_SET_UP_ABILITY = 'USE_SET_UP_ABILITY',
  USE_RETURN_ABILITY = 'USE_RETURN_ABILITY',
  PLAY_BOTH_CARDS_AT_ONCE = 'PLAY_BOTH_CARDS_AT_ONCE',
  CHOOSE_SP_POKEMON = 'CHOOSE_SP_POKEMON',
  PUT_POKEMON_INTO_THE_DECK = 'PUT_POKEMON_INTO_THE_DECK',
  CHOOSE_CARDS_ORDER = 'CHOOSE_CARDS_ORDER',
  MOVE_BASIC_ENERGY = 'MOVE_BASIC_ENERGY',
  MOVE_ENERGY = 'MOVE_ENERGY',
  ATTACH_ENERGY_TO_BENCH = 'ATTACH_ENERGY_TO_BENCH',
  MOVE_DAMAGE = 'MOVE_DAMAGE',
  PRIZE_CARDS = 'PRIZE_CARDS',
  ATTACH_LIGHTNING_ENERGY = 'ATTACH_LIGHTNING_ENERGY',
  ATTACH_FIRE_ENERGY = 'ATTACH_FIRE_ENERGY',
  ATTACH_METAL_ENERGY = 'ATTACH_METAL_ENERGY',
  ATTACH_DARK_ENERGY = 'ATTACH_DARK_ENERGY',
  ATTACH_ENERGY_TO_EXP_SHARE = 'ATTACH_ENERGY_TO_EXP_SHARE',
  CHOOSE_ENERGIES_TO_DISCARD = 'CHOOSE_ENERGIES_TO_DISCARD',
  ALL_FIRE_ENERGIES = 'ALL_FIRE_ENERGIES',
  ALL_LIGHTNING_ENERGIES = 'ALL_LIGHTNING_ENERGIES',
  CHOOSE_SPECIAL_CONDITION = 'CHOOSE_SPECIAL_CONDITION',
  PARALYZED = 'PARALYZED',
  CONFUSED = 'CONFUSED',
  ASLEEP = 'ASLEEP',
  POISONED = 'POISONED',
  BURNED = 'BURNED'
}

export enum GameLog {
  LOG_STARTS_BECAUSE_OF_ABILITY = 'LOG_STARTS_BECAUSE_OF_ABILITY', // { name, ability }
  LOG_SHUFFLE_DECK = '{1} shuffles the deck.',
  LOG_DRAW_CARDS = '{1} draws {2} cards.',
  REPLAY_INVALID_STATE = 'REPLAY_INVALID_STATE',
  SERIALIZER_ERROR = 'SERIALIZER_ERROR'
}

export const GameMessage = { ...GameCoreError, ...GameStoreMessage, ...GameCardMessage };
export type GameMessage = GameCoreError | GameStoreMessage | GameCardMessage;
