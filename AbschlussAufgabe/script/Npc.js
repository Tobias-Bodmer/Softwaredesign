"use strict";
var TextAdventure;
(function (TextAdventure) {
    class Npc extends TextAdventure.Character {
        constructor() {
            super();
            this.dialog = new Array();
            this.neededItemToKill = -1;
        }
        getDialog() {
            let output = "";
            let dialogIndex = this.position.toString();
            dialogIndex = dialogIndex.substring(dialogIndex.length - 1, dialogIndex.length);
            if (this.dialog[+dialogIndex] != undefined && this.dialog.length > 1) {
                output = this.dialog[+dialogIndex];
            }
            else if (this.dialog.length == 1) {
                output = this.dialog[0];
            }
            return output;
        }
        isKillable(items) {
            if (items.find(item => item.id == this.neededItemToKill) != undefined) {
                return true;
            }
            return false;
        }
    }
    TextAdventure.Npc = Npc;
})(TextAdventure || (TextAdventure = {}));
//# sourceMappingURL=Npc.js.map