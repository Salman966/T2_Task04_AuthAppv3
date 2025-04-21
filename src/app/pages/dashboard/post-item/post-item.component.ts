import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {
  @Input() title!: string;
  @Input() body!: string;
  @Input() postId!: number;
  @Output() delete = new EventEmitter<number>();

  handleDelete() {
    this.delete.emit(this.postId);
  }
}