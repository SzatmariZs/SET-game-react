import { CardProps, CardTrio, GameStates } from "../interfaces";
import { CARD_ACTIONS } from "./helpers";

export interface CardReducerAction {
	type: CARD_ACTIONS;
	payload?: CardProps;
}
export interface GameState {
	inDeck: CardProps[];
	onBoard: CardProps[];
	selected: CardProps[];
	sets: CardTrio[];
	gameState: GameStates;
}
