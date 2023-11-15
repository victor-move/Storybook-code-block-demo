import { create } from '@storybook/theming';
const pkg = require('../package.json');

// Fixes displayed version for always being a patch behind
// This is because storybook builds before automatic patch bump
const [major, minor, patch] = pkg.version.split('.');
const version = `${major}.${minor}.${parseInt(patch) + 1}`;

export default create({
  base: 'light',
  brandTitle: `RDC UI @ v${version}`,
  brandUrl: 'https://github.com/MoveRDC/rdc-ui',

  colorPrimary: '#fff',
  colorSecondary: '#2b2b2b',

  // UI
  appBg: '#f2f2f2',
  appBorderRadius: 16,

  // Typography
  fontBase: 'BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',

  // Text colors
  textColor: '#2b2b2b',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#2b2b2b',
  barSelectedColor: '#2b2b2b',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
});
