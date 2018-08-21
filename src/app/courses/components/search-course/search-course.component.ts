import { Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent {
  searchText: string;
  term$ = new Subject<string>();

  @Output() search: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.term$.pipe(
      debounceTime(500),
      filter(value => value.length >= 3),
      distinctUntilChanged(),
      ).subscribe(value => {
        console.log(value);
        this.search.emit(value);
      });
  }

  clickSearch() {
    this.search.emit(this.searchText);
  }
}
