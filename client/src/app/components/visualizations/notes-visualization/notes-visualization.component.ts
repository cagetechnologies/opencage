import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';
import { VisualizationComponent } from 'src/app/components/visualization/visualization.component';

@Component({
  selector: 'app-notes-visualization',
  templateUrl: './notes-visualization.component.html',
  styleUrls: ['./notes-visualization.component.scss']
})
export class NotesVisualizationComponent implements OnInit {

  value: any;
  notes: string[];

  constructor(private cdr: ChangeDetectorRef) { }

  setValue(value: any) {
    this.value = value;
  }
  
  ngOnInit(): void {
    /*this.analysisService.analysis.subscribe((value) => {
      console.log('Detected changes ' + value);*/

      if (this.value && this.value['complete_document']) {
        let completeDocument = this.value['complete_document'];
        if (completeDocument['notes']) {
          this.notes = [];
          for (let note of completeDocument['notes']) {
            console.log("Found note");
            this.notes.push(note.text);
          }
        }
        //this.text = JSON.stringify(value['complete_document']);

      } else {
        console.log("Did not detect any complete_document section");
      }

      this.cdr.detectChanges();
    /*});*/
  }


}
