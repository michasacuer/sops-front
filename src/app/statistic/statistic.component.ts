import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Statistic } from '../models/statistic';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  statistic: Statistic = new Statistic();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getStatistic();
  }

  getStatistic(): void {
    this.dataService
      .getObjectByUrl(Statistic, 'api/Statistic/getallcount')
      .subscribe(result => {
        this.statistic = result.object;
      });
  }
}
