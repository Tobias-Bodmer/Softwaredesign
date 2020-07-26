"use strict";
var L07_QuizExtended;
(function (L07_QuizExtended) {
    class YesOrNoQuestion extends L07_QuizExtended.Question {
        constructor() {
            super();
        }
        isTrue(ans) {
            var boolean;
            if (this.trueOrNot == ans) {
                boolean = true;
            }
            else {
                boolean = false;
            }
            return boolean;
        }
    }
    L07_QuizExtended.YesOrNoQuestion = YesOrNoQuestion;
})(L07_QuizExtended || (L07_QuizExtended = {}));
//# sourceMappingURL=YesOrNoQuestion.js.map