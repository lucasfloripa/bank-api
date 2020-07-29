module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@apis': './src/apis',
        '@controllers': './src/controllers',
        '@interfaces': './src/interfaces',
        '@middlewares': './src/middlewares',
        '@models': './src/models',
        '@routes': './src/routes',
        '@services': './src/services',
        '@utils': './src/utils'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
