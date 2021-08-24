import { Shadings, ShapeProps } from "../../interfaces";

export function Squiggle({ color, shading }: ShapeProps) {
    const isStriped = shading === Shadings.STRIPED;

  return (
    <path
      d="M 10 18 Q 20 5, 30 12 T 60 12 C 70 12, 83 23, 64 36 Q 55 44, 40 36 T 12 40 C 12 40, 0 40, 10 18"
      fill={shading === Shadings.OPEN ? "transparent" : color}
      stroke={isStriped ? "" : color}
      stroke-width={isStriped ? "" : "3"}
      mask={isStriped ? "url(#mask-stripe)" : ""}
    />
  );
}