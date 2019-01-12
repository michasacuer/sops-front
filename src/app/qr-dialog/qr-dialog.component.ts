import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { saveAs } from 'file-saver';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-qr-dialog',
	templateUrl: './qr-dialog.component.html',
	styleUrls: ['./qr-dialog.component.css']
})
export class QrDialogComponent implements OnInit 
{
	private qrImage: ArrayBuffer;
	private existingProductId: number;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any,
				public dialogRef: MatDialogRef<QrDialogComponent>,
				public dataService: DataService) {}

	ngOnInit() 
	{
		this.existingProductId = this.data.existingProductId;
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
}
