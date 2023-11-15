// @ts-nocheck
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultPresets = [
  [
    '@babel/preset-env',
    {
      modules: ['esm'].includes(process.env.BABEL_ENV) ? false : 'commonjs',
    },
  ],
];

const productionPlugins = [
  '@babel/plugin-transform-react-constant-elements',
  'babel-plugin-transform-dev-warning',
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
];

const babelPlugins = [
  // adds namespace to classes to solve SC conflict issues
  ['babel-plugin-styled-components', { namespace: 'rui' }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
  // any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
  ['@babel/plugin-transform-runtime', { version: '^7.4.4' }],
  // for IE 11 support
  '@babel/plugin-transform-object-assign',
];

// This remove the first entry for unit tests
// `toHaveStyleRule` does always not work with `babel-plugin-styled-components`
// https://github.com/styled-components/jest-styled-components/issues/290
if (process.env.NODE_ENV === 'test') babelPlugins.shift();

// Add alias to easily reference components
babelPlugins.push([
  'module-resolver',
  {
    root: ['./src'],
    alias: {
      '@docs': './documentation',
    },
  },
]);

module.exports = {
  presets: defaultPresets.concat([['@babel/preset-react', { runtime: 'automatic' }]]),
  plugins: babelPlugins,
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  comments: false,
  env: {
    cjs: {
      plugins: productionPlugins,
    },
    esm: {
      plugins: [...productionPlugins, ['@babel/plugin-transform-runtime', { useESModules: true }]],
    },
  },
};
