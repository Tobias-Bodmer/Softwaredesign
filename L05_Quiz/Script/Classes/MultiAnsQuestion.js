"use strict";
var L07_QuizExtended;
(function (L07_QuizExtended) {
    class MultiAnsQuestion extends L07_QuizExtended.Question {
        constructor() {
            super();
            this.answer = [];
        }
        isAnswerTrue(indices) {
            var booleanArray = [];
            for (var i = 0; i <= indices.length; i++) {
                if (this.rightAnswerIndices.indexOf(indices[i]) != -1) {
                    booleanArray[i] = true;
                }
                else {
                    booleanArray[i] = false;
                }
            }
            return booleanArray;
        }
    }
    L07_QuizExtended.MultiAnsQuestion = MultiAnsQuestion;
})(L07_QuizExtended || (L07_QuizExtended = {}));
//# sourceMappingURL=MultiAnsQuestion.js.map