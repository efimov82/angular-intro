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
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.searchText = '';
  }

  search() {
    this.onSearch.emit(this.searchText);
  }

}
