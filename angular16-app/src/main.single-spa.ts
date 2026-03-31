/**
 * Single-SPA Lifecycle for Angular 16 App
 * 
 * This file exports the required single-spa lifecycle functions:
 * - bootstrap: Initialize the app (runs once)
 * - mount: Render the app (runs every time route becomes active)
 * - unmount: Clean up the app (runs when route becomes inactive)
 */

import { NgModuleRef, PlatformRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { SingleSpaProps } from './single-spa-props';

// Store references for cleanup
let platformRef: PlatformRef | null = null;
let ngModuleRef: NgModuleRef<AppModule> | null = null;

/**
 * Bootstrap Lifecycle
 * Called once before the first mount
 * Use for one-time initialization (e.g., loading config)
 */
export async function bootstrap(props: SingleSpaProps): Promise<void> {
  console.log('[Angular 16] Bootstrap', props);
  
  // Store custom props for use in the app
  (window as any).singleSpaProps = props;
  
  return Promise.resolve();
}

/**
 * Mount Lifecycle
 * Called every time the route becomes active
 * Bootstraps the Angular module and renders the app
 */
export async function mount(props: SingleSpaProps): Promise<void> {
  console.log('[Angular 16] Mount', props);
  
  try {
    // Create platform if it doesn't exist
    if (!platformRef) {
      platformRef = platformBrowserDynamic();
    }
    
    // Bootstrap the Angular module
    ngModuleRef = await platformRef.bootstrapModule(AppModule, {
      // Preserve whitespace for better debugging
      preserveWhitespaces: false,
    });
    
    console.log('[Angular 16] Successfully mounted');
  } catch (err) {
    console.error('[Angular 16] Mount error:', err);
    throw err;
  }
  
  return Promise.resolve();
}

/**
 * Unmount Lifecycle
 * Called when the route becomes inactive
 * Destroys the Angular module and cleans up
 */
export async function unmount(props: SingleSpaProps): Promise<void> {
  console.log('[Angular 16] Unmount', props);
  
  try {
    if (ngModuleRef) {
      ngModuleRef.destroy();
      ngModuleRef = null;
    }
    
    // Note: We don't destroy platformRef to allow remounting
    // platformRef can be reused across multiple mount/unmount cycles
    
    console.log('[Angular 16] Successfully unmounted');
  } catch (err) {
    console.error('[Angular 16] Unmount error:', err);
    throw err;
  }
  
  return Promise.resolve();
}

/**
 * Development Mode: Standalone Bootstrap
 * When NOT running in single-spa context, bootstrap normally
 * This allows the app to run independently during development
 */
if (!(window as any).singleSpaNavigate) {
  console.log('[Angular 16] Running in standalone mode (not single-spa)');
  
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error('[Angular 16] Standalone bootstrap error:', err));
}
