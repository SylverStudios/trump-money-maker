var webpack = require('webpack');
var path = require('path');

module.exports = function(entry, artifact) {
  return {
    getConfig: function(environment) {
      var isDev = environment === 'development';

      var config = {
        entry: entry,
        output: {
          path: __dirname,
          filename: artifact,
          publicPath: 'js/',
          libraryTarget: 'umd',
        },

        resolve: {
          extensions: ['', '.js', '.jsx'],
          modulesDirectories: [
            'node_modules',
            'src'
          ],
        },


        debug: isDev,
        module: {
          loaders: [
            {
              test: /\.jsx?$/,
              loader: 'babel',
              include: [
                path.resolve(__dirname, "src")
              ]
            },
            {
              test: /\.json$/,
              loader: "json-loader"
            },
          ]
        },

        plugins: [
          new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: JSON.stringify(environment)
            }
          })
        ]
      };

      if (isDev) {
        config.devtool = 'eval';
      }

      return config;
    }
  };
};
