"use strict";
var L06_Baum;
(function (L06_Baum) {
    let tree = new L06_Baum.Tree();
    let root = tree.createNode("root");
    let child1 = tree.createNode("child1");
    let child2 = tree.createNode("child2");
    let grand11 = tree.createNode("grand11");
    let grand12 = tree.createNode("grand12");
    let grand13 = tree.createNode("grand13");
    let grand21 = tree.createNode("grand21");
    let grand22 = tree.createNode("grand22");
    let grand212 = tree.createNode("grand212");
    root.appendChild(child1);
    child1.appendChild(grand11);
    child1.appendChild(grand12);
    child1.appendChild(grand13);
    child2.appendChild(grand21);
    root.appendChild(child2);
    grand21.appendChild(grand212);
    child2.appendChild(grand22);
    console.log(root.printTree());
})(L06_Baum || (L06_Baum = {}));
//# sourceMappingURL=Main.js.map