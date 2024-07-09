document.addEventListener('DOMContentLoaded', function() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => generateForm(data));

    function generateForm(questions) {
        const form = document.getElementById('quizForm');
        questions.forEach((q, index) => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            formGroup.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option, i) => `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="question${index + 1}" value="${String.fromCharCode(97 + i)}" id="q${index + 1}${String.fromCharCode(97 + i)}">
                        <label class="form-check-label" for="q${index + 1}${String.fromCharCode(97 + i)}">${String.fromCharCode(97 + i)}) ${option}</label>
                    </div>
                `).join('')}
            `;
            form.appendChild(formGroup);
            form.appendChild(document.createElement('hr'));
        });

        const submitButton = document.createElement('div');
        submitButton.className = 'text-center';
        submitButton.innerHTML = `<button type="submit" class="btn btn-primary">Enviar</button>`;
        form.appendChild(submitButton);

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            validateForm(questions);
        });
    }

    function validateForm(questions) {
        let score = 0;

        questions.forEach((q, index) => {
            const options = document.getElementsByName(`question${index + 1}`);
            for (let option of options) {
                if (option.checked && option.value === q.correct) {
                    score++;
                }
            }
        });

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<div class="alert alert-info text-center">Tu calificación es ${score} de ${questions.length}.</div>`;
    }
});
