// The little hockey player figure showing where each measurement sits.
// Faithful port of the #matt-figur SVG from the original index.html,
// drawn with react-native-svg and fed live values from the profile.

import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg, { Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { Measurements } from '../domain/sizing/suggest';
import { formatLength, formatWeight, UnitSystem } from '../domain/sizing/units';
import { MeasurementKey } from '../domain/sizing/types';
import { colors } from '../theme';

interface Props {
  measurements: Measurements;
  units: UnitSystem;
}

const SKIN = '#f2c79a';
const LINE_COLOR = '#3d5a7a';

export function BodyFigure({ measurements, units }: Props) {
  const { t } = useTranslation();

  const value = (key: MeasurementKey): string => {
    const v = measurements[key];
    if (v == null) return t('measurements.notMeasured');
    return key === 'weight' ? formatWeight(v, units) : formatLength(v, units);
  };

  const label = (key: MeasurementKey) => `${t(`measurements.fields.${key}`)}: ${value(key)}`;

  // Numbered dots: same numbering as the measurement form.
  const dots: { x: number; y: number; n: string }[] = [
    { x: 150, y: 44, n: '7' }, // head
    { x: 170, y: 122, n: '1' }, // chest
    { x: 227, y: 184, n: '2' }, // forearm
    { x: 170, y: 202, n: '3' }, // waist
    { x: 139, y: 352, n: '4' }, // shin
    { x: 222, y: 226, n: '5' }, // hand
    { x: 139, y: 408, n: '6' }, // foot
  ];

  return (
    <Svg viewBox="0 0 340 450" width="100%" height={380} accessibilityLabel="Measurement figure">
      <Defs>
        <LinearGradient id="jersey" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#4a90e2" />
          <Stop offset="1" stopColor="#2c6fb3" />
        </LinearGradient>
      </Defs>

      {/* Height and weight at the top */}
      <SvgText x={170} y={22} textAnchor="middle" fill={colors.text} fontSize={13} fontWeight="600">
        {`${label('height')}   ·   ${label('weight')}`}
      </SvgText>

      {/* ===== The body ===== */}
      <G>
        {/* Legs (pants) */}
        <Path d="M152,205 L140,310 L138,398" stroke="#1c3permanent" strokeWidth={0} fill="none" />
        <Path d="M152,205 L140,310 L138,398" stroke="#274b70" strokeWidth={22} strokeLinecap="round" fill="none" />
        <Path d="M188,205 L200,310 L202,398" stroke="#274b70" strokeWidth={22} strokeLinecap="round" fill="none" />
        {/* Skates */}
        <Path d="M124,398 h26 a4,4 0 0 1 4,4 v6 h-34 v-6 a4,4 0 0 1 4,-4 Z" fill="#dfe7f0" />
        <Path d="M188,398 h26 a4,4 0 0 1 4,4 v6 h-34 v-6 a4,4 0 0 1 4,-4 Z" fill="#dfe7f0" />
        {/* Arms (sleeve + hand) */}
        <Path d="M138,98 L110,156 L120,212" stroke="#2f6da8" strokeWidth={16} strokeLinecap="round" fill="none" />
        <Path d="M202,98 L230,156 L220,212" stroke="#2f6da8" strokeWidth={16} strokeLinecap="round" fill="none" />
        <Circle cx={120} cy={214} r={9} fill={SKIN} />
        <Circle cx={220} cy={214} r={9} fill={SKIN} />
        {/* Torso (jersey) */}
        <Path
          d="M138,96 Q138,88 148,88 L192,88 Q202,88 202,96 L196,165 Q193,208 170,208 Q147,208 144,165 Z"
          fill="url(#jersey)"
        />
        {/* Neck */}
        <Rect x={162} y={74} width={16} height={14} rx={5} fill={SKIN} />
        {/* Head */}
        <Circle cx={170} cy={54} r={27} fill={SKIN} />
        {/* Face */}
        <Circle cx={161} cy={52} r={2.6} fill="#20344c" />
        <Circle cx={179} cy={52} r={2.6} fill="#20344c" />
        <Path d="M161,62 Q170,69 179,62" stroke="#20344c" strokeWidth={2} fill="none" strokeLinecap="round" />
      </G>

      {/* ===== Leader lines from body to label ===== */}
      <G stroke={LINE_COLOR} strokeWidth={1.5}>
        <Line x1={150} y1={44} x2={100} y2={48} />
        <Line x1={158} y1={122} x2={100} y2={124} />
        <Line x1={240} y1={184} x2={248} y2={184} />
        <Line x1={158} y1={202} x2={100} y2={204} />
        <Line x1={126} y1={352} x2={100} y2={354} />
        <Line x1={235} y1={226} x2={248} y2={236} />
        <Line x1={126} y1={408} x2={100} y2={410} />
      </G>

      {/* ===== Numbered dots ===== */}
      {dots.map((dot) => (
        <G key={dot.n}>
          <Circle cx={dot.x} cy={dot.y} r={13} fill={colors.card} stroke={colors.blue} strokeWidth={2} />
          <SvgText x={dot.x} y={dot.y + 4} textAnchor="middle" fill={colors.blue} fontSize={12} fontWeight="700">
            {dot.n}
          </SvgText>
        </G>
      ))}

      {/* ===== Labels with values ===== */}
      <G>
        <SvgText x={96} y={50} textAnchor="end" fill={colors.muted} fontSize={12}>{label('head')}</SvgText>
        <SvgText x={96} y={126} textAnchor="end" fill={colors.muted} fontSize={12}>{label('chest')}</SvgText>
        <SvgText x={252} y={188} textAnchor="start" fill={colors.muted} fontSize={12}>{label('forearm')}</SvgText>
        <SvgText x={96} y={208} textAnchor="end" fill={colors.muted} fontSize={12}>{label('waist')}</SvgText>
        <SvgText x={96} y={358} textAnchor="end" fill={colors.muted} fontSize={12}>{label('shin')}</SvgText>
        <SvgText x={252} y={240} textAnchor="start" fill={colors.muted} fontSize={12}>{label('hand')}</SvgText>
        <SvgText x={96} y={414} textAnchor="end" fill={colors.muted} fontSize={12}>{label('foot')}</SvgText>
      </G>
    </Svg>
  );
}
