namespace Wortverdreher {
    let sentence: string = prompt("Write your own sentences.", "Die Maus frisst Käse");

    reverseWords(sentence);
    reverseWords(reverseSentence(sentence));

    function reverseSentence(satz: string): string {
        let i: number = 1;
        let revsatz: string = "";

        while (i <= satz.length) {
            revsatz += satz[satz.length - i];
            i++;
        }

        console.log(revsatz);
        return revsatz;
    }

    function reverseWords(satz: string): void {
        let i: number = 1;
        let revsatz: string = "";
        let splittedSatz: string[] = satz.split(" ");

        while (i <= splittedSatz.length) {
            revsatz += splittedSatz[splittedSatz.length - i] + " ";
            i++;
        }

        console.log(revsatz);
    }
} 