export class Scan
{
	// Watched product
	isWatched: boolean;

	// Scan
	scanDate: Date;

	// Existing product
	existingProductId: number;
	existingProductExpirationDate: Date;
	existingProductCreationDate: Date;

	// Product
	productId: number;
	productName: string;
	productBarcode: string;
	productDescription: string;
	productCreationDate: Date;
	productDefaultExpirationDateInMonths: number;
	productCountryOfOrigin: string;
	productSuggestedPrice: number;

	// Company
	companyName: string;
	companyAddressStreet: string;
	companyAddressZipCode: string;
	companyAddressCity: string;
	companyEmail: string;
	companyNIP: string;
	companyREGON: string;
	companyJoinDate: Date;

	// Product picture
	productPicture: ArrayBuffer = null;
}
