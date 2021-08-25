import { Symbols, Shadings, ShapeProps } from "../interfaces";
import { Oval } from "./subcomponents/Oval";
import { Diamond } from "./subcomponents/Diamond";
import { Squiggle } from "./subcomponents/Squiggle";

export function Shape({ symbol, color, shading }: ShapeProps) {
	return (
		<svg width='86' height='46'>
			<defs>
				<pattern
					id='pattern-stripe'
					width='4'
					height='4'
					patternUnits='userSpaceOnUse'>
					<rect width='2' height='4' fill='white'></rect>
				</pattern>
				<mask id='mask-stripe' maskUnits='userSpaceOnUse'>
					<rect
						x='0'
						y='0'
						width='100%'
						height='100%'
						fill='url(#pattern-stripe)'
					/>
				</mask>
			</defs>
			{symbol === Symbols.OVAL ? (
				<g>
					<Oval color={color} shading={shading} />
					{shading === Shadings.STRIPED ? (
						<Oval color={color} shading={Shadings.OPEN} />
					) : null}
				</g>
			) : symbol === Symbols.DIAMOND ? (
				<g>
					<Diamond color={color} shading={shading} />
					{shading === Shadings.STRIPED ? (
						<Diamond color={color} shading={Shadings.OPEN} />
					) : null}
				</g>
			) : (
				<g>
					<Squiggle color={color} shading={shading} />
					{shading === Shadings.STRIPED ? (
						<Squiggle color={color} shading={Shadings.OPEN} />
					) : null}
				</g>
			)}
		</svg>
	);
}
