import { Palette } from './palette/type';
import { palette } from '@styles/palette';
import { IFlexSet } from './flexSet';
import { flexSet } from '@styles/flexSet';
import { fonts, IFonts } from './fonts';

export interface ThemeLib {
  palette: Palette;
  flexSet: (flexSet: IFlexSet) => string;
  main: {
    backgroundColor: string;
    fontColor: string;
    hilightColor: string;
  };
  fonts: IFonts;
}

export const themeLib: ThemeLib = {
  palette,
  main: {
    backgroundColor: '63, 14, 64',
    fontColor: '63, 14, 64',
    hilightColor: '18, 100, 163',
  },
  flexSet,
  fonts,
};
