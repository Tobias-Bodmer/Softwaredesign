namespace TextAdventure {
    export class Player extends Character {

        canTake: boolean;
        canDrop: boolean;
        canSpeak: boolean;
        canAttack: boolean;

        constructor() {
            super();
        }

        interactionMenu(): string {
            let output: string;
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
}