"use strict";
var L02_HelloWorld;
(function (L02_HelloWorld) {
    class Room {
        constructor() {
            this.a = "";
        }
    }
    let b = new Room();
    let c = new Room();
    b.a = "hello";
    c = b;
    console.log(b.a + ", " + c.a);
    c.a = "Moin";
    console.log(b.a + ", " + c.a);
})(L02_HelloWorld || (L02_HelloWorld = {}));
//# sourceMappingURL=Main.js.map