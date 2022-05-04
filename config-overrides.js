const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
var path = require("path");

module.exports = function override(config, env) {
  config.resolve = {
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '...'],
  }
  config.plugins.push(new NodePolyfillPlugin())
  return config
}
