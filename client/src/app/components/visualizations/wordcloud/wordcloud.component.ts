import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';
import { VisualizationComponent } from 'src/app/components/visualization/visualization.component';
import * as WordCloud from 'wordcloud';

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss']
})
export class WordcloudComponent implements OnInit, AfterViewInit {

  value: any;

  @Input() list;

  obj: any;

  @ViewChild('wordCloudCanvas')
  wordCloudCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private analysisService: AnalysisService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  setValue(value: any) {
    this.value = value;
  }
  /*constructor() {
    this.list = [
      ['hello', 34],
      ['world', 18]
    ];
  }*/

  addWord(word: string) {
    let count = 0;
    if (this.obj[word]) {
      count = this.obj[word];
    }
    //console.log('Adding word ' + word);
    this.obj[word] = count + 1;
  }


  ngAfterViewInit() {
    //this.analysisService.analysis.subscribe((value) => {
      //console.log('Detected changes ' + value);

      if (this.value && this.value['complete_document']) {
        let completeDocument = this.value['complete_document'];
        if (completeDocument['notes']) {
          this.list = [];
          this.obj = {};
          for (let note of completeDocument['notes']) {
            //console.log('Note ' + JSON.stringify(note));
            let a = note.a;
            let b = note.b;

            this.addWord(a);
            this.addWord(b);
          }

          for (let key of Object.keys(this.obj)) {
            let array = [key, this.obj[key]];
            //console.log('Adding ' + JSON.stringify(array));
            this.list.push(array);
          }
          WordCloud(this.wordCloudCanvas.nativeElement, { list: this.list });
        }
        //this.text = JSON.stringify(value['complete_document']);

      } else {
        console.log("Did not detect any complete_document section");
        WordCloud(this.wordCloudCanvas.nativeElement, { list: [
          ['hello', 34],
          ['world', 18]
        ] });
      }

      this.cdr.detectChanges();
    //});
    //WordCloud(this.wordCloudCanvas.nativeElement, { list: this.list });
    console.log('Rendered word cloud');
  }



}
