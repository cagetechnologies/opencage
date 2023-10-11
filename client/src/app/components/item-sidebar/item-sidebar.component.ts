import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Collection } from 'src/app/models/collection';
import { Set } from 'src/app/models/set';
import { Item } from 'src/app/models/item';
import { faAngleDown, faAngleRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-sidebar',
  templateUrl: './item-sidebar.component.html',
  styleUrls: ['./item-sidebar.component.scss']
})
export class ItemSidebarComponent implements OnInit {

  @Input() collection: Collection;
  @Input() set: Set;
  @Input() item: Item;
  @Output() closeSidebar = new EventEmitter();

  open = false;
  faAngleRight = faAngleRight;
  faAngleDown = faAngleDown;
  faExternalLinkAlt = faExternalLinkAlt;

  constructor() { }

  ngOnInit(): void {
  }

  closeSidebarI() {
    this.closeSidebar.emit();
  }

}
