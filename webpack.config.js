module.exports = {
  entry: [
    'babel-polyfill',
    './src/main.js'
  ],
  output: {
    path: `${__dirname}/dest`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env',
                  {
                    'modules': false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map'
};
