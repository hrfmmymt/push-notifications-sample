module.exports = {
  entry: [
    'babel-polyfill',
    './src/js/main.js'
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
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  devtool: 'source-map'
};
