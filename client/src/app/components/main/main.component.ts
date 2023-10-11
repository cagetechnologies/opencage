import { Component, OnInit, ViewChild } from '@angular/core';
import { faCog, faFolder, faPuzzlePiece, faSearch, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { Collection } from 'src/app/models/collection';
import { CollectionsService } from 'src/app/services/collections.service';
import { PluginsService } from 'src/app/services/plugins.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  faSearch = faSearch;
  faFolder = faFolder;
  faPuzzlePiece = faPuzzlePiece;
  faCog = faCog;
  faShoePrints = faShoePrints;

  isExpanding = false;
  visibleSidebar = false;

  collections: Collection[];
  plugins: any[];

  constructor(private collectionsService: CollectionsService, private pluginsService: PluginsService) { }

  ngOnInit(): void {
    this.pluginsService.plugins.subscribe((value) => {
      this.plugins = value;
    });
    this.collectionsService.collections.subscribe((value) => {
      console.log('Detected changes');
      this.collections = value;
      console.log("Collections is now " + JSON.stringify(this.collections));
      //this.cdr.detectChanges();
    });
  }

  onSidebarMouseOver() {
    this.isExpanding = true;
  }

  onSidebarMouseOut() {
    this.isExpanding = false;
  }

  closeSidebar() {
    this.visibleSidebar = false;
  }
}
