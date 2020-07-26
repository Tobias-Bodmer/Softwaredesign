namespace L06_Baum {
    export class TreeNode<T> {
        public value: T;
        public parent: TreeNode<T>;
        public children: TreeNode<T>[];

        constructor(value: T) {
            this.value = value;
            this.parent = null;
            this.children = [];
        }

        public appendChild(child: TreeNode<T>): void {
            this.children.push(child);
        }

        public removeChild(child: TreeNode<T>): void {
            for (let i: number = 0; i < this.children.length; i++) {
                if (child === this.children[i]) {
                    this.children.splice(i, 1);
                }
            }
        }

        public printTree(_depth: number = 0): string {
            let treeAsString: string = this.value + "\n";
            let depthAsString: string = "";

            for (let i: number = 0; i < _depth; i++)
                depthAsString += "*";

            treeAsString = "" + depthAsString + treeAsString;
            _depth++;

            for (let i: number = 0; i < this.children.length; i++) {
                treeAsString += "" + this.children[i].printTree(_depth);
            }

            return treeAsString;
        }

        public search() {

        }
    }
}