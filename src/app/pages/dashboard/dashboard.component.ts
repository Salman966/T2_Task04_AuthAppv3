import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router'; 
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { ResolvedDashboardData } from '../../resolvers/user.resolver';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  user: User | null = null;
  allPosts: Post[] = [];
  userPosts: Post[] = [];

  loading = signal(true);

  tabForm: FormGroup = this.fb.group({
    selectedTab: ['all']
  });

  get selectedTab(): 'all' | 'mine' {
    return this.tabForm.get('selectedTab')?.value;
  }

  constructor() {
    const resolvedData = this.route.snapshot.data['user'] as ResolvedDashboardData;
    if (!resolvedData || !resolvedData.user) {
      this.router.navigate(['/'], { replaceUrl: true });
      return;
    }

    this.user = resolvedData.user;
    this.fetchPosts();

    this.tabForm.get('selectedTab')?.valueChanges.subscribe(() => {
      this.loading.set(true);
      setTimeout(() => this.loading.set(false), 300);
    });
  }

  fetchPosts() {
    this.loading.set(true);

    this.http.get<{ posts: Post[] }>('https://dummyjson.com/posts').subscribe({
      next: (res) => {
        this.allPosts = res.posts;

        this.http
          .get<{ posts: Post[] }>(`https://dummyjson.com/posts/user/${this.user?.id}`)
          .subscribe({
            next: (userRes) => {
              this.userPosts = userRes.posts;
              this.loading.set(false);
            },
            error: () => this.loading.set(false),
          });
      },
      error: () => this.loading.set(false),
    });
  }

  deletePost(postId: number): void {
    this.loading.set(true);

    this.http.delete(`https://dummyjson.com/posts/${postId}`).subscribe({
      next: () => {
        this.allPosts = this.allPosts.filter((p) => p.id !== postId);
        this.userPosts = this.userPosts.filter((p) => p.id !== postId);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  logout(): void {
    localStorage.removeItem('authUser');
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
