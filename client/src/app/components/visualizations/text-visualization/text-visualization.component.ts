import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';
import { VisualizationComponent } from 'src/app/components/visualization/visualization.component';

@Component({
  selector: 'app-text-visualization',
  templateUrl: './text-visualization.component.html',
  styleUrls: ['./text-visualization.component.scss']
})
export class TextVisualizationComponent implements OnInit {

  value: any;
  sentences: string[];

  constructor(private analysisService: AnalysisService, private cdr: ChangeDetectorRef) { }

  setValue(value: any) {
    this.value = value;
  }
  
  ngOnInit(): void {
    this.analysisService.analysis.subscribe((value) => {
      console.log('Detected changes ' + value);

      if (value && value['complete_document']) {
        let completeDocument = value['complete_document'];
        if (completeDocument['sentences']) {
          this.sentences = [];
          for (let sentence of completeDocument['sentences']) {
            this.sentences.push(sentence);
          }
        }
        //this.text = JSON.stringify(value['complete_document']);

      } else {
        console.log("Did not detect any complete_document section");
      }

      this.cdr.detectChanges();
    });
  }

}
