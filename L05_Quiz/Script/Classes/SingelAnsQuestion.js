"use strict";
var L07_QuizExtended;
(function (L07_QuizExtended) {
    class SingelAnsQuestion extends L07_QuizExtended.Question {
        constructor() {
            super();
            this.answer = [];
        }
        isAnswerTrue(index) {
            var boolean;
            if (this.rightAnswerIndex == index) {
                boolean = true;
            }
            else {
                boolean = false;
            }
            return boolean;
        }
    }
    L07_QuizExtended.SingelAnsQuestion = SingelAnsQuestion;
})(L07_QuizExtended || (L07_QuizExtended = {}));
//# sourceMappingURL=SingelAnsQuestion.js.map