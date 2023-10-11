import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  data = ['Line 1', 'Line 2', 'Line 3'];
  editting = -1;
  text = '';

  constructor(private analysisService: AnalysisService, private cdr: ChangeDetectorRef, private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.analysisService.analysis.subscribe((value) => {
      console.log('Detected changes ' + value);

      if (value && value['complete_document']) {
        let completeDocument = value['complete_document'];
        if (completeDocument['sentences']) {
          this.data = [];
          for (let sentence of completeDocument['sentences']) {
            this.data.push(sentence);
          }
        }
        //this.text = JSON.stringify(value['complete_document']);

      } else {
        console.log("Did not detect any complete_document section");
      }

      this.cdr.detectChanges();
    });
  }

  draggingIndex: number;

  onDragStart(fromIndex: number): void {
    this.draggingIndex = fromIndex;
  }

  onDragEnter(toIndex: number): void {
    if (this.draggingIndex !== toIndex) {
      this._reorderItem(this.draggingIndex, toIndex);
    }
  }

  onDragEnd(ev): void {
    this.draggingIndex = undefined;
    ev.preventDefault();
  }

  private _reorderItem(fromIndex: number, toIndex: number): void {
    const itemToBeReordered = this.data.splice(fromIndex, 1)[0];
    this.data.splice(toIndex, 0, itemToBeReordered);
    this.draggingIndex = toIndex;
  }

  cancelEditting(index: number) {
    this.data[index] = this.text;
    this.editting = -1;
  }

  export() {
    this.httpClient.post('/api/odf', {data: this.data}, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result: any) => {
      console.log(result);
      if (result.id) {
        window.open("/api/odf/" + result.id,'_blank');
      }
    });
  }

}
