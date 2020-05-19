namespace Wortverdreher {
    let sentence: string = prompt("Write your own sentences.", "Die Maus frisst Käse");

    reverseWords(sentence);
    reverseWords(reverseSentence(sentence));

    function reverseSentence(satz: string): string { // warum hier "satz" statt weiterhin "sentence"? // formal parameters brauchen ein "_" als prefix
        let i: number = 1;
        let revsatz: string = ""; // Besser wäre "reversedSentence"

        while (i <= satz.length) {
            revsatz += satz[satz.length - i];
            i++;
        }

        console.log(revsatz);
        return revsatz;
    }

    function reverseWords(satz: string): void { // warum hier "satz" statt weiterhin "sentence"? // formal parameters brauchen ein "_" als prefix
        let i: number = 1;
        let revsatz: string = ""; // Besser wäre "reversedSentence"
        let splittedSatz: string[] = satz.split(" "); // Besser wäre "splittedSentence"

        while (i <= splittedSatz.length) {
            revsatz += splittedSatz[splittedSatz.length - i] + " ";
            i++;
        }

        console.log(revsatz);
    }
} 
