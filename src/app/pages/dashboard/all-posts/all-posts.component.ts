import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Post } from '../../../models/post.model';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  standalone: true,
  selector: 'app-all-posts',
  imports: [CommonModule, PostItemComponent],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {
  private api = inject(ApiService);
  loading = signal(true);
  posts: Post[] = [];

  constructor() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading.set(true);
    this.api.getAllPosts().subscribe({
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
