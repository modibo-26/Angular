import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Output() pageChange = new EventEmitter<number>();

  next() {
    this.pageChange.emit(this.currentPage + 1);
  }

  
  prev() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
  
}
