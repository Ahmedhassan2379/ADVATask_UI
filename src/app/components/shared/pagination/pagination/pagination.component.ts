import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports:[NgFor], 
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();
  totalPagesArray: number[] = [];
  constructor() { }

  ngOnInit() {
    this.fillTotalPages();
  }
  ngOnChanges(): void{
    this.fillTotalPages();
  }
  fillTotalPages(): void {
    debugger
    this.totalPagesArray = Array(Math.ceil(this.totalPages)).fill(0).map((x, i) => i + 1);
    console.log('tp',this.totalPagesArray)
  }

  goToPage(page: number) {
    debugger
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage); 
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChanged.emit(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChanged.emit(this.currentPage - 1);
    }
  }

}
