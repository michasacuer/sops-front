import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Statistic } from "../models/statistic";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  statistic: Statistic = new Statistic();
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getStatistic();
  }

  getStatistic(): void {
    this.dataService
      .getObjectByUrl(Statistic, "api/Statistic/getallcount")
      .subscribe(statistic => {
        this.statistic = statistic;
      });
  }
}
