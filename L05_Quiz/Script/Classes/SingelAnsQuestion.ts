namespace L07_QuizExtended {
    export class SingelAnsQuestion extends Question {

        public answer: string[];
        public rightAnswerIndex: number;

        constructor() {
            super();
            this.answer = [];
        }

        public isAnswerTrue(index: number): boolean {
            var boolean: boolean;

            if (this.rightAnswerIndex == index) {
                boolean = true;
            } else {
                boolean = false;
            }

            return boolean;
        }
    }
}