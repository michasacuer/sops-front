import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ProfileDetails } from '../models/profile-details';
import { ErrorService } from '../error.service';
import { AuthService } from '../auth.service';
import { RolePost } from '../models/role-post';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public profiles: ProfileDetails[];

  constructor(public dataService: DataService,
    public errorService: ErrorService,
    public auth: AuthService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getObjectsByUrl(ProfileDetails, 'api/User').subscribe((response) => {
      this.errorService.showError(response);
      this.profiles = response.object;
      console.log(this.profiles[0].company);
    });
  }

  promoteUserClick(profile: ProfileDetails) {
    this.auth.userInfo.subscribe((response) => {
      if (response.errorMessage) {
        this.errorService.showError(response);
        return;
      }

      const rolePost = new RolePost();
      rolePost.userId = profile.id;
      rolePost.role = 'Employee';
      rolePost.optionalCompanyId = response.object.companyId;

      this.dataService.postObjectByUrl(rolePost, 'api/Role').subscribe((roleResponse) => {
        this.errorService.showError(roleResponse);
        this.loadData();
      });
    });
  }

}
