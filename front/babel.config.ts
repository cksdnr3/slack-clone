import babel from '@babel/core';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: babel.TransformOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: ['last 2 chrome versions'] },
        debug: isDevelopment,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
export default config;
