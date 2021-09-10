import {
	CardProps,
	Colors,
	GameStates,
	Shadings,
	Symbols,
} from "../interfaces";
import { GameState } from "./interfaces";

export const getFreshDeck = (): CardProps[] => {
	const freshDeck: CardProps[] = [];
	[1, 2, 3].forEach((number) =>
		[Colors.GREEN, Colors.PURPLE, Colors.RED].forEach((color) =>
			[Shadings.OPEN, Shadings.SOLID, Shadings.STRIPED].forEach(
				(shading) =>
					[Symbols.DIAMOND, Symbols.OVAL, Symbols.SQUIGGLE].forEach(
						(symbol) => {
							freshDeck.push({
								number,
								color,
								shading,
								symbol,
								isSelected: false,
							});
						}
					)
			)
		)
	);

	return freshDeck;
};

export const areCardsASet = (cards: CardProps[]): boolean => {
	const numbers = new Set();
	const symbols = new Set();
	const colors = new Set();
	const shadings = new Set();

	cards.forEach((card) => {
		numbers.add(card.number);
		symbols.add(card.symbol);
		colors.add(card.color);
		shadings.add(card.shading);
	});

	return (
		[numbers, symbols, colors, shadings].filter((set) => set.size === 2)
			.length === 0
	);
};

export enum CARD_ACTIONS {
	PUT_ON_BOARD,
	SELECT,
	REMOVE_FROM_BOARD,
	RESET,
	START,
}

export const init = (): GameState => ({
	inDeck: getFreshDeck(),
	onBoard: [],
	selected: [],
	sets: [],
	gameState: GameStates.BEFORE_START,
});
