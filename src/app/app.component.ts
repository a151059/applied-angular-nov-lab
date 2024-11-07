import { Component } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DemosComponent } from './demos/demos.component';
import { RouterOutlet } from '@angular/router';
import { FeatureDirective } from '@shared';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-nav-bar />
    <div *feature="'home-page-content'" class="text-2xl font-extralight tracking-wide pl-8">
      Welcome to Alexandria's Angular Lab
    </div>
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [NavBarComponent, DemosComponent, RouterOutlet, FeatureDirective],
})
export class AppComponent {}
