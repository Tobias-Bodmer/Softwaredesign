namespace TextAdventure {
    export class Npc extends Character {
        id: number;
        dialog: string[];
        position: number;
        neededItemToKill: number;

        constructor() {
            super();
            this.dialog = new Array();
            this.neededItemToKill = -1;
        }

        getDialog(): string {
            let output: string = "";
            let dialogIndex: string = this.position.toString();

            dialogIndex = dialogIndex.substring(dialogIndex.length - 1, dialogIndex.length);
            if (this.dialog[+dialogIndex] != undefined && this.dialog.length > 1) {
                output = this.dialog[+dialogIndex];
            } else if (this.dialog.length == 1) {
                output = this.dialog[0];
            }

            return output;
        }

        isKillable(items: Item[]): boolean {
            if (items.find(item => item.id == this.neededItemToKill) != undefined) {
                return true;
            }
            return false;
        }
    }
}