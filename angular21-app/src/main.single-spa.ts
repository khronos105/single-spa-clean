/**
 * Single-SPA Entry Point for Angular 21
 * 
 * This file integrates Angular 21 standalone components with single-spa
 */

import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

let appRef: ApplicationRef | null = null;
let rootElement: HTMLElement | null = null;

/**
 * Bootstrap lifecycle - called once before first mount
 */
export async function bootstrap(props: any) {
  console.log('[Angular 21] Bootstrap', props);
  return Promise.resolve();
}

/**
 * Mount lifecycle - called when route becomes active
 */
export async function mount(props: any) {
  console.log('[Angular 21] Mount', props);
  
  // Create container element
  const container = document.createElement('div');
  container.id = 'angular21-app-root';
  
  // Create app root element
  rootElement = document.createElement('app-root');
  container.appendChild(rootElement);
  
  // Append to single-spa container
  const spaContainer = document.getElementById('single-spa-application');
  if (spaContainer) {
    spaContainer.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
  
  // Bootstrap the application
  appRef = await bootstrapApplication(AppComponent, appConfig);
  
  console.log('[Angular 21] Successfully mounted');
  return Promise.resolve();
}

/**
 * Unmount lifecycle - called when route becomes inactive
 */
export async function unmount(props: any) {
  console.log('[Angular 21] Unmount', props);
  
  if (appRef) {
    appRef.destroy();
    appRef = null;
  }
  
  // Remove container
  const container = document.getElementById('angular21-app-root');
  if (container) {
    container.remove();
  }
  
  rootElement = null;
  
  console.log('[Angular 21] Successfully unmounted');
  return Promise.resolve();
}

// Standalone mode for development
if (!(window as any).singleSpaNavigate) {
  console.log('[Angular 21] Running in standalone mode');
  bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error('[Angular 21] Standalone bootstrap error:', err));
}
