const correctAnswers = {
    q61: 'a',
    q62: 'a',
    q63: 'a',
    q64: 'b',
    q65: 'a',
    q66: 'b',
    q67: 'b',
    q68: 'a',
    q69: 'b',
    q70: 'a',
    q71: 'c',
    q72: 'b',
    q73: 'b',
    q74: 'b',
    q75: 'd',
    q76: 'b',
    q77: 'b',
    q78: 'a',
    q79: 'c',
    q80: 'a',
    q81: 'b',
    q82: 'b',
    q85: 'c',
    q86: 'b',
    q87: 'b',
    q88: 'a',
    q89: 'a'
};

const correctTextAnswers = {
    q83: { answers: ['порядковый номер элемента', 'порядковый номер'], correct: 'Порядковый номер элемента' },
    q84: { answers: ['0', 'ноль'], correct: '0' },
    q90: { answers: ['умение слушать и правильно формулировать свои идеи', 'умение слушать'], correct: 'Умение слушать и правильно формулировать свои идеи' }
};

function checkAnswers() {
    let score = 0;
    const total = 30;
    const form = document.getElementById('quizForm');
    const questions = form.getElementsByClassName('question');

    const radioQuestions = ['q61', 'q62', 'q63', 'q64', 'q65', 'q66', 'q67', 'q68', 'q69', 'q70', 'q71', 'q72', 'q73', 'q74', 'q75', 'q76', 'q77', 'q78', 'q79', 'q80', 'q81', 'q82', 'q85', 'q86', 'q87', 'q88', 'q89'];

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

    const textQuestions = ['q83', 'q84', 'q90'];
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