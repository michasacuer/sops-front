import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { saveAs } from 'file-saver';

@Component({
	selector: 'app-qr-dialog',
	templateUrl: './qr-dialog.component.html',
	styleUrls: ['./qr-dialog.component.css']
})
export class QrDialogComponent implements OnInit 
{
	private qrImage: ArrayBuffer;

	constructor(private existingProductId: number,
				private dataService: DataService) {}

	ngOnInit() 
	{
		this.loadQrCode();
	}

	loadQrCode()
	{
		this.dataService.getImageByUrl(`api/QR/${this.existingProductId}`).subscribe(result => {
			const fileReader = new FileReader();

			fileReader.addEventListener("load", (ev) => {
				// console.log('image: blob data = ' + fileReader.result);
				// console.log(new DataView(fileReader.result as ArrayBuffer).getInt8(100))

				this.qrImage = fileReader.result as ArrayBuffer;
			}, false);

			fileReader.readAsDataURL(result);
		});
	}

	Pdf()
	{
		this.dataService.getPdfByUrl(`api/Document/${this.existingProductId}`).subscribe(result => {
			saveAs(result, 'document.pdf');
		});
	}
}
