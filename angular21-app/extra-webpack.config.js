/**
 * Extra Webpack Configuration for Angular 21 + Single-SPA
 * This configures the output to be a SystemJS module
 */

module.exports = {
  output: {
    libraryTarget: 'system',
    uniqueName: 'angular21'
  },
  externals: {},
};
