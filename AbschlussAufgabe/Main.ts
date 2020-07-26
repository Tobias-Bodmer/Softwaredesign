namespace TextAdventure {
    const output: HTMLDivElement = document.getElementById("output") as HTMLDivElement;
    const input: HTMLInputElement = document.getElementById("text") as HTMLInputElement;

    //let flag: boolean = false;
    //input.addEventListener("keypress", (e: KeyboardEvent) => {if (e.key === "Enter") { flag = true; } }, false);

    function getEventListenter(): Promise<string> {
        input.focus();
        return new Promise(function (resolve: (value: string) => void): void {
            const keydownEvent: EventListener = (event: Event) => {
                if ((event as KeyboardEvent).key === "Enter") {
                    const value: string = input.value;
                    input.value = "";
                    input.removeEventListener("keydown", keydownEvent);
                    resolve(value);
                }
            };
            input.addEventListener("keydown", keydownEvent);
        });
    }

    let items: Item[] = [];
    let npcs: Npc[] = [];
    let rooms: Room[] = [];
    let player: Player = new Player();
    player.position = 1001;
    let menu: string = "Script loaded <br/> Make your choice: start, load, quit";

    main();

    async function main(): Promise<void> {
        output.innerHTML = menu;

        let b: string = await getEventListenter();

        switch (b.toLowerCase().split("")[0]) {
            case "s":
                startGame();
                break;
            case "l":
                //load();
                break;
            case "q":
                //quit();
                break;
            default:
                main();
                break;
        }
    }

    async function startGame(): Promise<void> {
        output.innerHTML = "<p></br></p>";
        await load("./jason/Game.json");

        while (true) {
            await playerControl();
        }
    }

    async function load(_filename: string): Promise<void> {
        console.log(_filename);

        let response: Response = await fetch(_filename);
        let text: string = await response.text();
        let json: Object = JSON.parse(text);

        console.log(json);

        convert(json);
        assign();
    }

    function convert(element: Object): void {
        for (let key in element) {
            if (key == "rooms") {
                let resArray: Room[] = new Array();
                for (let room of element.rooms) {
                    let room1: Room = new Room();
                    room1.roomId = room.roomId;
                    room1.roomName = room.roomName;
                    room1.roomDescriptions = room.roomDescriptions;
                    room1.directions = room.directions;
                    room1.event = room.event;
                    console.dir(room1);
                    resArray.push(room1);
                }
                rooms = resArray;
            }
            if (key == "items") {
                let resArray: Item[] = new Array();
                for (let item of element.items) {
                    let item1: Item = new Item();
                    item1.id = item.id;
                    item1.name = item.name;
                    item1.position = item.position;
                    item1.destination = item.destination;
                    console.dir(item1);
                    resArray.push(item1);
                }
                items = resArray;
            }
            if (key == "npcs") {
                let resArray: Npc[] = new Array();
                for (let npc of element.npcs) {
                    let npc1: Npc = new Npc();
                    npc1.id = npc.id;
                    npc1.name = npc.name;
                    npc1.dialog = npc.dialog;
                    npc1.position = npc.position;
                    if (npc.neededItemToKill != undefined) {
                        npc1.neededItemToKill = npc.neededItemToKill;
                    } else {
                        npc1.neededItemToKill = -1;
                    }
                    console.dir(npc1);
                    resArray.push(npc1);
                }
                npcs = resArray;
            }
        }
    }

    function assign(): void {
        for (let npc of npcs) {
            if (npc.position > 1000 && npc.position < 2000) {
                rooms.find(room => room.roomId == npc.position).npcs.push(npc);
            }
        }
        for (let item of items) {
            if (item.position > 1000 && item.position < 2000) {
                rooms.find(room => room.roomId == item.position).items.push(item);
            } else if (item.position > 2000 && item.position < 3000) {
                npcs.find(npc => npc.id == item.position).inventory.push(item);
            } else if (item.position == -1) {
                player.inventory.push(item);
            }
        }
    }

    async function playerControl(): Promise<void> {
        let userChoice: string;

        whatIsTrue();

        if (rooms.find(room => room.roomId == player.position).enteredFirstTime) {
            output.innerHTML += look();
            rooms.find(room => room.roomId == player.position).enteredFirstTime = false;
        }

        output.innerHTML += "<p>" + player.interactionMenu() + "</p>";
        userChoice = await getEventListenter();

        switch (userChoice.toLowerCase().split("")[0]) {
            case "w":
            case "walk":
                output.innerHTML = walk(userChoice.split(" ")[1]);
                break;
            case "d":
            case "drop":
                output.innerHTML = dropItem(userChoice.split(" ")[1]);
                break;
            case "t":
            case "take":
                output.innerHTML = take(userChoice.split(" ")[1]);
                break;
            case "l":
            case "look":
                output.innerHTML = "<p>You look around.</p>" + look();
                break;
            case "a":
            case "attack":
                output.innerHTML = attack(userChoice.split(" ")[1]);
                break;
            case "s":
            case "speak":
                output.innerHTML = talk(userChoice.split(" ")[1]);
                break;
            case "i":
            case "inventory":
                output.innerHTML = "<p>Inventory:</p>" + player.getInventory();
                break;
            case "q":
            case "quit":
                quit();
                break;
            default:
                break;
        }
    }

    function whatIsTrue(): void {
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        if (playerRoom.items.length > 0) {
            player.canTake = true;
        } else {
            player.canTake = false;
        }
        if (playerRoom.npcs.length > 0) {
            player.canSpeak = true;
        } else {
            player.canSpeak = false;
        }
        if (playerRoom.npcs.length > 0) {
            player.canAttack = true;
        } else {
            player.canAttack = false;
        }
        if (player.inventory.length > 0) {
            player.canDrop = true;
        } else {
            player.canDrop = false;
        }
    }

    function talk(npcName: string): string {
        let output: string;
        let npc: Npc = npcs.find(npc => npc.name.toLowerCase() == npcName.toLowerCase());
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        if (playerRoom.npcs.find(npc => npc == npc) != undefined) { 
            if (npc.getDialog().length > 0) {
                output = npc.getDialog();
            } else {
                output = "...";
            }
        } else {
            output = "You can't do this right now.";
        }
        return output;
    }

    function take(itemName: string): string {
        let output: string;
        let vocal: string[] = ["a", "e", "i", "o", "u"];
        let itemId: number = items.find(item => item.name.toLowerCase() == itemName.toLowerCase()).id;
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        if (playerRoom.items.find(item => item.id == itemId) != undefined) {
            let getItem: Item = playerRoom.items.find(item => item.id == itemId);
            player.inventory.push(getItem);
            playerRoom.items = playerRoom.items.filter(item => item.id !== itemId);
            let firstLetter: string[] = itemName.toLowerCase().split("");
            if (vocal.includes(firstLetter[0])) {
                output = "You took an " + getItem.name + ".";
            } else {
                output = "You took a " + getItem.name + ".";
            }
            getItem.position = -1;
        } else {
            output = "You can't do this right now.";
        }
        return output;
    }

    function dropItem(itemName: string): string {
        let output: string;
        let itemId: number = items.find(item => item.name.toLowerCase() == itemName.toLowerCase()).id;
        console.log(itemId);
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        if (player.inventory.find(item => item.id == itemId) != undefined) {
            let getItem: Item = player.inventory.find(item => item.id == itemId); playerRoom.items.find(item => item.id == itemId);
            playerRoom.items.push(getItem);
            player.inventory = player.inventory.filter(item => item.id != itemId);
            getItem.position = playerRoom.roomId;
            output = "You droped " + getItem.name + ".";
            if (getItem.observer()) {
                if (items.filter(item => item.destination == getItem.destination).length <= 1) {
                    output += "</br>" + itemEventHandler();
                } else {
                    let observerCalls: Item[] = items.filter(item => item.destination == getItem.destination);
                    observerCalls = observerCalls.filter(item => item.id != getItem.id);
                    let areAllTrue: boolean[] = []; 
                    for (let element of observerCalls) {
                        areAllTrue.push(element.observer()); 
                    }
                    console.log(areAllTrue.filter(element => element == false).length < 1);
                    console.log(areAllTrue.find(element => element == false));
                    if (areAllTrue.filter(element => element == false).length < 1) {
                        output += "</br>" + itemEventHandler();
                    }
                }
            }
        } else {
            output = "You can't do this right now.";
        }
        return output;
    }
    
    function look(): string {
        return rooms.find(room => room.roomId == player.position).getDescription();
    }

    function walk(direction: string): string {
        let output: string = "<p>You can't walk this way.</p>";
        rooms.find(room => room.roomId == player.position).enteredFirstTime = true;
        switch (direction.toLowerCase().split("")[0]) {
            case "n":
            case "north":
                if (rooms.find(room => room.roomId == player.position).directions[0] > 0) {
                    player.position = rooms.find(room => room.roomId == rooms.find(room => room.roomId == player.position).directions[0]).roomId;
                    gohstWalk();
                    output = "<p>You walked in the north.</p>";
                }
                break;
            case "e":
            case "east":
                if (rooms.find(room => room.roomId == player.position).directions[1] > 0) {
                    player.position = rooms.find(room => room.roomId == rooms.find(room => room.roomId == player.position).directions[1]).roomId;
                    gohstWalk();
                    output = "<p>You walked in the east.</p>";
                }
                break;
            case "s":
            case "south":
                if (rooms.find(room => room.roomId == player.position).directions[2] > 0) {
                    player.position = rooms.find(room => room.roomId == rooms.find(room => room.roomId == player.position).directions[2]).roomId;
                    gohstWalk();
                    output = "<p>You walked in the south.</p>";
                }
                break;
            case "w":
            case "west":
                if (rooms.find(room => room.roomId == player.position).directions[3] > 0) {
                    player.position = rooms.find(room => room.roomId == rooms.find(room => room.roomId == player.position).directions[3]).roomId;
                    gohstWalk();
                    output = "<p>You walked in the west.</p>";
                }
                break;
            default:
                break;
        }
        return output;
    }

    function gohstWalk(): void{
        let gohst: Npc = npcs.find(npc => npc.id == 2002);
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        let gohstRoom: Room = rooms.find(room => room.roomId == gohst.position);
        gohstRoom.npcs = gohstRoom.npcs.filter(npc => npc != gohst);
        playerRoom.npcs.push(gohst);
        gohst.position = playerRoom.roomId;
    }

    function attack(npcName: string): string {
        let output: string;
        let npc: Npc = npcs.find(npc => npc.name.toLowerCase() == npcName.toLowerCase());
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        if (playerRoom.npcs.find(thisNpc => thisNpc == npc)) {
            if (npc.isKillable(player.inventory)) {
                let items: string = npc.getInventory();
                Array.prototype.push.apply(player.inventory, npc.inventory);
                npc.inventory = [];
                npc.id = -1;
                output = "You strok him down and found" + items;
            } else {
                output = "You can't win this fight. Maybe you need an item.";
            }
        } else {
            output = "You can't do this right now!"; 
        }
        return output;
    }

    function quit(): void {
        //save();
        main();
    }

    function itemEventHandler(): string {
        let output: string = "";
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        switch (playerRoom.event) {
            case "sword":
                player.inventory.push(items.find(item => item.id == 3002));
                output = "The well works and there is something in the bucket.</br>It's a Sword";
                break;
            case "win":
                output = "The key works for the " + playerRoom.roomName + ".</br>You won!";
                break;
            default:
                break;
        }
        return output;
    } 
}        