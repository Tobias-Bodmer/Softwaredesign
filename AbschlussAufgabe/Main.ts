namespace TextAdventure {
    const output: HTMLDivElement = document.getElementById("output") as HTMLDivElement;
    const input: HTMLInputElement = document.getElementById("text") as HTMLInputElement;
    const newGameFile: string = "./jason/NewGame.json";

    let items: Item[];
    let npcs: Npc[];
    let rooms: Room[];
    let player: Player;
    let quitFlag: boolean;
    let startMenu: string;

    main();

    function iniVariables(): void {
        items = [];
        npcs = [];
        rooms = [];
        player = new Player();
        player.position = 1001;
        quitFlag = false;
        startMenu = "Script loaded <br/> Make your choice: start, load, quit";
    }

    async function main(): Promise<void> {
        iniVariables();
        output.innerHTML = "";
        output.innerHTML = startMenu;

        let userChoice: string = await getUserInput();

        switch (userChoice.toLowerCase().split("")[0]) {
            case "s":
                startGame();
                break;
            case "l":
                loadGame();
                break;
            case "q":
                window.close();
                break;
            default:
                main();
                break;
        }
    }

    async function startGame(): Promise<void> {
        output.innerHTML = "<p></br></p>";
        await load(newGameFile);

        while (true) {
            await playerControl();

            //If player want to quit the flag is true and break the loop.
            if (quitFlag) {
                quitFlag = false;
                break;
            }
        }
    }

    async function load(_filename: string): Promise<void> {
        let response: Response = await fetch(_filename);
        let text: string = await response.text();
        let json: Object = JSON.parse(text);

        convert(json);
        assign();
    }

    function convert(_element: Object): void {
        for (let key in _element) {
            if (key == "rooms") {
                let resArray: Room[] = new Array();
                for (let room of _element.rooms) {
                    let newRoom: Room = new Room();
                    newRoom.roomId = room.roomId;
                    newRoom.roomName = room.roomName;
                    newRoom.roomDescriptions = room.roomDescriptions;
                    newRoom.directions = room.directions;
                    newRoom.event = room.event;
                    console.dir(newRoom);
                    resArray.push(newRoom);
                }
                rooms = resArray;
            }
            if (key == "items") {
                let resArray: Item[] = new Array();
                for (let item of _element.items) {
                    let newItem: Item = new Item();
                    newItem.id = item.id;
                    newItem.name = item.name;
                    newItem.position = item.position;
                    newItem.destination = item.destination;
                    console.dir(newItem);
                    resArray.push(newItem);
                }
                items = resArray;
            }
            if (key == "npcs") {
                let resArray: Npc[] = new Array();
                for (let npc of _element.npcs) {
                    let newNpc: Npc = new Npc();
                    newNpc.id = npc.id;
                    newNpc.name = npc.name;
                    newNpc.dialog = npc.dialog;
                    newNpc.position = npc.position;
                    if (npc.neededItemToKill != undefined) {
                        newNpc.neededItemToKill = npc.neededItemToKill;
                    } else {
                        newNpc.neededItemToKill = -1;
                    }
                    console.dir(newNpc);
                    resArray.push(newNpc);
                }
                npcs = resArray;
            }
        }
    }

    function assign(): void {
        let roomMaxId: number = 2000;
        let roomMinId: number = 1000;
        let npcMaxId: number = 3000;
        let npcMinId: number = 2000;
        let playerInvId: number = -1;

        for (let npc of npcs) {
            if (npc.position > roomMinId && npc.position < roomMaxId) {
                rooms.find(room => room.roomId == npc.position).npcs.push(npc);
            }
        }

        for (let item of items) {
            if (item.position > roomMinId && item.position < roomMaxId) {
                rooms.find(room => room.roomId == item.position).items.push(item);
            } else if (item.position > npcMinId && item.position < npcMaxId) {
                npcs.find(npc => npc.id == item.position).inventory.push(item);
            } else if (item.position == playerInvId) {
                player.inventory.push(item);
            }
        }
    }

    async function playerControl(): Promise<void> {
        whatUserCanDo();

        if (rooms.find(room => room.roomId == player.position).entered) {
            output.innerHTML += look();
            rooms.find(room => room.roomId == player.position).entered = false;
        }

        output.innerHTML += "<p>" + player.interactionMenu() + "</p>";
        
        let userInput: string = await getUserInput();
        let userCommand: string = userInput.split(" ")[0];
        let userSelection: string = userInput.split(" ")[1];

        switch (userCommand) {
            case "w":
            case "walk":
                output.innerHTML = walk(userSelection);
                break;
            case "d":
            case "drop":
                output.innerHTML = dropItem(userSelection);
                break;
            case "t":
            case "take":
                output.innerHTML = take(userSelection);
                break;
            case "l":
            case "look":
                output.innerHTML = "<p>You look around.</p>" + look();
                break;
            case "a":
            case "attack":
                output.innerHTML = attack(userSelection);
                break;
            case "s":
            case "speak":
                output.innerHTML = talk(userSelection);
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

    function getUserInput(): Promise<string> {
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

    function whatUserCanDo(): void {
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

    function look(): string {
        return rooms.find(room => room.roomId == player.position).getDescription();
    }

    function walk(_direction: string): string {
        let output: string = "<p>You can't walk this way.</p>";

        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        playerRoom.entered = true;
        switch (_direction) {
            case "n":
            case "north":
                if (playerRoom.directions[0] > 0) {
                    player.position = rooms.find(room => room.roomId == playerRoom.directions[0]).roomId;
                    gohstWalk();
                    output = "<p>You walked in the north.</p>";
                }
                break;
            case "e":
            case "east":
                if (playerRoom.directions[1] > 0) {
                    player.position = rooms.find(room => room.roomId == playerRoom.directions[1]).roomId;
                    gohstWalk();
                    output = "<p>You walked in the east.</p>";
                }
                break;
            case "s":
            case "south":
                if (playerRoom.directions[2] > 0) {
                    player.position = rooms.find(room => room.roomId == playerRoom.directions[2]).roomId;
                    gohstWalk();
                    output = "<p>You walked in the south.</p>";
                }
                break;
            case "w":
            case "west":
                if (playerRoom.directions[3] > 0) {
                    player.position = rooms.find(room => room.roomId == playerRoom.directions[3]).roomId;
                    gohstWalk();
                    output = "<p>You walked in the west.</p>";
                }
                break;
            default:
                break;
        }

        return output;
    }

    function gohstWalk(): void {
        let gohst: Npc = npcs.find(npc => npc.id == 2002);
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        let gohstRoom: Room = rooms.find(room => room.roomId == gohst.position);

        gohstRoom.npcs = gohstRoom.npcs.filter(npc => npc != gohst);
        playerRoom.npcs.push(gohst);
        gohst.position = playerRoom.roomId;
    }

    function talk(_npcName: string): string {
        let output: string;
        let npc: Npc = npcs.find(npc => npc.name.toLowerCase() == _npcName.toLowerCase());
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

    function take(_itemName: string): string {
        let output: string;
        let vocal: string[] = ["a", "e", "i", "o", "u"];
        let item: Item = items.find(item => item.name.toLowerCase() == _itemName.toLowerCase());
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        
        if (playerRoom.items.find(item => item.id == item.id) != undefined) {
            player.inventory.push(item);
            playerRoom.items = playerRoom.items.filter(item => item.id !== item.id);
            let firstLetter: string[] = _itemName.toLowerCase().split("");
            if (vocal.includes(firstLetter[0])) {
                output = "You took an " + item.name + ".";
            } else {
                output = "You took a " + item.name + ".";
            }
            item.position = -1;
        } else {
            output = "You can't do this right now.";
        }
        
        return output;
    }

    function dropItem(_itemName: string): string {
        let output: string;
        let item: Item = items.find(item => item.name.toLowerCase() == _itemName.toLowerCase());
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        
        if (player.inventory.find(item => item.id == item.id) != undefined) {
            playerRoom.items.push(item);
            player.inventory = player.inventory.filter(item => item.id != item.id);
            item.position = playerRoom.roomId;
            output = "You droped " + item.name + ".";
            output += itemObserverCall(item);
        } else {
            output = "You can't do this right now.";
        }

        return output;
    }
    
    function itemObserverCall(_item: Item): string {
        let output: string;
        if (_item.observer()) {
            if (items.filter(item => item.destination == item.destination).length <= 1) {
                output = "</br>" + itemEventHandler();
            } else {
                let observerCalls: Item[] = items.filter(item => item.destination == item.destination);
                let areAllTrue: boolean[] = []; 

                observerCalls = observerCalls.filter(item => item != item);
                for (let element of observerCalls) {
                    areAllTrue.push(element.observer()); 
                }
                if (areAllTrue.filter(element => element == false).length < 1) {
                    output = "</br>" + itemEventHandler();
                }
            }
        }
        return output;
    }

    function attack(_npcName: string): string {
        let output: string;
        let npc: Npc = npcs.find(npc => npc.name.toLowerCase() == _npcName.toLowerCase());
        let playerRoom: Room = rooms.find(room => room.roomId == player.position);
        let items: string;

        if (playerRoom.npcs.find(thisNpc => thisNpc == npc)) {
            if (npc.isKillable(player.inventory)) {
                items = npc.getInventory();
                Array.prototype.push.apply(player.inventory, npc.inventory);
                npc.inventory = [];
                npc.id = -1;
                output = "You stroke him down and found" + items;
            } else {
                output = "You can't win this fight. Maybe you need an item.";
            }
        } else {
            output = "You can't do this right now!"; 
        }

        return output;
    }

    function quit(): void {
        quitFlag = true;
        
        save();
        main();
    }

    function itemEventHandler(): string {
        let output: string;
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
    
    function save(): void {
        let json: string = "{ \"rooms\": [";
        
        for (let room of rooms) {
            json += "{ \"roomId\": " + room.roomId + ", ";
            json += "\"roomName\": \"" + room.roomName + "\", ";
            json += "\"directions\": [";
            for (let num of room.directions) {
                json += num + ",";
            }
            json = json.substring(0, json.length - 1);
            json += "], ";
            json += "\"roomDescriptions\": \"" + room.roomDescriptions + "\", ";
            json += "\"event\": \"" + room.event + "\"}, ";
        }
        json = json.substring(0, json.length - 2);
        json += " ], \"npcs\":[ "; 
        for (let npc of npcs) {
            json += "{ \"id\": " + npc.id + ", ";
            json += "\"name\": \"" + npc.name + "\", ";
            json += "\"dialog\": [";
            for (let str of npc.dialog) {
                json += "\"" + str + "\",";
            }
            json = json.substring(0, json.length - 1);
            json += "], ";
            json += "\"position\": " + npc.position + ", ";
            json += "\"neededItemToKill\": " + npc.neededItemToKill + "}, ";
        }
        json = json.substring(0, json.length - 2);
        json += " ], \"items\":[ "; 
        for (let item of items) {
            json += "{ \"id\": " + item.id + ", ";
            json += "\"name\": \"" + item.name + "\", ";
            json += "\"position\": " + item.position + ", ";
            json += "\"destination\": " + item.destination + "}, ";
        }
        json = json.substring(0, json.length - 2);
        json += "] }";
        
        let jsonObject: Object = JSON.parse(json);
        let data: string = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObject));
        let hiddenElement: HTMLAnchorElement = document.createElement("a");

        document.body.appendChild(hiddenElement);
        hiddenElement.href = "data:" + data;
        hiddenElement.download = "SaveState.json";
        hiddenElement.click();
        document.body.removeChild(hiddenElement);
    }

    function loadGame(): void {
        iniVariables();
        
        let load: HTMLInputElement = document.createElement("input") as HTMLInputElement;
        load.style.visibility = "hidden";
        load.setAttribute("type", "file");
        load.setAttribute("value", "Import");
        document.body.appendChild(load);
        
        let clickEvent: Event = document.createEvent("MouseEvents");
        clickEvent.initEvent("click", true, false);
        load.dispatchEvent(clickEvent);

        load.addEventListener("change", function(): void {getJson(load); }, false);

        document.body.removeChild(load);
    }
    
    async function getJson(_load: HTMLInputElement): Promise<void> {
        let saveGame: string = "";
        output.innerHTML = "loading...";        

        saveGame = await readFileContent(_load.files.item(0));
        let json: Object = JSON.parse(saveGame);
        
        convert(json);
        assign();

        setTimeout(async function(): Promise<void> {
            output.innerHTML = "";
            while (true) {
                await playerControl();
                if (quitFlag) {
                    quitFlag = false;
                    break;
                }
            }
        },         1000);
    }

    function readFileContent(_file: File): Promise<string> {
        const fileReader: FileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onload = event => resolve(event.target.result.toString());
            fileReader.onerror = error => reject(error);
            fileReader.readAsText(_file);
        });
    }
}        