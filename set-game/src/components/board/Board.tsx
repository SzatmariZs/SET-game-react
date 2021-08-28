import { useState } from "react";
import { Card } from "../card/Card";
import { CardProps, CardTrio, GameStates } from "../interfaces";
import { getFreshDeck, areCardsASet } from "./helpers";
import "./Board.css";

export function Board() {
	const [cardsInDeck, setCardsInDeck] = useState<CardProps[]>(getFreshDeck());
	const [cardsOnBoard, setCardsOnBoard] = useState<CardProps[]>([]);
	const [setsOnBoard, setSetsOnBoard] = useState<CardTrio[]>([]);
	const [gameState, setGameState] = useState<GameStates>(
		GameStates.BEFORE_START
	);
	const [showHint, setShowHint] = useState<boolean>(false);

	const getCardFromDeck = (): CardProps => {
		const deckIndex = Math.floor(Math.random() * cardsInDeck.length);
		const card = cardsInDeck[deckIndex];

		setCardsInDeck([
			...cardsInDeck.slice(0, deckIndex),
			...cardsInDeck.slice(deckIndex + 1),
		]);

		return card;
	};

	const putCardFromDeckToBoard = (count: number): void => {
		const cards = [];

		for (let i = 0; i < count; i++) {
			cards.push(getCardFromDeck());
		}

		setCardsOnBoard([...cardsOnBoard, ...cards]);
	};

	const countSetsOnBoard = (): void => {
		const cardsOnBoardLength = cardsOnBoard.length;

		for (let i = 0; i < cardsOnBoardLength - 2; i++) {
			for (let j = i + 1; j < cardsOnBoardLength - 1; j++) {
				for (let k = j + 1; k < cardsOnBoardLength; k++) {
					const trio: CardTrio = [
						cardsOnBoard[i],
						cardsOnBoard[j],
						cardsOnBoard[k],
					];

					if (areCardsASet(trio)) {
						setSetsOnBoard([...setsOnBoard, trio]);
					}
				}
			}
		}

		// if (!setsOnBoard.length) {
		// 	putCardFromDeckToBoard(Math.min(3, cardsInDeck.length));
		// 	countSetsOnBoard();
		// }
	};

	const resetGame = (): void => {
		setCardsInDeck(getFreshDeck());
		setCardsOnBoard([]);
		setSetsOnBoard([]);
		setGameState(GameStates.BEFORE_START);
	};

	const startGame = (): void => {
		setGameState(GameStates.NEUTRAL);
		putCardFromDeckToBoard(12);
		countSetsOnBoard();
	};

	return (
		<div className='board-container'>
			{gameState === GameStates.WON && (
				<div className='winning-message'>
					<p>All possible sets cleared, YOU ARE AMAZING!</p>
					<button onClick={resetGame}>Play again</button>
				</div>
			)}
			{gameState === GameStates.BEFORE_START && (
				<button className='start' onClick={() => startGame()}>
					START GAME
				</button>
			)}
			<div className={`board ${gameState}`}>
				{cardsOnBoard.map((card, index) => (
					<Card
						key={index}
						number={card.number}
						symbol={card.symbol}
						shading={card.shading}
						color={card.color}
						// isSelected={this.selectedCards.includes(card)}
						// onClick={() => this.selectCard(card)}
					/>
				))}
			</div>
			<div className='game-info'>
				<p>Number of SETs on board: {setsOnBoard.length}</p>
				<p>Cards left in deck: {cardsInDeck.length}</p>
				<button onClick={() => setShowHint(!showHint)}>
					{showHint ? "Hide hint" : "Show hint"}
				</button>
				{showHint &&
					setsOnBoard?.map((set) => (
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
