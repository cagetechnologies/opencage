import { Component, Input, OnInit } from '@angular/core';
import { UploadResult } from 'ngx-markdown-editor';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-content-editor',
  templateUrl: './content-editor.component.html',
  styleUrls: ['./content-editor.component.scss']
})
export class ContentEditorComponent implements OnInit {

  @Input() item: Item;

  content = "";
  mode = "editor";
  options = {};

  constructor() { }

  ngOnInit(): void {
    this.content = this.item.text;
  }

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    // do upload file by yourself
    return Promise.resolve([{ name: 'xxx', url: 'xxx.png', isImg: true }]);
  }

  preRenderFunc(content: string) {
    return content.replace(/something/g, 'new value'); // must return a string
  }

  postRenderFunc(content: string) {
    return content.replace(/something/g, 'new value'); // must return a string
  }

  onEditorLoaded($event) {}

  onPreviewDomChanged($event) {}

}
