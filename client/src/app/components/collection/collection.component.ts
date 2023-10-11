import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Collection } from '../../models/collection';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  @Input() collection: Collection;
  @Output() deleteCollection = new EventEmitter();

  faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

  deleteCollection1(id: string) {
    this.deleteCollection.emit(id);
  }

}
