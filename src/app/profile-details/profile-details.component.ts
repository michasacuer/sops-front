import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProfileDetails } from '../models/profile-details';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  public submitEmitter = new EventEmitter();
  profileDetails: ProfileDetails = new ProfileDetails();
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getProfileDetails();
  }

  getProfileDetails(): void {
    this.dataService
      .getObjectByUrl(ProfileDetails, 'api/User/Current')
      .subscribe(result => {
        console.log(result);
        this.profileDetails = result.object;
      });
  }
}
