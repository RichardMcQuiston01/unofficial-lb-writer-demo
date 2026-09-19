/**
 * Built-in SVG image set the demo lets the user pick from.
 *
 * Each icon is a closed, straight-edged polygon defined in a shared
 * 0-100 (y-down) viewBox. The unofficial-lb-writer package's `addPath`
 * only supports straight-line vertices (no bezier curves), so every
 * icon here is authored as a polygon rather than an arbitrary SVG path.
 * The same point set drives both the on-screen `<polygon>` preview and
 * the exported .lbrn2 shape, so what you see is what gets cut.
 */

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface IconDefinition {
  readonly id: string;
  readonly name: string;
  readonly points: readonly Point[];
}

const VIEWBOX_SIZE = 100;

export const ICON_VIEWBOX = `0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`;

export const ICONS: readonly IconDefinition[] = [
  {
    id: 'star',
    name: 'Star',
    points: [
      { x: 50, y: 5 },
      { x: 60.58, y: 35.44 },
      { x: 92.8, y: 36.1 },
      { x: 67.12, y: 55.56 },
      { x: 76.45, y: 86.41 },
      { x: 50, y: 68 },
      { x: 23.55, y: 86.41 },
      { x: 32.88, y: 55.56 },
      { x: 7.2, y: 36.1 },
      { x: 39.42, y: 35.44 },
    ],
  },
  {
    id: 'heart',
    name: 'Heart',
    points: [
      { x: 50, y: 25 },
      { x: 35, y: 10 },
      { x: 15, y: 10 },
      { x: 5, y: 30 },
      { x: 5, y: 45 },
      { x: 50, y: 90 },
      { x: 95, y: 45 },
      { x: 95, y: 30 },
      { x: 85, y: 10 },
      { x: 65, y: 10 },
    ],
  },
  {
    id: 'hexagon',
    name: 'Hexagon',
    points: [
      { x: 50, y: 5 },
      { x: 88.97, y: 27.5 },
      { x: 88.97, y: 72.5 },
      { x: 50, y: 95 },
      { x: 11.03, y: 72.5 },
      { x: 11.03, y: 27.5 },
    ],
  },
  {
    id: 'arrow',
    name: 'Arrow',
    points: [
      { x: 10, y: 40 },
      { x: 60, y: 40 },
      { x: 60, y: 30 },
      { x: 90, y: 50 },
      { x: 60, y: 70 },
      { x: 60, y: 60 },
      { x: 10, y: 60 },
    ],
  },
  {
    id: 'lightning',
    name: 'Lightning Bolt',
    points: [
      { x: 60, y: 5 },
      { x: 30, y: 55 },
      { x: 48, y: 55 },
      { x: 35, y: 95 },
      { x: 70, y: 40 },
      { x: 52, y: 40 },
    ],
  },
  {
    id: 'house',
    name: 'House',
    points: [
      { x: 50, y: 10 },
      { x: 90, y: 45 },
      { x: 80, y: 45 },
      { x: 80, y: 90 },
      { x: 20, y: 90 },
      { x: 20, y: 45 },
      { x: 10, y: 45 },
    ],
  },
];

/** Renders an icon's points as the `points` attribute of an SVG `<polygon>`. */
export function iconToSvgPoints(icon: IconDefinition): string {
  return icon.points.map((point) => `${point.x},${point.y}`).join(' ');
}

/**
 * Converts an icon's viewBox-space points into a flat `[x0, y0, x1, y1, ...]`
 * array centered on the origin and scaled to `sizeMm`, ready for
 * `Lbrn2ProjectBuilder.addPath`. The first point is repeated at the end
 * since `addPath` only connects consecutive vertices — it does not close
 * the polygon on its own.
 */
export function iconToLbrnPoints(icon: IconDefinition, sizeMm: number): number[] {
  const scale = sizeMm / VIEWBOX_SIZE;
  const halfSize = VIEWBOX_SIZE / 2;
  const closedPoints = [...icon.points, icon.points[0]];
  return closedPoints.flatMap((point) => [
    (point.x - halfSize) * scale,
    (point.y - halfSize) * scale,
  ]);
}
