"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Room {
        constructor() {
            this.enteredFirstTime = true;
            this.npcs = [];
            this.items = [];
        }
        getDescription() {
            let output = this.roomName;
            if (this.roomDescriptions.length > 0) {
                output += "<br />" + this.roomDescriptions;
            }
            if (this.npcs.length > 0) {
                output += "<br />" + "You can see" + this.getNpcs();
            }
            else {
                output += "<br />" + "You can see no one";
            }
            if (this.items.length > 0) {
                output += "<br />" + "Also you see" + this.getItems();
            }
            console.log(output);
            return output;
        }
        getNpcs() {
            let output = "";
            let vocal = ["a", "e", "i", "o", "u"];
            for (let i = 0; i < this.npcs.length; i++) {
                let firstLetter = this.npcs[i].getName().toLowerCase().split("");
                if (vocal.includes(firstLetter[0])) {
                    output += " an " + this.npcs[i].getName();
                }
                else {
                    output += " a " + this.npcs[i].getName();
                }
                output += ", ";
            }
            return output.substring(0, (output.length - 2)) + ".";
        }
        getItems() {
            let output = "";
            let vocal = ["a", "e", "i", "o", "u"];
            for (let i = 0; i < this.items.length; i++) {
                let firstLetter = this.items[i].getName().toLowerCase().split("");
                if (vocal.includes(firstLetter[0])) {
                    output += " an " + this.items[i].getName();
                }
                else {
                    output += " a " + this.items[i].getName();
                }
                output += ", ";
            }
            return output.substring(0, (output.length - 2)) + ".";
        }
    }
    TextAdventure.Room = Room;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Room.js.map