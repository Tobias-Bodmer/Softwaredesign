namespace L07_QuizExtended {
    export class YesOrNoQuestion extends Question {

        public trueOrNot: boolean;

        constructor() {
            super();
        }

        public isTrue(ans: boolean): boolean {
            var boolean: boolean;

            if (this.trueOrNot == ans) {
                boolean = true;
            } else {
                boolean = false;
            }

            return boolean;
        }
    }
}