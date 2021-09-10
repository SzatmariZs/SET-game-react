import { useState, useReducer } from "react";
import { Card } from "../card/Card";
import { CardProps, CardTrio, GameStates } from "../interfaces";
import { areCardsASet, CARD_ACTIONS, init } from "./helpers";
import "./Board.css";
import { GameState, CardReducerAction } from "./interfaces";

function cardReducer(
	gameState: GameState,
	action: CardReducerAction
): GameState {
	switch (action.type) {
		case CARD_ACTIONS.START:
			return { ...gameState, gameState: GameStates.NEUTRAL };
		case CARD_ACTIONS.PUT_ON_BOARD:
			const deckIndex = Math.floor(
				Math.random() * gameState.inDeck.length
			);
			const card = gameState.inDeck[deckIndex];
			const newBoard = [...gameState.onBoard, card];
			const sets = [];
			const cardsOnBoardLength = newBoard.length;

			if (cardsOnBoardLength > 3) {
				for (let i = 0; i < cardsOnBoardLength - 2; i++) {
					for (let j = i + 1; j < cardsOnBoardLength - 1; j++) {
						for (let k = j + 1; k < cardsOnBoardLength; k++) {
							const trio: CardTrio = [
								newBoard[i],
								newBoard[j],
								newBoard[k],
							];

							if (areCardsASet(trio)) {
								sets.push(trio);
							}
						}
					}
				}
			}

			return {
				...gameState,
				inDeck: [
					...gameState.inDeck.slice(0, deckIndex),
					...gameState.inDeck.slice(deckIndex + 1),
				],
				onBoard: newBoard,
				sets,
			};
		case CARD_ACTIONS.SELECT:
			if (!action.payload) {
				return gameState;
			}

			const newSelected: CardProps[] = [
				...gameState.selected,
				action.payload,
			];

			if (newSelected.length === 3 && areCardsASet(newSelected)) {
				// TODO: check winning
				// TODO: remove from onBoard
				// TODO: deal 3 more
				return { ...gameState, selected: [] };
			}

			return { ...gameState, selected: newSelected };
		case CARD_ACTIONS.RESET:
			return init();
		default:
			return gameState;
	}
}

export function Board() {
	const [game, dispatch] = useReducer(cardReducer, init());
	const [showHint, setShowHint] = useState<boolean>(false);

	const selectCard = (card: CardProps): void => {
		dispatch({ type: CARD_ACTIONS.SELECT, payload: card });
	};

	const startGame = (): void => {
		dispatch({ type: CARD_ACTIONS.START });
		for (let i = 0; i < 12; i++) {
			dispatch({ type: CARD_ACTIONS.PUT_ON_BOARD });
		}
		// if (!sets.length) {
		// 	putCardFromDeckToBoard(Math.min(3, cardsInDeck.length));
		// 	countSetsOnBoard();
		// }
	};

	return (
		<div className='board-container'>
			{game.gameState === GameStates.WON && (
				<div className='winning-message'>
					<p>All possible sets cleared, YOU ARE AMAZING!</p>
					<button
						onClick={() => dispatch({ type: CARD_ACTIONS.RESET })}>
						Play again
					</button>
				</div>
			)}
			{game.gameState === GameStates.BEFORE_START && (
				<button className='start' onClick={() => startGame()}>
					START GAME
				</button>
			)}
			<div className={`board ${game.gameState}`}>
				{game.onBoard.map((card, index) => (
					<Card
						key={index}
						number={card.number}
						symbol={card.symbol}
						shading={card.shading}
						color={card.color}
						isSelected={game.selected.includes(card)}
						clickHandler={() => selectCard(card)}
					/>
				))}
			</div>
			<div className='game-info'>
				<p>Number of SETs on board: {game.sets.length}</p>
				<p>Cards left in deck: {game.inDeck.length}</p>
				<button onClick={() => setShowHint(!showHint)}>
					{showHint ? "Hide hint" : "Show hint"}
				</button>
				{showHint &&
					game.sets.map((set) => (
						<div>
							{set
								.map((setObject) =>
									Object.values(setObject).join(", ")
								)
								.join("; ")}
						</div>
					))}
			</div>
		</div>
	);
}
