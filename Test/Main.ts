namespace L02_HelloWorld {
    class Room {
        public a: String;

        constructor() {
            this.a = "";
        }
    }
    
    let b: Room = new Room();
    let c: Room = new Room();

    b.a = "hello";
    c = b;
    
    console.log(b.a + ", " + c.a);

    c.a = "Moin";

    console.log(b.a + ", " + c.a);
}