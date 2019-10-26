import { Prompt } from "./prompts/prompt";
import { State } from "./state/state";

export interface StoreHandler {

  onStateStable(state: State): void;

  onStateChange(state: State): void;

  resolvePrompt(prompt: Prompt<any>): boolean;

}