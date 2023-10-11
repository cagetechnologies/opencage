
var plugin5 = {
	run: function testMe() {
		console.log('This is from test me 6');
	},
	export: true,
	factory: function getNode() {
		function MyNode()
		{
			this.addInput("in","any");
		}

		MyNode.title = "Export Notes";
		//MyNode.visualization = true;
		MyNode.export = true;

		MyNode.prototype.onExecute = function() {
			console.log("Executing plugin5");
			if (this.getInputData(0)) {
				let text = this.getInputData(0).text;
				console.log('Exporting is ' + text);
				this.exportService('BLAH');
			}
		}

		return MyNode;
	}
}