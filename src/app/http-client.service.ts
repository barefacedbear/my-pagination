import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<{ userId: number, id: number, title: string }[]>('https://jsonplaceholder.typicode.com/albums');
  }
}
