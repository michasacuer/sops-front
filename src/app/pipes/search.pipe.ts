import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {
  transform(array: any, searchText: any): any {
    if (searchText == undefined) return array;
    return array.filter(function(name) {
      if (name.name != null)
        return name.name.toLowerCase().includes(searchText.toLowerCase());
      else
        return name.productName.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
