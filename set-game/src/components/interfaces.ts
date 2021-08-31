export enum Symbols {
	DIAMOND = "diamond",
	SQUIGGLE = "squiggle",
	OVAL = "oval",
}

export enum Colors {
	GREEN = "green",
	PURPLE = "purple",
	RED = "red",
}

export enum Shadings {
	SOLID = "solid",
	STRIPED = "striped",
	OPEN = "open",
}

export enum CardStates {
	IN_DECK,
	ON_BOARD,
	REMOVED,
}

export interface ShapeProps {
	shading: Shadings;
	color: Colors;
	symbol?: Symbols;
}

export interface CardProps extends ShapeProps {
	symbol?: Symbols;
	number?: number;
	isSelected?: boolean;
	cardState?: CardStates;
	clickHandler?: () => void;
}

export type CardTrio = [CardProps, CardProps, CardProps];

export enum GameStates {
	BEFORE_START = "before-start",
	NEUTRAL = "neutral",
	IS_SET = "is-set",
	NOT_SET = "not-set",
	WON = "won",
}
