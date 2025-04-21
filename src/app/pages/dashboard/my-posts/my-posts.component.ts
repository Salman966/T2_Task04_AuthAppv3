import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Post } from '../../../models/post.model';
import { AuthService } from '../../../services/auth.service';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  standalone: true,
  selector: 'app-my-posts',
  imports: [CommonModule, PostItemComponent],
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  loading = signal(true);
  posts: Post[] = [];

  constructor() {
    this.loadUserPosts();
  }

  loadUserPosts(): void {
    this.loading.set(true);
    const user = this.auth.getUser();
    if (!user?.id) {
      this.loading.set(false);
      return;
    }

    this.api.getUserPosts(user.id).subscribe({
      next: (res) => {
        this.posts = res.posts;
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onDelete(postId: number): void {
    this.loading.set(true);
    this.api.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
