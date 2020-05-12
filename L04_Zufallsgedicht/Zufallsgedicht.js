"use strict";
var Zufallsgedicht;
(function (Zufallsgedicht) {
    let subjects = ["San", "Ashitaka", "Moro", "Eboshi", "Okoto", "Nago"];
    let verbs = [" liebt ", " hasst ", " zerstört ", " tötet ", " bekämpft ", " kennt "];
    let objects = ["den Waldgott", "die Natur", "die Eisenhütte", "den Wald", "Asano", "den Kaiser"];
    let newPoem = [];
    let arrLength = subjects.length;
    let i = 0;
    while (i < arrLength) {
        let newVerse = getVerse();
        newPoem.push(newVerse);
        i++;
    }
    i = 0;
    while (i < newPoem.length) {
        console.log(newPoem[i]);
        i++;
    }
    function getVerse() {
        let newVerse = "";
        let randomSubjectInd = Math.floor(Math.random() * subjects.length);
        let randomeVerbInd = Math.floor(Math.random() * subjects.length);
        let randomeObjectInd = Math.floor(Math.random() * subjects.length);
        newVerse += subjects.splice(randomSubjectInd, 1);
        newVerse += verbs.splice(randomeVerbInd, 1);
        newVerse += objects.splice(randomeObjectInd, 1);
        return newVerse;
    }
})(Zufallsgedicht || (Zufallsgedicht = {}));
//# sourceMappingURL=Zufallsgedicht.js.map