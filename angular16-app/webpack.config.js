/**
 * Custom Webpack Config for Single-SPA Angular 16
 * 
 * This config extends Angular's default webpack configuration to:
 * 1. Build as a SystemJS module (not a standalone bundle)
 * 2. Export single-spa lifecycle functions
 * 3. Ensure proper isolation from other microfrontends
 */

const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  // Apply single-spa-angular webpack transformations
  const singleSpaConfig = singleSpaAngularWebpack(config, options);
  
  // Configure output as SystemJS module
  singleSpaConfig.output = {
    ...singleSpaConfig.output,
    library: {
      type: 'system',
      name: '@spa/angular16',
    },
    filename: 'main.js',
    chunkFilename: '[name].js',
  };
  
  // Externalize single-spa (provided by root-config)
  singleSpaConfig.externals = {
    ...singleSpaConfig.externals,
    'single-spa': 'single-spa',
  };
  
  // Ensure Zone.js is bundled with this app (not shared)
  // This is CRITICAL for Angular version isolation
  // Each Angular app needs its own Zone.js instance
  
  return singleSpaConfig;
};
