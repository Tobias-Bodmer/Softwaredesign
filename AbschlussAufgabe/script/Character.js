"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Character {
        constructor() {
            this.position = null;
            this.name = "";
            this.inventory = [];
        }
        getName() {
            return this.name;
        }
        getInventory() {
            let output = "";
            let vocal = ["a", "e", "i", "o", "u"];
            if (this.inventory.length > 0) {
                for (let i = 0; i < this.inventory.length; i++) {
                    let firstLetter = this.inventory[i].getName().toLowerCase().split("");
                    if (vocal.includes(firstLetter[0])) {
                        output += " an " + this.inventory[i].getName();
                    }
                    else {
                        output += " a " + this.inventory[i].getName();
                    }
                    output += ", ";
                }
                return output.substring(0, (output.length - 2)) + ".";
            }
            else {
                return "There is nothing.";
            }
        }
    }
    TextAdventure.Character = Character;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Character.js.map