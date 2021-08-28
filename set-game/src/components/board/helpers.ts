import { CardProps, CardTrio, Colors, Shadings, Symbols } from "../interfaces";

export const getFreshDeck = (): CardProps[] => {
	const freshDeck: CardProps[] = [];
	[1, 2, 3].forEach((number) =>
		[Colors.GREEN, Colors.PURPLE, Colors.RED].forEach((color) =>
			[Shadings.OPEN, Shadings.SOLID, Shadings.STRIPED].forEach(
				(shading) =>
					[Symbols.DIAMOND, Symbols.OVAL, Symbols.SQUIGGLE].forEach(
						(symbol) => {
							freshDeck.push({ number, color, shading, symbol });
						}
					)
			)
		)
	);

	return freshDeck;
};

export const areCardsASet = (cards: CardTrio): boolean => {
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
