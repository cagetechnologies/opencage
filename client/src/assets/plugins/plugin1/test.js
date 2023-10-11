
var plugin1 = {
	run: function testMe() {
		console.log('This is from test me 6');
	},
	source: true,

	factory: function getNode() {
		function MyNode()
		{
			this.addOutput("out","any");
		}

		MyNode.title = "Source";
		MyNode.source = true;

		MyNode.output = { text: 'Hello World' };

		MyNode.prototype.onExecute = function() {
			console.log("Executing plugin1");
			//let output = { text: 'Hello World'};
			//let output = this.output;
			let output = this.sourceService();
			this.setOutputData( 0, output );
		}

		return MyNode;
	}
}