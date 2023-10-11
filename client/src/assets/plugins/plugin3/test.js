
var plugin3 = {
	run: function testMe() {
		console.log('This is from test me 6');
	},
	visualization: true,
	factory: function getNode() {
		function MyNode()
		{
			this.addInput("in","any");
		}

		MyNode.title = "Notes";
		MyNode.visualization = true;

		MyNode.prototype.onExecute = function() {
			console.log("Executing plugin3");
			if (this.getInputData(0)) {
				let text = this.getInputData(0);
				console.log('Visualizing is ' + JSON.stringify(text));
				this.visualizationService('NOTES',text);
			}
		}

		return MyNode;
	}
}