
var notes = {
	run: function testMe() {
		console.log('This is from test me 6');
	},

	factory: function getNode() {
		function MyNode()
		{
			this.addInput("in","any");
		}

		MyNode.title = "Notes";
		MyNode.visualization = true;

		MyNode.prototype.onExecute = function() {
			console.log("Executed Visualization");
			if (this.getInputData(0)) {
				let text = this.getInputData(0);
				console.log('Visualizing is ' + text);
				this.visualizationService('NOTES', text);
			}
		}

		return MyNode;
	}
}