// Draws a pixel-art icon as an SVG: one small square per pixel.
// Port of the pixelArt() function from the original web app's ikoner.js.

import React from 'react';
import Svg, { Rect } from 'react-native-svg';

import { IconKey, PIXEL_ICONS, PixelIconDef } from './grids';

interface Props {
  icon: IconKey;
  size?: number;
}

function gridDimensions(def: PixelIconDef): { w: number; h: number } {
  let w = 0;
  for (const row of def.rows) {
    if (row.length > w) w = row.length;
  }
  return { w, h: def.rows.length };
}

export function PixelIcon({ icon, size = 32 }: Props) {
  const def = PIXEL_ICONS[icon] ?? PIXEL_ICONS.other;
  const { w, h } = gridDimensions(def);

  const rects: React.ReactElement[] = [];
  def.rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const color = def.palette[row[x]];
      if (color) {
        // 1.02 in size closes tiny gaps between adjacent pixels.
        rects.push(<Rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={color} />);
      }
    }
  });

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${w} ${h}`}>
      {rects}
    </Svg>
  );
}
