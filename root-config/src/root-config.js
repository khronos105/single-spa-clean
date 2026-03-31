/**
 * Single-SPA Root Configuration
 * 
 * This file registers all microfrontends and starts the single-spa lifecycle.
 * Each registered application will be loaded/mounted based on URL routing.
 */

import { registerApplication, start } from 'single-spa';

/**
 * Register Angular 16 Microfrontend
 * 
 * - name: Unique identifier for this microfrontend
 * - app: Function that returns a Promise resolving to lifecycle functions
 * - activeWhen: Routes where this app should be active
 * - customProps: Props passed to the microfrontend on mount
 */
registerApplication({
  name: '@spa/angular16',
  app: () => System.import('@spa/angular16'),
  activeWhen: ['/angular16'],
  customProps: {
    appName: 'Angular 16 App',
    version: '16.0.0'
  }
});

/**
 * Register Angular 21 Microfrontend
 * 
 * Same structure as Angular 16, but loads a different bundle
 */
registerApplication({
  name: '@spa/angular21',
  app: () => System.import('@spa/angular21'),
  activeWhen: ['/angular21'],
  customProps: {
    appName: 'Angular 21 App',
    version: '21.0.0'
  }
});

/**
 * Start single-spa
 * 
 * Options:
 * - urlRerouteOnly: Only reroute on URL changes (not on custom events)
 */
start({
  urlRerouteOnly: true,
});

console.log('✅ Single-SPA root-config initialized');
console.log('📍 Registered applications:');
console.log('   - @spa/angular16 (route: /angular16)');
console.log('   - @spa/angular21 (route: /angular21)');
