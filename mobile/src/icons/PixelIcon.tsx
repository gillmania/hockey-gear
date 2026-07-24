// Renders a gear icon from the PNG assets in assets/icons/.
// Same API as the old pixel-art SVG version: <PixelIcon icon="skates" size={40} />.

import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { IconKey } from './grids';

interface Props {
  icon: IconKey;
  size?: number;
}

const ICON_FILES: Record<IconKey, ImageSourcePropType> = {
  helmet: require('../../assets/icons/helmet.png'),
  jersey: require('../../assets/icons/jersey.png'),
  neckGuard: require('../../assets/icons/neck-guard.png'),
  shoulderPads: require('../../assets/icons/shoulder-pads.png'),
  elbowPads: require('../../assets/icons/elbow-pads.png'),
  gloves: require('../../assets/icons/gloves.png'),
  pants: require('../../assets/icons/pants.png'),
  shinGuards: require('../../assets/icons/shin-guards.png'),
  skates: require('../../assets/icons/skates.png'),
  stick: require('../../assets/icons/stick.png'),
  jock: require('../../assets/icons/jock.png'),
  bag: require('../../assets/icons/bag.png'),
  other: require('../../assets/icons/other.png'),
};

export function PixelIcon({ icon, size = 32 }: Props) {
  const source = ICON_FILES[icon] ?? ICON_FILES.other;
  return (
    <Image
      source={source}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}
