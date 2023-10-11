export class Pipelines {
    static pipelines = [
        { id: 'SENTENCES', name: 'Sentences', analysis: 'NONE', visualization: 'SENTENCES' },
        { id: 'NOTES', name: 'Notes', analysis: 'NONE', visualization: 'NOTES' },
        { id: 'MEDIA_CENTRALITY', name: 'Media Centrality' },
        { id: 'FOCUS_TRANSITIONS', name: 'Focus Transition Flowchart', analysis: 'FOCUS_TRANSITION', visualization: 'FLOW_CHART' },
        { id: 'WORD_CLOUD', name: 'Word Cloud', analysis: 'WORD_FREQUENCY', visualization: 'WORD_CLOUD' }
    ];
}
