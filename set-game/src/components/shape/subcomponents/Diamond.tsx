import { Shadings, ShapeProps } from "../../interfaces";

export function Diamond({ color, shading }: ShapeProps) {
    const isStriped = shading === Shadings.STRIPED;

  return (
    <polygon
      points="3 23,43 43,83 23,43 3"
      fill={shading === Shadings.OPEN ? "transparent" : color}
      stroke={isStriped ? "" : color}
      stroke-width={isStriped ? "" : "3"}
      mask={isStriped ? "url(#mask-stripe)" : ""}
    />
  );
}