document.addEventListener('DOMContentLoaded', function () {

	// Format question
	function FormatQuestion(text, options, answer) {
		this.text = text;
		this.options = options;
		this.answer = answer;
	}
	// If option is correct answer then return true
	FormatQuestion.prototype.correctAnswer = function (option) {
		return this.answer === option;
	};
	// Format questionnaire
	function Questionnaire(questions) {
		// Array of questions
		this.questions = questions;
		// Start quiz with the first question
		this.questionIndex = 0;
		this.score = 0;
	}
	Questionnaire.prototype.currentQuestion = function () {
		return this.questions[this.questionIndex];
	};
	Questionnaire.prototype.checkAnswer = function (answer) {
		if (this.currentQuestion().correctAnswer(answer)) {
			this.score++;
		}
		this.questionIndex++;
	};
	// Check if quiz end is reached
	Questionnaire.prototype.isOver = function () {
		// Return TRUE only after last question
		return this.questionIndex >= this.questions.length;
	};
	// Format questionnaire
	var QuestionnaireFormat = {
		displayNext: function () {
			if (quiz.isOver()) {
				this.showResults();
			} else {
				this.displayQuestion();
				this.displayOptions();
				this.displayState();
				this.displayScore();
			}
		},
		displayQuestion: function () {
			this.fillingWithText('table', quiz.currentQuestion().text);
		},
		displayOptions: function () {
			var options = quiz.currentQuestion().options;
			// Display all options
			for (var i = 0; i < options.length; i++) {
				var optionId = 'option' + i;
				var optionText = options[i];
				this.fillingWithText(optionId, optionText);
				this.checkAnswerOrganizer(optionId, optionText);
			}
		},
		checkAnswerOrganizer: function (id, guess) {
			var button = document.getElementById(id);
			button.onclick = function () {
				quiz.checkAnswer(guess);
				QuestionnaireFormat.displayNext();
			}
		},
		displayScore: function () {
			var scoreText = 'Score: ' + quiz.score;
			this.fillingWithText('score', scoreText);
		},
		displayState: function () {
			var questionNumber = quiz.questionIndex + 1;
			var totalQuestions = quiz.questions.length;
			var showState = 'Page ' + questionNumber + ' of ' + totalQuestions;
			this.fillingWithText('page', showState);
		},
		showResults: function () {
			var grade = quiz.score / quiz.questions.length;
			var results = '<h1>';

			results += '<h1>Final score: <br><br>' + quiz.score + ' puncte</h1>';
			if (grade >= 0.8) {
				results += '<h2><br>Felicitari!<br>Rezultatul obtinut demonstreaza ca ai invatat bine la Religie!</h2>';
			} else if (grade < 0.8 && grade > 0.5) {
				results += '<h2><br>Rezultatul obtinut demonstreaza ca nu prea ai invatat bine la Religie!</h2>';
			} else {
				results += '<h2><br>Rezultatul obtinut demonstreaza ca nu ai invatat nimic la Religie!</h2>';
			}
			results += '<br><button id="reset">Try Again?</button>';
			this.fillingWithText('questionnaire', results);
			this.resetQuestionnaire();
		},
		resetQuestionnaire: function () {
			var resetBtn = document.getElementById('reset');
			// Restart from the beginning
			resetBtn.onclick = function () {
				window.location.reload(false);
			}
		},
		fillingWithText: function (id, content) {
			var element = document.getElementById(id);
			element.innerHTML = content;
		}
	};
	// Create questions
	var questions = [
		new FormatQuestion('La ce se refera Chipul lui Dumnezeu in oameni?', ['Milostenie si iubire', 'Curaj si putere', 'Ratiune, vointa, simtire', 'Inteligenta si ascultare'], 'Ratiune, vointa, simtire'),
		new FormatQuestion('Cine este Duhul Sfant in cadrul Sfintei Treimi?', ['Prima Persoana', 'A doua Persoana', 'A treia Persoana', 'Nu se specifica'], 'A treia Persoana'),
		new FormatQuestion('Cum se poate obtine mantuirea sufletului?', ['Rugaciune si fapte bune', 'Participand la slujbe', 'Har, credinta, fapte bune', 'Respectarea Poruncilor'], 'Har, credinta, fapte bune'),
		new FormatQuestion('Cand a avut loc Pogorarea Duhului Sfant peste Apostoli?', ['la 3 zile dupa Inviere', 'la 7 zile dupa Inviere', 'la 40 zile dupa Inviere', 'la 50 zile dupa Inviere'], 'la 50 zile dupa Inviere'),
		new FormatQuestion('Care este numarul Sfintelor Taine?', ['3', '5', '7', '9'], '7'),
		new FormatQuestion('Cine au fost primii oameni ceau raspandit crestinismul?', ['Ierarhii', 'Calugarii', 'Prorocii', 'Apostolii'], 'Apostolii'),
		new FormatQuestion('Care este numarul Fericirilor rostite de Domnul Iisus?', ['5', '7', '9', '12'], '9'),
		new FormatQuestion('Cum este denumit locasul de rugaciune al crestinilor?', ['Biserica', 'Sinagoga', 'Moschee', 'Casa de rugaciune'], 'Biserica'),
		new FormatQuestion('Cui sunt dedicate sarbatorile (praznicele) Imparatesti?', ['Imparatilor', 'Ingerilor', 'Sfintilor', 'Sfintei Treimi si Maicii Domnului'], 'Sfintei Treimi si Maicii Domnului'),
		new FormatQuestion('Ce trasaturi trebuie sa aiba prietenii adevarati?', ['Morali si altruisti', 'Distractivi si egoisti', 'Populari si prefacuti', 'Destepti si agresivi'], 'Morali si altruisti')
	];
	// Questionnaire initialization
	var quiz = new Questionnaire(questions);
	QuestionnaireFormat.displayNext();

});