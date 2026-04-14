const correctAnswers = {
    q96: 'a',
    q99: 'a',
    q100: 'a',
    q101: 'a',
    q102: 'a',
    q103: 'a',
    q104: 'a',
    q105: 'a',
    q106: 'c',
    q107: 'c',
    q108: 'b',
    q109: 'c',
    q110: 'c',
    q111: 'c',
    q112: 'c',
    q114: 'b',
    q115: 'c',
    q116: 'c',
    q117: 'a',
    q118: 'a'
};

const correctTextAnswers = {
    q91: { answers: ['умение слушать и правильно формулировать свои идеи', 'умение слушать'], correct: 'Умение слушать и правильно формулировать свои идеи' },
    q92: { answers: ['чтобы понять их требования и избежать недоразумений', 'понять требования'], correct: 'Чтобы понять их требования и избежать недоразумений' },
    q93: { answers: ['постановка четких целей и задач', 'четкие цели'], correct: 'Постановка четких целей и задач' },
    q94: { answers: ['внедрение системы код-ревью и автоматического тестирования', 'код-ревью'], correct: 'Внедрение системы код-ревью и автоматического тестирования' },
    q95: { answers: ['регулярно проводить совещания и обмениваться знаниями', 'совещания'], correct: 'Регулярно проводить совещания и обмениваться знаниями' },
    q97: { answers: ['через цикл и сравнение', 'цикл и сравнение'], correct: 'Через цикл и сравнение' },
    q98: { answers: ['9', 'девять'], correct: '9' },
    q113: { answers: ['запретить наследование от этого класса', 'запретить наследование'], correct: 'Запретить наследование от этого класса' },
    q119: { answers: ['streamreader', 'stream reader'], correct: 'StreamReader' },
    q120: { answers: ['tostring()', 'tostring'], correct: 'ToString()' }
};

function checkAnswers() {
    let score = 0;
    const total = 30;
    const form = document.getElementById('quizForm');
    const questions = form.getElementsByClassName('question');

    const radioQuestions = ['q96', 'q99', 'q100', 'q101', 'q102', 'q103', 'q104', 'q105', 'q106', 'q107', 'q108', 'q109', 'q110', 'q111', 'q112', 'q114', 'q115', 'q116', 'q117', 'q118'];

    for (const qName of radioQuestions) {
        const correctValue = correctAnswers[qName];
        const selectedInput = form.querySelector('input[name="' + qName + '"]:checked');
        const qDiv = form.querySelector('input[name="' + qName + '"]').closest('.question');
        
        if (qDiv) {
            const labels = qDiv.getElementsByTagName('label');
            for (let j = 0; j < labels.length; j++) {
                labels[j].classList.remove('correct-option', 'wrong-option');
                const input = labels[j].querySelector('input');
                if (input && input.value === correctValue) {
                    labels[j].classList.add('correct-option');
                }
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
    }

    const textQuestions = ['q91', 'q92', 'q93', 'q94', 'q95', 'q97', 'q98', 'q113', 'q119', 'q120'];
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