namespace L07_QuizExtended {
    export class MultiAnsQuestion extends Question {

        public answer: string[];
        public rightAnswerIndices: number[];

        constructor() {
            super();
            this.answer = [];
        }

        public isAnswerTrue(indices: number[]): boolean[] {
            var booleanArray: boolean[] = [];

            for (var i: number = 0; i <= indices.length; i++) {
                if (this.rightAnswerIndices.indexOf(indices[i]) != -1) {
                    booleanArray[i] = true;
                } else {
                    booleanArray[i] = false;
                }    
            }

            return booleanArray;
        }
    }
}