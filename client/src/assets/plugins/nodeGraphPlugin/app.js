
var nodeGraph = {
	run: function testMe() {
		console.log('This is from test me 6');
	},
	visualization: true,
	factory: function getNode() {
		function MyNode()
		{
			this.addInput("in","any");
		}

		MyNode.title = "Node Graph";
		MyNode.visualization = true;

		MyNode.prototype.onExecute = function() {
			console.log("Executed Visualization");
			if (this.getInputData(0)) {
				let text = this.getInputData(0);
				console.log('Visualizing is ' + text);
				this.visualizationService('NODE_GRAPH', text);
			}
		}

		return MyNode;
	}
}