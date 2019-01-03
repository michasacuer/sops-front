import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { DataService } from '../data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit
{
  news: News[] = [];
  newsDateStrings: string[] = [];

  constructor(private dataService: DataService) {  }

  ngOnInit()
  {
    this.dataService.getObjects(News).subscribe(result => {
      this.news = result.object;
    });
  }
  
  getNormalDate(abnormalDate: string): string
  {
    return abnormalDate.substring(0, 10).split("-").join(".");
  }
}
