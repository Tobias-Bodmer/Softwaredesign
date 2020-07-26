namespace TextAdventure {
    export class Item {
        public id: number;
        public name: string;
        public position: number;
        public destination: number;

        getName(): string {
            return this.name;
        }

        observer(): boolean {
            if (this.position == this.destination) {
                return true;
            }
            return false;
        }
    }
}