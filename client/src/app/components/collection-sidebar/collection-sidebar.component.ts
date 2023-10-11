import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Collection } from 'src/app/models/collection';

@Component({
  selector: 'app-collection-sidebar',
  templateUrl: './collection-sidebar.component.html',
  styleUrls: ['./collection-sidebar.component.scss']
})
export class CollectionSidebarComponent implements OnInit {

  @Input() collection: Collection;
  @Output() closeSidebar = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  closeSidebar1() {
    this.closeSidebar.emit();
  }

}
