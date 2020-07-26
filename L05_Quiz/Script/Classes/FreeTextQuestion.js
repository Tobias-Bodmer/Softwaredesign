"use strict";
var L07_QuizExtended;
(function (L07_QuizExtended) {
    class FreeTextQuestion extends L07_QuizExtended.Question {
        constructor() {
            super();
            this.rigthAnswer = "";
        }
        isAnswerTrue(ans) {
            var boolean;
            if (this.rigthAnswer == ans) {
                boolean = true;
            }
            else {
                boolean = false;
            }
            return boolean;
        }
    }
    L07_QuizExtended.FreeTextQuestion = FreeTextQuestion;
})(L07_QuizExtended || (L07_QuizExtended = {}));
//# sourceMappingURL=FreeTextQuestion.js.map