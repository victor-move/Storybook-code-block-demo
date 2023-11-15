const path = require('path');

const componentPath = `../@(src|documentation|storybook)/**/${!process.env.STORYBOOK_REG ? '*' : process.env.STORYBOOK_REG}`;
const storybookPath = `${componentPath}.stories.@(js|mdx)`;

module.exports = {
  stories: [storybookPath],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@etchteam/storybook-addon-status',
    'storybook-addon-performance',
    'storybook-addon-turbo-build',
    './register.js',
    '@storybook/addon-mdx-gfm',
  ],

  features: {
    storyStoreV7: true,
  },

  webpackFinal: async (config, { configType }) => {
    // config.mode = 'development';
    // config.optimization.sideEffects = false;
    // config.optimization.minimizer = [];
    // config.devtool = "";

    config.resolve.alias = {
      '@docs': path.resolve(__dirname, '../documentation'),
    };

    config.watchOptions = {
      ignored: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, `${componentPath}.@(e2e|spec|test).js`)],
    };
    return config;
  },

  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
        'preset-react-jsx-transform', // Can name this anything, just an arbitrary alias to avoid duplicate presets'
      ],
    ],
  }),

  framework: {
    name: '@storybook/react-webpack5',

    options: {
      strictMode: true,
    },
  },

  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  docs: {
    autodocs: true,
  },
};
