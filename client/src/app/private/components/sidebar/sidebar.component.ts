import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public links = [
    { url: '/overview', name: 'Overview' },
    { url: '/analyst', name: 'Analyst' },
    { url: '/history', name: 'History' },
    { url: '/add-order', name: 'Add order' },
    { url: '/categories', name: 'Assortment' },
  ];

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
