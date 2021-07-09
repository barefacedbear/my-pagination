import { Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatorEllipsis, PaginatorFirst, PaginatorLast, PaginatorNext, PaginatorNumber, PaginatorPrevious, PaginatorPages } from './paginator';
import { PaginatorConfig } from './paginator.config';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnChanges {
  
  pageCount = 0;
  pages: number[] = [];

  @ContentChild(PaginatorEllipsis, { static: false }) tplEllipsis: PaginatorEllipsis;
  @ContentChild(PaginatorFirst, { static: false }) tplFirst: PaginatorFirst;
  @ContentChild(PaginatorLast, { static: false }) tplLast: PaginatorLast;
  @ContentChild(PaginatorNext, { static: false }) tplNext: PaginatorNext;
  @ContentChild(PaginatorNumber, { static: false }) tplNumber: PaginatorNumber;
  @ContentChild(PaginatorPrevious, { static: false }) tplPrevious: PaginatorPrevious;
  @ContentChild(PaginatorPages, { static: false }) tplPages: PaginatorPages;
  
   @Input() disabled: boolean;
   @Input() boundaryLinks: boolean;
   @Input() directionLinks: boolean;
   @Input() ellipses: boolean;
   @Input() rotate: boolean;
   @Input() collectionSize: number;
   @Input() maxSize: number;
   @Input() page = 1;
   @Input() pageSize: number;
   @Output() pageChange = new EventEmitter<number>(true);
   @Input() size: 'sm' | 'lg';
 
   constructor(config: PaginatorConfig) {
     this.disabled = config.disabled;
     this.boundaryLinks = config.boundaryLinks;
     this.directionLinks = config.directionLinks;
     this.ellipses = config.ellipses;
     this.maxSize = config.maxSize;
     this.pageSize = config.pageSize;
     this.rotate = config.rotate;
     this.size = config.size;
   }
 
   hasPrevious(): boolean { return this.page > 1; }
 
   hasNext(): boolean { return this.page < this.pageCount; }
 
   nextDisabled(): boolean { return !this.hasNext() || this.disabled; }
 
   previousDisabled(): boolean { return !this.hasPrevious() || this.disabled; }
 
   selectPage(pageNumber: number): void { this._updatePages(pageNumber); }
 
   ngOnChanges(changes: SimpleChanges): void { this._updatePages(this.page); }
 
   isEllipsis(pageNumber): boolean { return pageNumber === -1; }
 
   private _applyEllipses(start: number, end: number) {
     if (this.ellipses) {
       if (start > 0) {
         if (start > 2) {
           this.pages.unshift(-1);
         } else if (start === 2) {
           this.pages.unshift(2);
         }
         this.pages.unshift(1);
       }
       if (end < this.pageCount) {
         if (end < (this.pageCount - 2)) {
           this.pages.push(-1);
         } else if (end === (this.pageCount - 2)) {
           this.pages.push(this.pageCount - 1);
         }
         this.pages.push(this.pageCount);
       }
     }
   }

   private _applyRotation(): [number, number] {
     let start = 0;
     let end = this.pageCount;
     let leftOffset = Math.floor(this.maxSize / 2);
     let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
     if (this.page <= leftOffset) {
       end = this.maxSize;
     } else if (this.pageCount - this.page < leftOffset) {
       start = this.pageCount - this.maxSize;
     } else {
       start = this.page - leftOffset - 1;
       end = this.page + rightOffset;
     }
     return [start, end];
   }

   private _applyPagination(): [number, number] {
     let page = Math.ceil(this.page / this.maxSize) - 1;
     let start = page * this.maxSize;
     let end = start + this.maxSize; 
     return [start, end];
   }
 
   private _setPageInRange(newPageNo) {
     const prevPageNo = this.page;
     this.page = this.getValueInRange(newPageNo, this.pageCount, 1);
     if (this.page !== prevPageNo && this.isNumber(this.collectionSize)) {
       this.pageChange.emit(this.page);
     }
   }
 
   private _updatePages(newPage: number) {
     this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
     if (!this.isNumber(this.pageCount)) {
       this.pageCount = 0;
     }
     this.pages.length = 0;
     for (let i = 1; i <= this.pageCount; i++) {
       this.pages.push(i);
     }
     this._setPageInRange(newPage);
     if (this.maxSize > 0 && this.pageCount > this.maxSize) {
       let start = 0;
       let end = this.pageCount;
       if (this.rotate) {
         [start, end] = this._applyRotation();
       } else {
         [start, end] = this._applyPagination();
       }
       this.pages = this.pages.slice(start, end);
       this._applyEllipses(start, end);
     }
   }

   getValueInRange(value: number, max: number, min = 0): number {
    return Math.max(Math.min(value, max), min);
  }

  isNumber(value: any): value is number {
    return !isNaN(parseInt(`${value}`, 10));
  }
}
