import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByTitle'
})
export class SearchByTitlePipe implements PipeTransform {

  transform(Data: any, searchedTitle: any): any {
    if (!searchedTitle) {
      return Data;
    }
    else {
      searchedTitle = searchedTitle.toLowerCase();
      return Data.filter(response => response.title.toLowerCase().match(searchedTitle));
    }
  }

}
