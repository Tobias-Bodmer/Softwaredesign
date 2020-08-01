namespace TextAdventure {
    export abstract class Character {
        public name: string;
        public position: number;
        public inventory: Item[];

        constructor() {
            this.position = null;
            this.name = "";
            this.inventory = [];
        }

        getName(): string {
            return this.name;
        }

        getInventory(): string {
            let output: string = "";
            let vocal: string[] = ["a", "e", "i", "o", "u"];
            if (this.inventory.length > 0) {
                for (let i: number = 0; i < this.inventory.length; i++) {
                    let firstLetter: string[] = this.inventory[i].getName().toLowerCase().split("");
                    if (vocal.includes(firstLetter[0])) {
                        output += " an " + this.inventory[i].getName();
                    } else {
                        output += " a " + this.inventory[i].getName();
                    }
                    output += ", ";
                }
                return output.substring(0, (output.length - 2)) + ".";
            } else {
                return "nothing";
            }
        }
    }
}