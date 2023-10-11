import { BuilderComponent } from "../components/visualizations/builder/builder.component";
import { FocusTransitionsVisualizationComponent } from "../components/visualizations/focus-transitions-visualization/focus-transitions-visualization.component";
import { NodeGraphVisualizationComponent } from "../components/visualizations/node-graph-visualization/node-graph-visualization.component";
import { NotesVisualizationComponent } from "../components/visualizations/notes-visualization/notes-visualization.component";
import { TextVisualizationComponent } from "../components/visualizations/text-visualization/text-visualization.component";
import { ThreedVisualizationComponent } from "../components/visualizations/threed-visualization/threed-visualization.component";
import { WordcloudComponent } from "../components/visualizations/wordcloud/wordcloud.component";

export class Visualizations {
    static visualizations = [
        { id: 'SENTENCES', name: 'Sentences', component: TextVisualizationComponent },
        { id: 'NOTES', name: 'Notes', component: NotesVisualizationComponent },
        { id: 'WORD_CLOUD', name: 'Word Cloud', component: WordcloudComponent },
        { id: 'NODE_GRAPH', name: 'Node Graph', component: NodeGraphVisualizationComponent },
        { name: 'Histogram' },
        { id: 'FLOW_CHART', name: 'Flow Chart', component: FocusTransitionsVisualizationComponent },
        { id: 'THREE_DEE', name: '3D', component: ThreedVisualizationComponent },
        { id: 'BUILDER', name: 'Builder', component: BuilderComponent }
    ]
}
