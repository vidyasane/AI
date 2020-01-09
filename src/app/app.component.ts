import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tableApiData: any;
  rawModalRef: any;
  rawJsonData: any;
  api = "https://hn.algolia.com/api/v1/search_by_date?tags=story";
  tableHeadings: string[] = ['title', 'url', 'created_at', 'author'];
  time = interval(10000);

  ngOnInit(): void {
    this.getAPIData();
  }

  constructor(private httpClient: HttpClient, private bsMService: BsModalService) { }

  getAPIData() {
    this.time.pipe(startWith(0), switchMap(() =>
      this.httpClient.get(this.api)))
      .subscribe(apiResponse => {
        var apiData: any = apiResponse;
        console.log(apiData, "given API Data");
        this.tableApiData = apiData.hits;
      })
  }

  showModal(Clickedrow, rowData) {
    this.rawModalRef = this.bsMService.show(Clickedrow);
    this.rawJsonData = rowData;
  }
}
