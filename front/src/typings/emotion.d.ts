import '@emotion/react';
import { ThemeLib } from '@styles/themeLib';

declare module '@emotion/react' {
  export interface Theme extends ThemeLib {}
}
