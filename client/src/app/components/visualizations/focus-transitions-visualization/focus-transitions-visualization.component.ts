import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';
import { Centrality } from 'src/app/models/centrality';
import { VisualizationComponent } from 'src/app/components/visualization/visualization.component';

@Component({
  selector: 'app-focus-transitions-visualization',
  templateUrl: './focus-transitions-visualization.component.html',
  styleUrls: ['./focus-transitions-visualization.component.scss']
})
export class FocusTransitionsVisualizationComponent implements OnInit {

  value: any;
  analysis: string;

  nodes = [];
  links = [];
  clusters = [];

  constructor(private analysisService: AnalysisService, private cdr: ChangeDetectorRef) { }

  setValue(value: any) {
    this.value = value;
  }
  
  ngOnInit(): void {
    this.analysisService.analysis.subscribe((value) => {
      console.log('Detected changes ' + value);

      this.nodes = [
        { id: '1', label: 'Shackleton' },
        { id: '2', label: 'exploration' },
        { id: '3', label: 'Antarctic' },
        { id: '4', label: 'South Pole' },
        { id: '5', label: 'expedition' },
        { id: '6', label: 'disaster' },
      ]

      this.links = [
        { id: 'a', source: '1', target: '2', label: 'led' },
        { id: 'b', source: '2', target: '3', label: 'to' },
        { id: 'c', source: '2', target: '4', label: 'to' },
        { id: 'd', source: '2', target: '5' },
        { id: 'e', source: '5', target: '6' }
      ]

      this.clusters = [
        { id: 'c0', label: 'Focus 1', childNodeIds: ['1', '2', '3', '4'] },
        { id: 'c1', label: 'Focus 2', childNodeIds: ['5', '6'] }
      ]

      /*if (value && value['complete_document']) {
        let notes = value['complete_document']['notes'];

        let centrality = new Centrality();
        //this.analysis = "";
        for (let note of notes) {
          let a = note.a;
          let b = note.b;
          centrality.addWordPair(a, b);
          //this.analysis += "" + a + "-" + b;
        }
        let linkId = 1;
        console.log("processing word pairs");
        for (let word of centrality.relationships.keys()) {
          console.log('word is ' + word);
          let wordRelationship = centrality.relationships.get(word);
          this.nodes.push({ id: word, label: word });
          console.log("Added node " + word);
          for (let link of wordRelationship.relationships) {
            this.links.push({ id: "" + linkId, source: word, target: link, label: "" + linkId });
            linkId += 1;
            console.log("Added link " + word + " to " + link);
          }
        }

      } else {
        console.log("Did not detect any complete_document section");
      }*/

      this.cdr.detectChanges();
    });

    //this.analysisService.getAnalysis();
  }

}
