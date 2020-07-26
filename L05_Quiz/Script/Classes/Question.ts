namespace L07_QuizExtended {
    export abstract class Question {

        public question: string;

        constructor() {
            this.question = "";
        }

        public getQuestion(): string {
            return this.question;
        }

        public setQuestion(newQuestion: string): void {
            this.question = newQuestion;
        }
    }
}