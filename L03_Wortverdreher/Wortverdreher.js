"use strict";
var Wortverdreher;
(function (Wortverdreher) {
    let sentence = prompt("Write your own sentences.", "Die Maus frisst Käse");
    reverseWords(sentence);
    reverseWords(reverseSentence(sentence));
    function reverseSentence(satz) {
        let i = 1;
        let revsatz = "";
        while (i <= satz.length) {
            revsatz += satz[satz.length - i];
            i++;
        }
        console.log(revsatz);
        return revsatz;
    }
    function reverseWords(satz) {
        let i = 1;
        let revsatz = "";
        let splittedSatz = satz.split(" ");
        while (i <= splittedSatz.length) {
            revsatz += splittedSatz[splittedSatz.length - i] + " ";
            i++;
        }
        console.log(revsatz);
    }
})(Wortverdreher || (Wortverdreher = {}));
//# sourceMappingURL=Wortverdreher.js.map