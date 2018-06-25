import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {
  searchText: string;
  @Output() search: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.searchText = '';
  }

  clickSearch() {
    this.search.emit(this.searchText);
  }

}
