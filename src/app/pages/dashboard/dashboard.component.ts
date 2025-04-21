import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user: User | null = null;

  constructor() {
    const resolvedData = this.route.snapshot.data['user'];
    if (!resolvedData || !resolvedData.user) {
      this.router.navigate(['/'], { replaceUrl: true });
      return;
    }
    this.user = resolvedData.user;
  }

  logout(): void {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
