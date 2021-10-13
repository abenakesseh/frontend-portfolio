var currQuestion = 0;
var score = 0;
var totalQuestions = questions.length;
//console.log(totalQuestions);

var container = document.getElementById('quiz');
var questionElem = document.getElementById('question');
var option1 = document.getElementById('opt1');
var option2 = document.getElementById('opt2');
var option3 = document.getElementById('opt3');
var option4 = document.getElementById('opt4');
var nextBtn = document.getElementById('nextButton');
var resultContainer = document.getElementById('result');

function loadQuestion(questionIndex)
{
	var q = questions[questionIndex];
	questionElem.textContent = (questionIndex + 1) + '. ' + q.question;
	opt1.textContent = q.option1;
	opt2.textContent = q.option2;
	opt3.textContent = q.option3;
	opt4.textContent = q.option4;
};

function loadNextQuestion()
{
	var selectedOption = document.querySelector('input[type=radio]:checked');
	if (!selectedOption) 
	{
		alert('Please select your answer');
		return;
	}
	var answer = selectedOption.value;
	if (questions[currQuestion].answer == answer) 
	{
		score += 10;
	}
	selectedOption.checked = false;
	currQuestion++;
	if (currQuestion == totalQuestions - 1) 
	{
		nextBtn.textContent = 'Finish';
	}
	if (currQuestion == totalQuestions) 
	{
		container.style.display = 'none';
		resultContainer.style.display = '';
		resultContainer.textContent = 'Your Score is ' + score + '%';
		return;
	}
	loadQuestion(currQuestion);
};

loadQuestion(currQuestion);