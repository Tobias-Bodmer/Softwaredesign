"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Player extends TextAdventure.Character {
        constructor() {
            super();
        }
        interactionMenu() {
            let output;
            output = "walk(w) direction, ";
            output += "look(l), ";
            output += "inventory(i), ";
            if (this.canTake) {
                output += "take(t) item, ";
            }
            if (this.canDrop) {
                output += "drop(d) item, ";
            }
            if (this.canSpeak) {
                output += "speak(s) npc, ";
            }
            if (this.canAttack) {
                output += "attack(a) npc, ";
            }
            output += "quit.";
            return output;
        }
    }
    TextAdventure.Player = Player;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Player.js.map