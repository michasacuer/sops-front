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

	constructor(@Inject(MAT_DIALOG_DATA) data,
				private dialogRef: MatDialogRef<QrDialogComponent>,
				private existingProductId: number,
				private dataService: DataService) 
	{
		this.existingProductId = (data as { existingProductId: number }).existingProductId;
	}

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
}
