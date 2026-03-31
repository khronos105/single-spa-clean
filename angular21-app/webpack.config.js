/**
 * Custom Webpack Configuration for Single-SPA Angular 21
 * 
 * Configures webpack to output as SystemJS module for single-spa loading
 */

module.exports = (config, options) => {
  // Modify output to be SystemJS compatible
  config.output = {
    ...config.output,
    library: {
      type: 'system',
      name: '@spa/angular21',
    },
    filename: 'main.js',
    chunkFilename: '[name].js',
    publicPath: 'auto',
  };
  
  // Don't externalize zone.js - bundle it with the app
  // This ensures complete isolation between Angular versions
  
  return config;
};
