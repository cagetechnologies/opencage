import { LGraphNode } from "litegraph.js";

class MyNode extends LGraphNode {
    onExecute() {
        console.log('MyNode executed');
    }
}