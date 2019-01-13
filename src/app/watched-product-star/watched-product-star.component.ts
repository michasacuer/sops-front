import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Product } from '../models/product';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { WatchedProduct } from '../models/watched-product';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from '../error.service';

@Component({
	selector: 'app-watched-product-star',
	templateUrl: './watched-product-star.component.html',
	styleUrls: ['./watched-product-star.component.css']
})
export class WatchedProductStarComponent implements OnInit 
{
	@Input()
	productId: number;

	isWatched: boolean = false;

	constructor(private dataService: DataService,
				private errorService: ErrorService) {}

	ngOnInit() {}

	ngOnChanges()
	{
		// console.log('change: ' + JSON.stringify(this.product));

		if (this.productId == undefined)
		{
			this.isWatched = false;
			return;
		}

		this.dataService.getObjectByUrl(Object, `api/WatchedProduct/Check?id=${this.productId}`).subscribe(result => 
		{
			// console.log(JSON.stringify(result.object));
			if (result.errorMessage === null)
			{
				this.isWatched = (result.object as { isWatched: boolean }).isWatched;
			}
			else
			{
				this.errorService.showError(result);
			}

			// console.log('isWatched: ' + this.isWatched);
		});
	}

	onFullStarClick()
	{
		this.dataService.deleteObjectByFullUrl(`api/WatchedProduct/${this.productId}`).subscribe(result => {
			if (result.errorMessage === null)
			{
				this.isWatched = false;
			}
			else
			{
				this.errorService.showError(result);
			}
		});
	}

	onEmptyStarClick()
	{
		this.dataService.postObjectByUrl(new WatchedProduct(), `api/WatchedProduct/${this.productId}`).subscribe(result => {
			if (result.errorMessage === null)
			{
				this.isWatched = true;
			}
			else
			{
				this.errorService.showError(result);
			}
		});
	}
}
