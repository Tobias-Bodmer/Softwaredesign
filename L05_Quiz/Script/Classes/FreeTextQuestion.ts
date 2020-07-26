namespace L07_QuizExtended {
    export class FreeTextQuestion extends Question {

        public rigthAnswer: string;

        constructor() {
            super();
            this.rigthAnswer = "";
        }

        public isAnswerTrue(ans: string): boolean {
            var boolean: boolean;

            if (this.rigthAnswer == ans) {
                boolean = true;
            } else {
                boolean = false;
            }

            return boolean;
        }
    }
}