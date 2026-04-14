const correctAnswers = {
    q1: 'd',
    q2: 'c',
    q3: 'c',
    q4: 'c',
    q5: 'a',
    q6: 'c',
    q7: 'b',
    q8: 'b',
    q10: 'b',
    q11: 'c',
    q12: 'c',
    q13: 'b',
    q14: 'b',
    q15: 'c',
    q16: 'b',
    q17: 'b',
    q21: 'b',
    q23: 'b',
    q24: 'b',
    q25: 'b',
    q27: 'b'
};

const correctTextAnswers = {
    q18: { answers: ['else'], correct: 'else' },
    q19: { answers: ['private'], correct: 'private' },
    q20: { answers: ['=='], correct: '==' },
    q22: { answers: ['break'], correct: 'break' },
    q28: { answers: ['array.length'], correct: 'array.Length' },
    q29: { answers: ['bool'], correct: 'bool' },
    q30: { answers: ['ветвление', 'развилка'], correct: 'Ветвление (Развилка)' }
};

const correctTableAnswers = {
    q9: { q9_1: 'б', q9_2: 'г', q9_3: 'в', q9_4: 'a' },
    q26: { q26_1: 'г', q26_2: 'a', q26_3: 'б', q26_4: 'в' }
};

function checkAnswers() {
    let score = 0;
    const total = 30;
    const form = document.getElementById('quizForm');
    const questions = form.getElementsByClassName('question');

    let radioQuestionIndex = 0;
    const radioQuestions = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 21, 23, 24, 25, 27];

    for (let i = 0; i < questions.length; i++) {
        const qNum = radioQuestions[radioQuestionIndex];
        if (qNum && questions[i].querySelector('input[type="radio"]')) {
            const qName = 'q' + qNum;
            const correctValue = correctAnswers[qName];
            const qDiv = questions[i];
            const labels = qDiv.getElementsByTagName('label');
            const selectedInput = form.querySelector('input[name="' + qName + '"]:checked');

            for (let j = 0; j < labels.length; j++) {
                labels[j].classList.remove('correct-option', 'wrong-option');
                const input = labels[j].querySelector('input');
                if (input && input.value === correctValue) {
                    labels[j].classList.add('correct-option');
                }
            }

            if (selectedInput) {
                if (selectedInput.value === correctValue) {
                    score++;
                } else {
                    const selectedLabel = selectedInput.parentElement;
                    selectedLabel.classList.add('wrong-option');
                }
            }
            radioQuestionIndex++;
        }
    }

    const textQuestions = ['q18', 'q19', 'q20', 'q22', 'q28', 'q29', 'q30'];
    for (const qName of textQuestions) {
        const qInput = form.querySelector('input[name="' + qName + '"]');
        const qFeedback = qInput.parentElement.querySelector('.text-feedback');
        const userAnswer = qInput.value.trim().toLowerCase();
        
        qFeedback.classList.remove('correct', 'incorrect');
        
        if (correctTextAnswers[qName] && correctTextAnswers[qName].answers.includes(userAnswer)) {
            score++;
            qFeedback.textContent = '✓ Правильно!';
            qFeedback.classList.add('correct');
            qInput.style.borderColor = '#28a745';
        } else {
            qFeedback.textContent = '✗ Неправильно. Правильный ответ: ' + correctTextAnswers[qName].correct;
            qFeedback.classList.add('incorrect');
            qInput.style.borderColor = '#dc3545';
        }
    }

    const tableQuestions = ['q9', 'q26'];
    for (const qName of tableQuestions) {
        const inputs = ['q9_1', 'q9_2', 'q9_3', 'q9_4'];
        const q26Inputs = ['q26_1', 'q26_2', 'q26_3', 'q26_4'];
        const selectInputs = qName === 'q9' ? inputs : q26Inputs;
        const correctAnswersForQuestion = correctTableAnswers[qName];
        const qFeedback = form.querySelector('.' + qName + '-feedback');
        
        let correctCount = 0;
        for (const inputName of selectInputs) {
            const select = form.querySelector('select[name="' + inputName + '"]');
            const userAnswer = select.value;
            
            select.classList.remove('correct', 'incorrect');
            
            if (userAnswer === correctAnswersForQuestion[inputName]) {
                correctCount++;
                select.classList.add('correct');
            } else {
                select.classList.add('incorrect');
            }
        }
        
        if (correctCount === 4) {
            score++;
        }
        
        qFeedback.classList.remove('correct', 'incorrect');
        qFeedback.textContent = correctCount + ' из 4 правильных';
        qFeedback.classList.add(correctCount === 4 ? 'correct' : 'incorrect');
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Ваш результат: ' + score + ' из ' + total;
    if (score === total) {
        resultDiv.style.color = '#28a745';
        resultDiv.style.background = '#d4edda';
    } else if (score > total / 2) {
        resultDiv.style.color = '#856404';
        resultDiv.style.background = '#fff3cd';
    } else {
        resultDiv.style.color = '#721c24';
        resultDiv.style.background = '#f8d7da';
    }

    const inputs = form.querySelectorAll('input, select');
    for (let k = 0; k < inputs.length; k++) {
        inputs[k].disabled = true;
    }
}

function resetForm() {
    const form = document.getElementById('quizForm');
    form.reset();
    const questions = form.getElementsByClassName('question');
    for (let i = 0; i < questions.length; i++) {
        const labels = questions[i].getElementsByTagName('label');
        for (let j = 0; j < labels.length; j++) {
            labels[j].classList.remove('correct-option', 'wrong-option');
        }
    }
    const textInputs = form.querySelectorAll('.text-input');
    for (const input of textInputs) {
        const feedback = input.parentElement.querySelector('.text-feedback');
        if (feedback) {
            feedback.classList.remove('correct', 'incorrect');
        }
        input.style.borderColor = '#e0e0e0';
    }
    const selectInputs = form.querySelectorAll('.match-select');
    for (const select of selectInputs) {
        select.classList.remove('correct', 'incorrect');
        select.selectedIndex = 0;
    }
    const feedbacks = form.querySelectorAll('.text-feedback');
    for (const feedback of feedbacks) {
        feedback.classList.remove('correct', 'incorrect');
    }
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.style.color = '';
    resultDiv.style.background = '';
    const inputs = form.querySelectorAll('input, select');
    for (let k = 0; k < inputs.length; k++) {
        inputs[k].disabled = false;
    }
}