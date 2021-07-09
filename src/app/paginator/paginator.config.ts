import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PaginatorConfig {
    disabled = false;
    boundaryLinks = false;
    directionLinks = true;
    ellipses = true;
    maxSize = 0;
    pageSize = 10;
    rotate = false;
    size: 'sm' | 'lg';
}