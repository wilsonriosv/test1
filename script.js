document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let score = 0;
    const answers = {
        question1: 'a',  // push()
        question2: 'a',  // for
        question3: 'a',  // var
        question4: 'b',  // console.log()
        question5: 'a'   // function
    };

    for (let question in answers) {
        let options = document.getElementsByName(question);
        for (let option of options) {
            if (option.checked && option.value === answers[question]) {
                score++;
            }
        }
    }

    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<div class="alert alert-info text-center">Tu calificación es ${score} de 5.</div>`;
});
