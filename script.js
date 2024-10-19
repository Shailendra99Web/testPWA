document.addEventListener('DOMContentLoaded', () => {
    const collectedPoints = document.getElementById('collected-points');
    const totalPoints = document.getElementById('total-points');
    const progressBarWidth = document.getElementById('progress-bar')
    const quesNumber = document.getElementById('ques-no')
    const quesOutOf = document.getElementById('ques-out-of')
    const questionElement = document.getElementById('question');
    const questionPoints = document.getElementById('questionPoints');
    const choicesElement = document.getElementById('choices');
    const CorrectAnsBox = document.querySelector('#correct-ans')
    const wrongAnsBox = document.querySelector('#wrong-ans-box')
    const showCorrectAnsBox = document.querySelector('#show-correct-ans')
    const correctAnsInfoBox = document.querySelector('#correct-ans-info')
    const nextButton = document.getElementById('next');
    const yourScore = document.getElementById('your-score')
    const win = document.getElementById('win')
    const lose = document.getElementById('lose')

    const questions = [
        {
            question: "What is the capital of France?",
            points: 2,
            info: `Paris is the capital of France. It is the most popular city in France. It is often dubbed as the 'Fashion capital of the World'.`,
            choices: ["A ) Madrid", "B ) Berlin", "C ) Paris", "D ) London"],
            answer: "C ) Paris",

        },
        {
            question: "Which country was earlier called Burma?",
            points: 2,
            info: `Burma was an old name used by Myanmar Country, yet later was changed by the Burma's government from the 'Union of Burma' to the 'Republic of the Union of Myanmar'.`,
            choices: ["A ) Guyana", "B ) Brazil", "C ) Zimbabwe", "D ) Myanmar"],
            answer: "D ) Myanmar",
        },
        {
            question: "What is the largest planet in our solar system?",
            points: 2,
            info: `Jupiter is the fifth planet from our Sun and is, by far, the largest planet in the solar system – more than twice as massive as all the other planets combined.`,
            choices: ["A ) Venus", "B ) Mars", "C ) Saturn", "D ) Jupiter"],
            answer: "D ) Jupiter",
        },
        // ... other questions
    ];

    let currentQuestionIndex = 0;
    quesOutOf.textContent = ` of ${questions.length}`
    const totalMaxPoints = questions.length + questions.length;
    totalPoints.textContent = totalMaxPoints
    let totalCollectedPoints = +collectedPoints.textContent;
    const progressBarIncrementBy = Math.ceil(100 / questions.length);
    let progressBarIncrement = progressBarIncrementBy;
    progressBarWidth.style.width = `${progressBarIncrement}%`;


    function showQuestion(question) {
        quesNumber.textContent = questions.indexOf(question)+1;
        questionPoints.textContent = `${question.points} points`;
        questionElement.textContent = question.question;
        choicesElement.innerHTML = '';
        question.choices.forEach(choice => {
            const choiceItem = document.createElement('a');
            choiceItem.classList.add('list-group-item', 'list-group-item-action', 'border', 'answer-bar');
            choiceItem.textContent = choice;
            if (questions[currentQuestionIndex].answer === choice) {
                choiceItem.classList.add('bg-correct');
            } else {
                choiceItem.classList.add('bg-wrong');
            }
            choiceItem.addEventListener('click', () => selectAnswer(choice, question.answer, questions[currentQuestionIndex].choices.indexOf(choice), question.points));
            choicesElement.appendChild(choiceItem);
        });
        showCorrectAnsBox.textContent = `Correct Answer : ${question.answer}`
        correctAnsInfoBox.textContent = question.info
    }

    function selectAnswer(choice, correctAnswer, index, points) {
        const allChoices = document.querySelectorAll(".list-group-item");
        allChoices.forEach(button => {
            button.classList.add("disabled");
        });
        const currentChoices = allChoices[index];
        currentChoices.classList.add("answer-bar-show-color")
        if (choice === correctAnswer) {
            CorrectAnsBox.classList.remove('d-none');
            correctAnsInfoBox.classList.remove('d-none');
            totalCollectedPoints = totalCollectedPoints + points;
            collectedPoints.textContent = totalCollectedPoints;
        } else {
            wrongAnsBox.classList.remove('d-none');
            showCorrectAnsBox.classList.remove('d-none');
            correctAnsInfoBox.classList.remove('d-none');
        }
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
            CorrectAnsBox.classList.add('d-none')
            wrongAnsBox.classList.add('d-none')
            showCorrectAnsBox.classList.add('d-none')
            correctAnsInfoBox.classList.add('d-none')
            progressBarIncrement = progressBarIncrement + progressBarIncrementBy;
            progressBarWidth.style.width = `${progressBarIncrement}%`;
        } else {
            CorrectAnsBox.classList.add('d-none')
            wrongAnsBox.classList.add('d-none')
            showCorrectAnsBox.classList.add('d-none')
            correctAnsInfoBox.classList.add('d-none')
            yourScore.textContent = `Your Score : ${totalCollectedPoints} points / ${totalMaxPoints} points`;
            if(totalCollectedPoints >= Math.round(totalMaxPoints / 2)){
                lose.classList.add('d-none')
                win.classList.remove('d-none')
            }else{
                win.classList.add('d-none')
                lose.classList.remove('d-none')
            }
            $('#quizFinishedModal').modal('show')
            currentQuestionIndex = 0;
            showQuestion(questions[currentQuestionIndex]);
            progressBarIncrement = progressBarIncrementBy
            progressBarWidth.style.width = `${progressBarIncrement}%`;
            totalCollectedPoints = 0
            collectedPoints.textContent = totalCollectedPoints
        }
    });

    showQuestion(questions[currentQuestionIndex]);
});