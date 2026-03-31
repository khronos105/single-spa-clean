import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 2rem;
    }
  `]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log('[Angular 16 App] Component initialized');
  }
}
