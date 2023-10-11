
var plugin2 = {
	run: function testMe() {
		console.log('This is from test me 6');
	},

	factory: function getNode() {
		function MyNode()
		{
			this.addInput("in","any");
			this.addOutput("out","any");
		}

		MyNode.title = "Word Frequency";

		MyNode.prototype.onExecute = function() {
			console.log("Executed plugin2");
			if (this.getInputData(0)) {
				let text = this.getInputData(0);
				console.log('Input data is ' + text);
				let output = text;
				this.setOutputData( 0, output );
			}
			
		}

		return MyNode;
	}
}