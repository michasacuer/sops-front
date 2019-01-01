import { Injectable } from '@angular/core';
import { DataResponse } from './data.service';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialog: MatDialog) { }

  public showError(response: DataResponse<any>) {
    console.log(response);
    if (response.errorMessage) {
      this.dialog.open(ErrorComponent, {
        data: response
      });
    }
  }
}
