import { createLbrn2Project, translation } from '@richardmcquiston01/unofficial-lb-writer';
import { iconToLbrnPoints, type IconDefinition } from '../data/icons';

export interface DesignOptions {
  readonly phrase: string;
  readonly icon: IconDefinition;
  readonly fontFamily?: string;
}

const CANVAS_WIDTH_MM = 120;
const ICON_SIZE_MM = 45;
const ICON_CENTER_Y_MM = 38;
const TEXT_FONT_SIZE_MM = 9;
const TEXT_CENTER_Y_MM = 78;
const DEFAULT_FONT_FAMILY = 'Arial';

/**
 * Composes a phrase and an icon into a LightBurn-ready .lbrn2 XML
 * document using the unofficial-lb-writer package: the icon is cut as a
 * vector path, and the phrase is engraved as scanned text below it.
 */
export function buildLbrn2Document(options: DesignOptions): string {
  const { phrase, icon, fontFamily = DEFAULT_FONT_FAMILY } = options;
  const project = createLbrn2Project();

  const engraveIndex = project.addCutSetting({
    name: 'Engrave Text',
    type: 'Scan',
    maxPower: 40,
    speed: 250,
  });
  const cutIndex = project.addCutSetting({
    name: 'Cut Image',
    type: 'Cut',
    maxPower: 80,
    speed: 12,
  });

  const centerX = CANVAS_WIDTH_MM / 2;

  project.addPath(
    cutIndex,
    translation(centerX, ICON_CENTER_Y_MM),
    iconToLbrnPoints(icon, ICON_SIZE_MM),
  );

  project.addText(
    engraveIndex,
    translation(centerX, TEXT_CENTER_Y_MM),
    phrase,
    fontFamily,
    TEXT_FONT_SIZE_MM,
    { align: 'center' },
  );

  return project.toXml();
}
