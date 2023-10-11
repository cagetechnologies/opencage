
var threeDee = {
	run: function testMe() {
		console.log('This is from test me 6');
	},
	visualization: true,
	factory: function getNode() {
		function MyNode()
		{
			this.addInput("in","any");
		}

		MyNode.title = "3D VR";
		MyNode.visualization = true;

		MyNode.prototype.onExecute = function() {
			console.log("Executing threeDeePlugin");
			if (this.getInputData(0)) {
				let text = this.getInputData(0);
				console.log('Visualizing is ' + text);
				this.visualizationService('THREE_DEE', text);
			}
		}

		return MyNode;
	}
}