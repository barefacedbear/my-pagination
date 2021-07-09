import { Directive, TemplateRef } from '@angular/core';

export interface PaginatorLinkContext {
  currentPage: number;
  disabled: boolean;
}

export interface PaginatorNumberContext extends PaginatorLinkContext {
  $implicit: number;
}

export interface PaginatorPagesContext {
  $implicit: number;
  disabled: boolean;
  pages: number[];
}

@Directive({ selector: 'ng-template[paginatorEllipsis]' })
export class PaginatorEllipsis {
  constructor(public templateRef: TemplateRef<PaginatorLinkContext>) { }
}

@Directive({ selector: 'ng-template[paginatorFirst]' })
export class PaginatorFirst {
  constructor(public templateRef: TemplateRef<PaginatorLinkContext>) { }
}

@Directive({ selector: 'ng-template[paginatorLast]' })
export class PaginatorLast {
  constructor(public templateRef: TemplateRef<PaginatorLinkContext>) { }
}

@Directive({ selector: 'ng-template[paginatorNext]' })
export class PaginatorNext {
  constructor(public templateRef: TemplateRef<PaginatorLinkContext>) { }
}

@Directive({ selector: 'ng-template[paginatorNumber]' })
export class PaginatorNumber {
  constructor(public templateRef: TemplateRef<PaginatorNumberContext>) { }
}

@Directive({ selector: 'ng-template[paginatorPrevious]' })
export class PaginatorPrevious {
  constructor(public templateRef: TemplateRef<PaginatorLinkContext>) { }
}

@Directive({ selector: 'ng-template[paginatorPages]' })
export class PaginatorPages {
  constructor(public templateRef: TemplateRef<PaginatorPagesContext>) { }
}
