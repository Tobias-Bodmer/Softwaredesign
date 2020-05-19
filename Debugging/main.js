"use strict";
var Debugging;
(function (Debugging) {
    console.time("default");
    let i = [0, 1, 2];
    console.group("Simple");
    console.log("Dies ist eine Ausgabe");
    console.error("Dies ist ein Error");
    console.info("Dies ist eine Info-Ausgabe");
    console.warn("Dies ist eine Warnung");
    console.dir(i);
    console.groupEnd();
    console.groupCollapsed("Complex");
    let x = 10;
    let y = "Hallo";
    let a = [123, 456, 789];
    let o = { fristname: "Egzon", lastname: "Demaj", age: "25" };
    console.log(x, y, a, o);
    let h = document.querySelector("h1");
    console.log(h);
    console.groupEnd();
    console.group("Count");
    for (let i = 0; i < 10; i++) {
        console.count("counter");
    }
    console.groupEnd();
    let studies = [];
    studies.push(o);
    studies.push({ fristname: "Manuel", lastname: "Proß", age: "24" });
    studies.push({ fristname: "Christian", lastname: "Micka", age: "27" });
    studies.push({ fristname: "Vincent", lastname: "Junghans", age: "21" });
    console.table(studies);
    console.time("console.");
    console.timeEnd("default");
    console.timeEnd("console.");
})(Debugging || (Debugging = {}));
//# sourceMappingURL=main.js.map