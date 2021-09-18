import { CardProps } from "../interfaces";
import { Shape } from "../shape/Shape";
import "./Card.css";

export function Card({
	number,
	symbol,
	shading,
	color,
	isSelected,
	clickHandler,
}: CardProps) {
	const shapeArray: CardProps[] = Array(number).fill({
		color,
		symbol,
		shading,
	});

	return (
		<div
			className={`card ${isSelected ? "selected" : ""}`}
			title={[number, color, shading, symbol].join(", ")}
			onClick={clickHandler}>
			{shapeArray.map((shape, index) => (
				<Shape
					key={index}
					symbol={shape.symbol}
					shading={shape.shading}
					color={shape.color}
				/>
			))}
		</div>
	);
}
