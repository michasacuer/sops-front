import { Component, OnInit } from '@angular/core';
import { Scan } from '../models/scan';
import { DataService } from '../data.service';
import { ErrorService } from '../error.service';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-my-products-scans',
	templateUrl: './my-products-scans.component.html',
	styleUrls: ['./my-products-scans.component.css']
})
export class MyProductsScansComponent implements OnInit
{
	private scans: Array<Scan>;

	constructor(public dataService: DataService,
				public authService: AuthService,
				public errorService: ErrorService) {}

	ngOnInit()
	{
		this.dataService.getObjectsByUrl(Scan, `api/Scan/${this.authService.currentUserId}`)
		.subscribe(result => {
			if (result.errorMessage === null)
			{
				this.scans = result.object;
				//console.log('scans: ' + JSON.stringify(this.scans));

				this.scans.forEach(scan => {
					this.dataService.getImageByUrl(`api/ProductPicture/${scan.productId}`)
					.subscribe(res => {
						const fileReader = new FileReader();

						fileReader.addEventListener("load", (ev) => {
// console.log('image: blob data = ' + fileReader.result);
// console.log(new DataView(fileReader.result as ArrayBuffer).getInt8(100))
						scan.productPicture = fileReader.result as ArrayBuffer;
						}, false);

						fileReader.readAsDataURL(res);
					})
				});
			}
			else
			{
				this.errorService.showError(result);
			}
		})
	}

	getNormalDate(abnormalDate: string): string
	{
		return abnormalDate.substring(0, 10).split("-").join(".");
	}

	log()
	{
		console.log('scans: ' + JSON.stringify(this.scans));
	}
}
