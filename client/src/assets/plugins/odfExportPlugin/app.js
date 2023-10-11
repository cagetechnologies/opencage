
var odf = {
	run: function testMe() {
		console.log('This is from test me 6');
	},

	factory: function getNode() {
		function MyNode()
		{
			this.addInput("in","any");
		}

		MyNode.title = "ODF Export";
		MyNode.export = true;

		MyNode.prototype.onExecute = function() {
			console.log("Executing ODF Export");
			if (this.getInputData(0)) {
				let text = this.getInputData(0);
				console.log('Exporting is ' + text);
				this.exportService('ODF');
			}
		}

		return MyNode;
	}
}