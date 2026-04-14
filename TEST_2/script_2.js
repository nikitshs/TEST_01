const correctAnswers = {
    q31: 'b',
    q32: 'b',
    q33: 'b',
    q34: 'c',
    q35: 'a',
    q38: 'b',
    q41: 'd',
    q43: 'a',
    q44: 'a',
    q47: 'a',
    q48: 'c',
    q51: 'b',
    q56: 'a',
    q57: 'a',
    q58: 'a',
    q59: 'a',
    q60: 'a'
};

const correctTextAnswers = {
    q36: { answers: ['while'], correct: 'while' },
    q37: { answers: ['&&'], correct: '&&' },
    q49: { answers: ['линейным', 'линейный'], correct: 'Линейным' },
    q50: { answers: ['math.abs(x)', 'math.abs'], correct: 'Math.Abs(x)' },
    q52: { answers: ['группировка', 'группировка выражений', 'группировка выражений для порядка выполнения'], correct: 'Группировка выражений для порядка выполнения' },
    q53: { answers: ['&&'], correct: '&&' },
    q54: { answers: ['возвращает квадратный корень', 'квадратный корень', 'корень'], correct: 'Возвращает квадратный корень из x' },
    q55: { answers: ['2'], correct: '2' }
};

const correctTableAnswers = {
    q39: { q39_1: 'б', q39_2: 'a', q39_3: 'г', q39_4: 'в' },
    q40: { q40_1: 'в', q40_2: 'a', q40_3: 'б', q40_4: 'г' },
    q42: { q42_1: 'г', q42_2: 'a', q42_3: 'б', q42_4: 'в' },
    q45: { q45_1: 'г', q45_2: 'в', q45_3: 'б', q45_4: 'a' },
    q46: { q46_1: 'г', q46_2: 'в', q46_3: 'a', q46_4: 'б' }
};

function checkAnswers() {
    let score = 0;
    const total = 30;
    const form = document.getElementById('quizForm');
    const questions = form.getElementsByClassName('question');

    const radioQuestions = ['q31', 'q32', 'q33', 'q34', 'q35', 'q38', 'q41', 'q43', 'q44', 'q47', 'q48', 'q51', 'q56', 'q57', 'q58', 'q59', 'q60'];

    for (const qName of radioQuestions) {
        const correctValue = correctAnswers[qName];
        const selectedInput = form.querySelector('input[name="' + qName + '"]:checked');
        const qDiv = selectedInput ? selectedInput.closest('.question') : form.querySelector('input[name="' + qName + '"]').closest('.question');
        
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

    const textQuestions = ['q36', 'q37', 'q49', 'q50', 'q52', 'q53', 'q54', 'q55'];
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

    const tableQuestions = ['q39', 'q40', 'q42', 'q45', 'q46'];
    for (const qName of tableQuestions) {
        const inputs = Object.keys(correctTableAnswers[qName]);
        const correctAnswersForQuestion = correctTableAnswers[qName];
        const qFeedback = form.querySelector('.' + qName + '-feedback');
        
        let correctCount = 0;
        for (const inputName of inputs) {
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