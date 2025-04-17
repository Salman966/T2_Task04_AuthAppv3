import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../../models/post.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-my-posts',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  loading = signal(true);
  postFormArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);

  constructor() {
    this.loadUserPosts();
  }

  loadUserPosts(): void {
    this.loading.set(true);
    const user = this.auth.getUser();

    if (!user?.id) {
      console.error('User not found');
      this.loading.set(false);
      return;
    }

    this.http.get<{ posts: Post[] }>(`https://dummyjson.com/posts/user/${user.id}`).subscribe({
      next: (res) => {
        const groups = res.posts.map((post) =>
          this.fb.group({
            id: [post.id],
            title: [post.title],
            body: [post.body]
          })
        );
        this.postFormArray.clear();
        groups.forEach((group) => this.postFormArray.push(group));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onDelete(postId: number): void {
    this.loading.set(true);
    this.http.delete(`https://dummyjson.com/posts/${postId}`).subscribe({
      next: () => {
        const index = this.postFormArray.controls.findIndex(ctrl => ctrl.value.id === postId);
        if (index !== -1) this.postFormArray.removeAt(index);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  get posts(): FormArray<FormGroup> {
    return this.postFormArray;
  }
}
