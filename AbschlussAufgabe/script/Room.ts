namespace TextAdventure {
    export class Room {
        roomId: number;
        roomName: string;
        roomDescriptions: string;
        directions: number[];
        enteredFirstTime: boolean;
        npcs: Npc[];
        items: Item[];
        event: string;

        constructor() {
            this.enteredFirstTime = true;
            this.npcs = [];
            this.items = [];
        }

        getDescription(): string {
            let output: string = this.roomName;
            if (this.roomDescriptions.length > 0) {
                output += "<br />" + this.roomDescriptions;
            }
            if (this.npcs.length > 0) {
                output += "<br />" + "You can see" + this.getNpcs();
            } else {
                output += "<br />" + "You can see no one";
            }
            if (this.items.length > 0) {
                output += "<br />" + "Also you see" + this.getItems();
            }

            console.log(output);

            return output;
        }

        getNpcs(): string {
            let output: string = "";
            let vocal: string[] = ["a", "e", "i", "o", "u"];
            for (let i: number = 0; i < this.npcs.length; i++) {
                let firstLetter: string[] = this.npcs[i].getName().toLowerCase().split("");
                if (vocal.includes(firstLetter[0])) {
                    output += " an " + this.npcs[i].getName();
                } else {
                    output += " a " + this.npcs[i].getName();
                }
                output += ", ";
            }
            return output.substring(0, (output.length - 2)) + ".";
        }

        getItems(): string {
            let output: string = "";
            let vocal: string[] = ["a", "e", "i", "o", "u"];
            for (let i: number = 0; i < this.items.length; i++) {
                let firstLetter: string[] = this.items[i].getName().toLowerCase().split("");
                if (vocal.includes(firstLetter[0])) {
                    output += " an " + this.items[i].getName();
                } else {
                    output += " a " + this.items[i].getName();
                }
                output += ", ";
            }
            return output.substring(0, (output.length - 2)) + ".";
        }
    }
}