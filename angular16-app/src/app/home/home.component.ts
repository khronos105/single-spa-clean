import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <div class="header">
        <h1>🅰️ Angular 16 Microfrontend</h1>
        <span class="version-badge">v16.0.0</span>
      </div>
      
      <div class="info-section">
        <div class="info-card">
          <h3>✅ Framework Version</h3>
          <p>This microfrontend is built with <strong>Angular 16</strong></p>
          <code>{{ angularVersion }}</code>
        </div>
        
        <div class="info-card">
          <h3>🔌 Single-SPA Integration</h3>
          <p>Loaded dynamically via single-spa lifecycle</p>
          <ul>
            <li>bootstrap() ✓</li>
            <li>mount() ✓</li>
            <li>unmount() ✓</li>
          </ul>
        </div>
        
        <div class="info-card">
          <h3>🎯 Isolation</h3>
          <p>This app has its own:</p>
          <ul>
            <li>Zone.js instance</li>
            <li>Angular dependencies</li>
            <li>Routing context</li>
          </ul>
        </div>
      </div>
      
      <div class="demo-section">
        <h3>🧪 Live Demo</h3>
        <button (click)="incrementCounter()" class="demo-button">
          Clicked {{ counter }} times
        </button>
        <p class="demo-note">
          This counter is local to Angular 16 app. Navigate away and come back - it resets!
        </p>
      </div>
      
      <div class="props-section" *ngIf="customProps">
        <h3>📦 Custom Props from Root Config</h3>
        <pre>{{ customProps | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 3px solid #dd0031;
    }
    
    h1 {
      color: #dd0031;
      font-size: 2.5rem;
      margin: 0;
    }
    
    .version-badge {
      background: #dd0031;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: bold;
      font-size: 0.9rem;
    }
    
    .info-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .info-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #dd0031;
    }
    
    .info-card h3 {
      color: #dd0031;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
    
    .info-card ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
    }
    
    .info-card code {
      background: white;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #dd0031;
    }
    
    .demo-section {
      background: #fff3cd;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .demo-button {
      background: #dd0031;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .demo-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(221, 0, 49, 0.3);
    }
    
    .demo-button:active {
      transform: translateY(0);
    }
    
    .demo-note {
      margin-top: 1rem;
      color: #856404;
      font-style: italic;
    }
    
    .props-section {
      background: #e7f3ff;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #0066cc;
    }
    
    .props-section h3 {
      color: #0066cc;
      margin-top: 0;
    }
    
    pre {
      background: white;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
    }
  `]
})
export class HomeComponent implements OnInit {
  angularVersion = '16.0.0';
  counter = 0;
  customProps: any;
  
  ngOnInit() {
    // Retrieve custom props passed from single-spa
    this.customProps = (window as any).singleSpaProps || null;
    console.log('[Angular 16] Custom props:', this.customProps);
  }
  
  incrementCounter() {
    this.counter++;
  }
}
