import type { StorybookConfig } from '@storybook/react-webpack5'
import { resolve } from 'path'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  stories: ['../src/renderer/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  core: {
    disableTelemetry: true
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@renderer': resolve(__dirname, '../src/renderer')
    }
    config.resolve.extensions = config.resolve.extensions || ['.ts', '.tsx', '.js', '.jsx']
    config.module = config.module || { rules: [] }
    config.module.rules = config.module.rules || []
    config.module.rules.push({
      test: /\.less$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: { importLoaders: 1 }
        },
        require.resolve('less-loader')
      ]
    })
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
            require.resolve('@babel/preset-typescript')
          ]
        }
      }
    })
    return config
  }
}

export default config
