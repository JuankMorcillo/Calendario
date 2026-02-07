import { Component, inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(AuthService);
  username = this.authService.getUser()?.name || 'Usuario';
  router = inject(Router);

  showMenu = false;

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  stringToColor() {
    // Simple hash to generate a color from a string
    const name = this.authService.getUser()?.user.name || '';

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Convert hash to hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  }

  getInitials() {
    const name = this.authService.getUser()?.user.name || '';
    const lastName = this.authService.getUser()?.user?.last_name || '';
    const n = name ? name.trim().split(' ')[0][0] : '';
    const a = lastName ? lastName.trim().split(' ')[0][0] : '';
    return (n + a).toUpperCase();
  }

}
