import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Collection } from 'src/app/models/collection';
import { Set } from 'src/app/models/set';

@Component({
  selector: 'app-set-sidebar',
  templateUrl: './set-sidebar.component.html',
  styleUrls: ['./set-sidebar.component.scss']
})
export class SetSidebarComponent implements OnInit {

  @Input() collection: Collection;
  @Input() set: Set;
  @Output() closeSidebar = new EventEmitter();

  faExternalLinkAlt = faExternalLinkAlt;

  constructor() { }

  ngOnInit(): void {
  }

  closeSidebarS() {
    this.closeSidebar.emit();
  }

}
