import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';
import { Centrality } from 'src/app/models/centrality';
import { VisualizationComponent } from 'src/app/components/visualization/visualization.component';

@Component({
  selector: 'app-node-graph-visualization',
  templateUrl: './node-graph-visualization.component.html',
  styleUrls: ['./node-graph-visualization.component.scss']
})
export class NodeGraphVisualizationComponent implements OnInit {

  value: any;
  analysis: string;

  nodes = [];
  links = [];

  constructor(private analysisService: AnalysisService, private cdr: ChangeDetectorRef) { }

  setValue(value: any) {
    this.value = value;
  }
  
  ngOnInit(): void {
    this.analysisService.analysis.subscribe((value) => {
      console.log('Detected changes ' + value);

      if (value && value['complete_document']) {
        let notes = value['complete_document']['notes'];

        let centrality = new Centrality();
        //this.analysis = "";
        for (let note of notes) {
          let a;
          if (note.a) {
            a = note.a;
          } else {
            a = note.nIn;
          }
          let b;
          if (note.b) {
            b = note.b;
          } else {
            b = note.nOut;
          }
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
      }

      this.cdr.detectChanges();
    });

    //this.analysisService.getAnalysis();
  }
}
