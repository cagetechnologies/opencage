import { Component, Input, OnInit } from '@angular/core';
import { faAngleDown, faAngleRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { AnalysisService } from '../../services/analysis.service';
import { Item } from '../../models/item';
import { Set } from '../../models/set';
import { Collection } from 'src/app/models/collection';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;
  @Input() set: Set;
  @Input() collection: Collection;

  open = false;
  faAngleRight = faAngleRight;
  faAngleDown = faAngleDown;
  faExternalLinkAlt = faExternalLinkAlt;

  constructor(private analysisService: AnalysisService) { }

  ngOnInit(): void {
  }

  openFile() {
    this.analysisService.getAnalysis(JSON.parse(this.item.processed));
  }

}
