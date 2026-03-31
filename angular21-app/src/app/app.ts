import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <div class="header">
        <h1>🅰️ Angular 21 Microfrontend</h1>
        <span class="version-badge">v21.2.0</span>
      </div>
      
      <div class="content">
        <div class="card">
          <h2>✅ Framework Version</h2>
          <p>This microfrontend is built with <strong>Angular 21</strong></p>
          <p class="tech-stack">Latest standalone components architecture</p>
        </div>
        
        <div class="card">
          <h2>🔌 Single-SPA Integration</h2>
          <p>Loaded dynamically via single-spa lifecycle</p>
          <ul>
            <li>bootstrap() ✓</li>
            <li>mount() ✓</li>
            <li>unmount() ✓</li>
          </ul>
        </div>
        
        <div class="card">
          <h2>🎯 Isolation</h2>
          <p>This app has its own:</p>
          <ul>
            <li>Zone.js instance</li>
            <li>Dependencies (Angular 21)</li>
            <li>Routing context</li>
          </ul>
        </div>
        
        <div class="card demo">
          <h2>🧪 Live Demo</h2>
          <button (click)="incrementCounter()" class="demo-button">
            Clicked {{ counter }} times
          </button>
          <p class="note">Counter resets when navigating away!</p>
        </div>
      </div>
      
      <router-outlet />
    </div>
  `,
  styles: [`
    .app-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 3px solid #0066cc;
    }
    
    h1 {
      color: #0066cc;
      font-size: 2.5rem;
      margin: 0;
    }
    
    .version-badge {
      background: #0066cc;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: bold;
      font-size: 0.9rem;
    }
    
    .content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #0066cc;
    }
    
    .card h2 {
      color: #0066cc;
      margin-top: 0;
      margin-bottom: 0.5rem;
      font-size: 1.3rem;
    }
    
    .card ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }
    
    .tech-stack {
      font-style: italic;
      color: #666;
    }
    
    .demo {
      background: #e7f3ff;
      text-align: center;
    }
    
    .demo-button {
      background: #0066cc;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      margin: 1rem 0;
    }
    
    .demo-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
    }
    
    .demo-button:active {
      transform: translateY(0);
    }
    
    .note {
      color: #0066cc;
      font-style: italic;
      margin-top: 0.5rem;
    }
  `]
})
export class AppComponent {
  counter = 0;
  
  incrementCounter() {
    this.counter++;
  }
}
