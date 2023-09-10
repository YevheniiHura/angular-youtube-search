import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})

export class SearchInputComponent {

  @ViewChild('input', { static: false }) inputElement!: ElementRef;
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  search() {
    const inputValue = this.inputElement.nativeElement.value;
    this.searchQuery.emit(inputValue);
  }

  onEnter() {
    this.search();
  }
}