import { useState, useReducer } from "react";
import { Card } from "../card/Card";
import { CardProps, GameStates } from "../interfaces";
import {
	areCardsASet,
	CARD_ACTIONS,
	countSetsOnBoard,
	init,
	putOnBoard,
} from "./helpers";
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
			return putOnBoard(gameState);
		case CARD_ACTIONS.SELECT:
			if (!action.payload) {
				return gameState;
			}

			const newSelected: CardProps[] = gameState.selected.includes(
				action.payload
			)
				? gameState.selected.filter(
						(selected) => action.payload !== selected
				  )
				: [...gameState.selected, action.payload];

			if (newSelected.length === 3 && areCardsASet(newSelected)) {
				const newOnBoard = gameState.onBoard.filter(
					(cardOnBoard) => !newSelected.includes(cardOnBoard)
				);
				const sets = countSetsOnBoard(newOnBoard);
				const newState =
					!gameState.inDeck.length && !sets.length
						? GameStates.WON
						: GameStates.IS_SET;
				let counter = 0;
				let newGameState = {
					...gameState,
					gameState: newState,
					onBoard: newOnBoard,
					sets,
				};

				if (newState !== GameStates.WON) {
					while (counter < 3) {
						newGameState = {
							...newGameState,
							...putOnBoard(newGameState),
						};
						counter++;
					}

					if (!newGameState.sets.length) {
						counter = 0;

						while (
							counter < Math.min(3, newGameState.inDeck.length)
						) {
							newGameState = {
								...newGameState,
								...putOnBoard(newGameState),
							};
							counter++;
						}
					}
				}

				return { ...newGameState, selected: [] };
			}

			return {
				...gameState,
				selected: newSelected,
				gameState:
					newSelected.length === 3
						? GameStates.NOT_SET
						: GameStates.NEUTRAL,
			};
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
									Object.values(setObject)
										.filter(Boolean)
										.join(", ")
								)
								.join("; ")}
						</div>
					))}
			</div>
		</div>
	);
}
