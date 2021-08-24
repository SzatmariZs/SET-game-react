import { Shadings, ShapeProps } from '../../interfaces';

export function Oval({ color, shading }: ShapeProps) {
    const isStriped = shading === Shadings.STRIPED;

  return (
    <rect
      x="3"
      y="3"
      width="80"
      height="40"
      rx="20"
      ry="20"
      fill={shading === Shadings.OPEN ? "transparent" : color}
      stroke={isStriped ? "" : color}
      stroke-width={isStriped ? "" : "3"}
      mask={isStriped ? "url(#mask-stripe)" : ""}
    />
  );
}