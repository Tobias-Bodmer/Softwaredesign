namespace L07_QuizExtended {
    export class EstimateQuestion extends Question {

        public rigthAnswer: number;
        public tolerance: number;

        constructor() {
            super();
        }

        public isAnswerTrue(ans: number): boolean {
            var boolean: boolean;

            if (this.rigthAnswer - this.tolerance <= ans && this.rigthAnswer + this.tolerance >= ans) {
                boolean = true;
            } else {
                boolean = false;
            }

            return boolean;
        }
    }
}