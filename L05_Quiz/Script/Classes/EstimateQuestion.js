"use strict";
var L07_QuizExtended;
(function (L07_QuizExtended) {
    class EstimateQuestion extends L07_QuizExtended.Question {
        constructor() {
            super();
        }
        isAnswerTrue(ans) {
            var boolean;
            if (this.rigthAnswer - this.tolerance <= ans && this.rigthAnswer + this.tolerance >= ans) {
                boolean = true;
            }
            else {
                boolean = false;
            }
            return boolean;
        }
    }
    L07_QuizExtended.EstimateQuestion = EstimateQuestion;
})(L07_QuizExtended || (L07_QuizExtended = {}));
//# sourceMappingURL=EstimateQuestion.js.map