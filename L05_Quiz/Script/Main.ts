namespace L07_QuizExtended {
    
    let stratMenu: string = "";
    let addQuestionMenu: string = "";
    let quizMenu: string = "";

    let q: SingelAnsQuestion = new SingelAnsQuestion();

    let questions: Question[];
    let score: number = 0;

    /*startProgram();

    function startProgram(): void {
        fillQuestions();
        console.log(stratMenu);
        let selection: number = +prompt(stratMenu, "Choose a option by typing the number.");
        switch (selection) {
            case 1:
                startQuiz();
                break;
            case 2:
                addQuestion();
                break;
            case 3:
                endQuiz();
                break;
            default:
                save();
                startProgram();
                break;
        }
    }    

    function fillQuestions(): void {
        let newQuestion01: SingelAnsQuestion;
        newQuestion01.setQuestion("Welches ist der größte Berg Deutschlands?");
        newQuestion01.answer = ["Watzmann", "Zugspitze", "Brocken"];
        newQuestion01.rightAnswerIndex = 1;

        let newQuestion02: MultiAnsQuestion;
        newQuestion02.setQuestion("Welches ist der größte Berg Deutschlands?");
        newQuestion02.answer = ["Watzmann", "Zugspitze", "Brocken"];
        newQuestion02.rightAnswerIndices = [1, 5];

        questions.push(newQuestion01);
        questions.push(newQuestion02);

        load("test.json");
    }

    async function load(_filename: string): Promise<void> {
        let response: Response = await fetch(_filename);
        console.log(response.text);
    }

    async function save(): Promise<void> {

    }

    function addQuestion(): void {
        console.log(addQuestionMenu);
        let selection: number = +prompt(addQuestionMenu, "Choose a option by typing the number.");

        console.log("What is your question?");
        let questionText: string = prompt(addQuestionMenu, "Choose a option by typing the number.");

        let newQuestion: Question;

        switch (selection) {
            case 1:
                newQuestion = addSingelAnsQuestion(questionText);
                break;
            case 2:
                newQuestion = addMultiAnsQuestion(questionText);
                break;
            case 3:
                newQuestion = addYesOrNoQuestion(questionText);
                break;
            case 4:
                newQuestion = addFreeTextQuestion(questionText);
                break;
            case 5:
                newQuestion = addEstimateQuestion(questionText);
                break;
            default:
                save();
                startProgram();
        }
        
        questions.push(newQuestion);
          
    }

    /*function addSingelAnsQuestion(questionText: string): SingelAnsQuestion{

    }

    function addMultiAnsQuestion(questionText: string): SingelAnsQuestion{

    }

    function addYesOrNoQuestion(questionText: string): SingelAnsQuestion{

    }

    function addFreeTextQuestion(questionText: string): SingelAnsQuestion{

    }
    
    function addEstimateQuestion(questionText: string): SingelAnsQuestion{

    }
    
    function startQuiz(): void {
        let index: number = Math.floor(Math.random() * questions.length);
        console.log(questions[index].getQuestion);
        if ((typeof questions[index]) == MultiAnsQuestion)
        for()
    }

    function endQuiz(): void {
        score = 0;
        startProgram();
    }*/
}