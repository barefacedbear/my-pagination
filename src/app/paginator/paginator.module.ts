import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    PaginatorEllipsis,
    PaginatorFirst,
    PaginatorLast,
    PaginatorNext,
    PaginatorNumber,
    PaginatorPrevious,
    PaginatorPages
} from './paginator';
import { PaginatorComponent } from './paginator.component';
export { PaginatorConfig } from './paginator.config';

const DIRECTIVES = [
    PaginatorComponent, PaginatorEllipsis, PaginatorFirst, PaginatorLast, PaginatorNext, PaginatorNumber,
    PaginatorPrevious, PaginatorPages
];

@NgModule({ declarations: DIRECTIVES, exports: DIRECTIVES, imports: [CommonModule] })
export class PaginatorModule {
}