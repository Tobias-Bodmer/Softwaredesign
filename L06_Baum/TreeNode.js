"use strict";
var L06_Baum;
(function (L06_Baum) {
    class TreeNode {
        constructor(value) {
            this.value = value;
            this.parent = null;
            this.children = [];
        }
        appendChild(child) {
            this.children.push(child);
        }
        removeChild(child) {
            for (let i = 0; i < this.children.length; i++) {
                if (child === this.children[i]) {
                    this.children.splice(i, 1);
                }
            }
        }
        printTree(_depth = 0) {
            let treeAsString = this.value + "\n";
            let depthAsString = "";
            for (let i = 0; i < _depth; i++)
                depthAsString += "*";
            treeAsString = "" + depthAsString + treeAsString;
            _depth++;
            for (let i = 0; i < this.children.length; i++) {
                treeAsString += "" + this.children[i].printTree(_depth);
            }
            return treeAsString;
        }
        search() {
        }
    }
    L06_Baum.TreeNode = TreeNode;
})(L06_Baum || (L06_Baum = {}));
//# sourceMappingURL=TreeNode.js.map