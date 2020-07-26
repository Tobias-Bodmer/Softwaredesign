namespace L06_Baum {
    let tree: Tree<String> = new Tree<String>();
    let root: TreeNode<String> = tree.createNode("root");
    let child1: TreeNode<String> = tree.createNode("child1");
    let child2: TreeNode<String> = tree.createNode("child2");
    let grand11: TreeNode<String> = tree.createNode("grand11");
    let grand12: TreeNode<String> = tree.createNode("grand12");
    let grand13: TreeNode<String> = tree.createNode("grand13");
    let grand21: TreeNode<String> = tree.createNode("grand21");
    let grand22: TreeNode<String> = tree.createNode("grand22");
    let grand212: TreeNode<String> = tree.createNode("grand212");
    
    root.appendChild(child1);
    child1.appendChild(grand11);
    child1.appendChild(grand12);
    child1.appendChild(grand13);
    child2.appendChild(grand21);
    root.appendChild(child2);
    grand21.appendChild(grand212);
    child2.appendChild(grand22);

    console.log(root.printTree());
}