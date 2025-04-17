import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Post } from '../../../models/post.model';

@Component({
  standalone: true,
  selector: 'app-all-posts',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  loading = signal(true);
  postFormArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);

  constructor() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading.set(true);
    this.http.get<{ posts: Post[] }>('https://dummyjson.com/posts').subscribe({
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
