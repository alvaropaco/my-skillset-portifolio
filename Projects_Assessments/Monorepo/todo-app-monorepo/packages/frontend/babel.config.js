const path = require('path');

module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['module-resolver', {
      alias: {
        src: './components',
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
      cwd: path.resolve(__dirname),  // Using absolute path here
    }],
  ],
};
