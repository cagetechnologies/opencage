
var plugin4 = {
	run: function testMe() {
		console.log('This is from test me 6');
	},

	factory: function getNode() {
		function MyNode()
		{
			this.addInput("in","any");
		}

		MyNode.title = "Word Cloud";
		MyNode.visualization = true;

		MyNode.prototype.onExecute = function() {
			console.log("Executing plugin4");
			if (this.getInputData(0)) {
				let text = this.getInputData(0);
				console.log('Visualizing is ' + text);
				this.visualizationService('WORD_CLOUD', text);
			}
		}

		return MyNode;
	}
}