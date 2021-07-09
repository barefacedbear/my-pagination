import { Component, OnInit } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClientService) {}
  page = 4;
  pageSize = 25;
  size = 0;
  jsonData: { userId: number, id: number, title: string }[] = [];

  ngOnInit() {
    this.http.getData().subscribe(response => {
      this.jsonData = response;
      this.size = this.jsonData.length;
    });
  }
}
