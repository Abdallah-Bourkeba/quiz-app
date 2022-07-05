// The First Part Of main.js File Before We Push The Array To LocalStorage
stepWelcome.classList.add("active");

submitBtn.onclick = () => {
	let quizTitle = quizTitleInp.value;
	let quizDuration = quizDurationInp.value;
	let allQuestions = quizContainerQuestions.children.length;
	let allRequirements = 0;

	arrayToPushFromStepCreate = [];

	arrayToPushFromStepCreate.push(quizTitle);
	arrayToPushFromStepCreate.push(quizDuration);

	for (let i = 0; i < quizContainerQuestions.children.length; i++) {
		let qTypeStr = quizContainerQuestions.children[i].dataset.qType;
		let questionElement = quizContainerQuestions.children[i];

		if (qTypeStr === "choose" || qTypeStr === "maltiAnswers") {
			let qTitle = questionElement.querySelector(".question-name-input").value;
			let qImageUrl = questionElement.querySelector(".image-url").value;
			let optionsArr = [];
			let correctArr = [];
			let optionsArrElements =
				questionElement.querySelectorAll(".option-input");
			let countOfFullOptions = 0;
			let optionsArrCorrect = questionElement.querySelectorAll(
				".option-input.correct"
			);
			for (let n = 0; n < optionsArrElements.length; n++) {
				if (optionsArrCorrect[n]) {
					correctArr.push(
						[...optionsArrElements].indexOf(optionsArrCorrect[n])
					);
				}
				if (optionsArrElements[n].value !== "") {
					++countOfFullOptions;
				}
				optionsArr.push(optionsArrElements[n].value);
			}
			if (
				qTitle !== "" &&
				correctArr[0] !== undefined &&
				countOfFullOptions === 4
			) {
				const questionObject = new QChoose(
					qTypeStr,
					qTitle,
					qImageUrl,
					returnRandomId(),
					optionsArr,
					correctArr
				);
				arrayToPushFromStepCreate.push(questionObject);
				++allRequirements;
			}
		} else if (qTypeStr === "match") {
			let qTitle = questionElement.querySelector(".question-name-input").value;
			let qImageUrl = questionElement.querySelector(".image-url").value;
			let rowArr = [];
			let countAllCellsFull = 0;
			let countAllCells = 0;

			for (
				let n = 0;
				n < questionElement.querySelectorAll(".row-container-input").length;
				n++
			) {
				const rowObject = { columnOne: "", columnTwo: "" };

				let currentRow = questionElement.querySelectorAll(
					".row-container-input"
				);
				for (let l = 0; l < 2; l++) {
					rowObject.columnOne =
						currentRow[n].querySelectorAll("input")[0].value;
					rowObject.columnTwo =
						currentRow[n].querySelectorAll("input")[1].value;

					++countAllCells;

					currentRow[n].querySelectorAll("input")[l].value !== ""
						? ++countAllCellsFull
						: "";
				}
				rowArr.push(rowObject);
			}

			if (qTitle !== "" && countAllCellsFull === countAllCells) {
				const questionObject = new QMatch(
					qTypeStr,
					qTitle,
					qImageUrl,
					returnRandomId(),
					rowArr
				);
				arrayToPushFromStepCreate.push(questionObject);
				++allRequirements;
			}
		} else if (qTypeStr === "complete") {
			let qTitle = questionElement.querySelector(
				".question-name-input"
			).innerHTML;
			let qImageUrl = questionElement.querySelector(".image-url").value;
			let answersArr = [];
			let countOfAnswersFull = 0;
			let countOfAnswers = 0;
			qTitle = qTitle.replace(/<span contenteditable="false">/gi, "<span>");

			let answersArrElements =
				questionElement.querySelector(".bottom-side").children;

			if (answersArrElements.length > 0) {
				for (let i = 0; i < answersArrElements.length; i++) {
					let array = [];
					const answerObject = { answerNumber: i + 1, answersArray: array };
					let ansewrElement = answersArrElements[i].querySelectorAll("input");

					for (let n = 0; n < ansewrElement.length; n++) {
						array.push(ansewrElement[n].value);
					}
					answersArr.push(answerObject);
				}
			}

			for (let i = 0; i < answersArr.length; i++) {
				for (let n = 0; n < answersArr[i].answersArray.length; n++) {
					++countOfAnswers;
					if (answersArr[i].answersArray[n] !== "") {
						++countOfAnswersFull;
					}
				}
			}

			if (qTitle !== "" && countOfAnswersFull === countOfAnswers) {
				const questionObject = new QComplete(
					qTypeStr,
					qTitle,
					qImageUrl,
					returnRandomId(),
					answersArr
				);
				arrayToPushFromStepCreate.push(questionObject);
				++allRequirements;
			}
		} else if (qTypeStr === "trueOrFalse") {
			let qTitle = questionElement.querySelector(".question-name-input").value;
			let qImageUrl = questionElement.querySelector(".image-url").value;
			let answerStr = questionElement
				.querySelectorAll(".bool.correct")[0]
				.innerHTML.toLowerCase();

			if (qTitle !== "") {
				const questionObject = new QTrueOrFalse(
					qTypeStr,
					qTitle,
					qImageUrl,
					returnRandomId(),
					answerStr
				);
				arrayToPushFromStepCreate.push(questionObject);
				++allRequirements;
			}
		} else if (qTypeStr === "typing") {
			let qTitle = questionElement.querySelector(".question-name-input").value;
			let qImageUrl = questionElement.querySelector(".image-url").value;
			let answersArr = [];
			let countOfAnswers = 0;
			let countOfAnswersFull = 0;
			let answersArrElements =
				questionElement.querySelectorAll(".answer-input");

			for (let i = 0; i < answersArrElements.length; i++) {
				answersArr.push(answersArrElements[i].value);
				++countOfAnswers;
				if (answersArrElements[i].value !== "") {
					++countOfAnswersFull;
				}
			}

			if (qTitle !== "" && countOfAnswers === countOfAnswersFull) {
				const questionObject = new QTyping(
					qTypeStr,
					qTitle,
					qImageUrl,
					returnRandomId(),
					answersArr
				);
				arrayToPushFromStepCreate.push(questionObject);
				++allRequirements;
			}
		}
	}
	if (
		allRequirements === allQuestions &&
		quizTitle !== "" &&
		quizDuration > 0 &&
		allQuestions > 0
	) {
		if (allImageUrlValid) {
			window.localStorage.setItem("editQuesions", "false");

			window.localStorage.removeItem("questions");
			window.localStorage.setItem(
				"questions",
				JSON.stringify(arrayToPushFromStepCreate)
			);
			stepsChanger(stepCreate, stepReload);

			reloadBtn.onclick = () => {
				window.location.reload();
			};
		} else {
			submitBtn.setAttribute(
				"data-error",
				"All Images Urls Should Be Valid Or Deleted"
			);
			submitBtn.classList.add("error");
			setTimeout(() => {
				submitBtn.classList.remove("error");
			}, 5000);
		}
	} else {
		submitBtn.setAttribute("data-error", "Fill All Inputs Field First");
		submitBtn.classList.add("error");
		setTimeout(() => {
			submitBtn.classList.remove("error");
		}, 5000);
	}
};

function returnRandomId() {
	let id = "";
	for (let i = 0; i < 6; i++) {
		id += Math.floor(Math.random() * 9);
	}
	return id;
}

class Question {
	constructor(qType, qTitle, qImageUrl, qId) {
		this.qType = qType;
		this.qTitle = qTitle;
		this.qImageUrl = qImageUrl;
		this.qId = qId;
	}
}

class QChoose extends Question {
	constructor(qType, qTitle, qImageUrl, qId, optionsArr, correctArr) {
		super(qType, qTitle, qImageUrl, qId);
		this.optionsArr = optionsArr;
		this.correctArr = correctArr;
	}
}

class QMatch extends Question {
	constructor(qType, qTitle, qImageUrl, qId, rowArr) {
		super(qType, qTitle, qImageUrl, qId);
		this.rowArr = rowArr;
	}
}

class QComplete extends Question {
	constructor(qType, qTitle, qImageUrl, qId, answersArr) {
		super(qType, qTitle, qImageUrl, qId);
		this.answersArr = answersArr;
	}
}

class QTrueOrFalse extends Question {
	constructor(qType, qTitle, qImageUrl, qId, answerStr) {
		super(qType, qTitle, qImageUrl, qId);
		this.answerStr = answerStr;
	}
}

class QTyping extends QComplete {
	constructor(qType, qTitle, qImageUrl, qId, answersArr) {
		super(qType, qTitle, qImageUrl, qId, answersArr);
	}
}

// The Second Part Of main.js File After We Push The Array To LocalStorage

if (window.localStorage.getItem("editQuesions") === "true") {
	startHandlerEditJSFile();
} else if (window.localStorage.getItem("questions") !== null) {
	let questionArrayFromLoaclStorage = JSON.parse(
		window.localStorage.getItem("questions")
	);
	quizTitleDiv.forEach((titleDiv) => {
		titleDiv.innerHTML = questionArrayFromLoaclStorage[0];
	});
	stepsChanger(stepWelcome, stepGo);

	let lableIdCounter = 0;
	let parser = new DOMParser();
	let imageShowStr = `
	<div class="image">
		<img src="">
	</div>`;

	goBtn.onclick = () => {
		checkBtn.classList.remove("error");
		stepsChanger(stepGo, stepShow);
		for (let i = 2; i < questionArrayFromLoaclStorage.length; i++) {
			let objectQ = questionArrayFromLoaclStorage[i];

			if (objectQ.qType === "choose") {
				let parentElement = pushStringToShow(chooseShowQuestionFunction());
				let qTitle = parentElement.querySelector(".question-title-show");
				let qOptions = parentElement.querySelectorAll(".question-option");
				let optionsFromArray = [...randomOrderArray([...qOptions])];

				qTitle.innerHTML = objectQ.qTitle;
				parentElement.setAttribute("data-id", objectQ.qId);
				parentElement.setAttribute("data-qType", objectQ.qType);
				for (let n = 0; n < qOptions.length; n++) {
					qOptions[n].innerHTML = objectQ.optionsArr[n];
					qOptions[n].classList.add("wrong");
					if (objectQ.correctArr[n] !== undefined) {
						qOptions[objectQ.correctArr[n]].className =
							"question-option correct";
					}
					if (qOptions[n].classList.contains("correct")) {
						qOptions[n].classList.remove("wrong");
					}
					parentElement
						.querySelector(".question-options-container-show")
						.appendChild(optionsFromArray[n]);
				}

				if (objectQ.qImageUrl !== "") {
					let doc = parser.parseFromString(imageShowStr, "text/html");
					parentElement.prepend(doc.body.firstChild);

					parentElement
						.querySelector(".image img")
						.setAttribute("src", objectQ.qImageUrl);
				}
			} else if (objectQ.qType === "maltiAnswers") {
				let parentElement = pushStringToShow(
					maltiAnswersShowQuestionFunction()
				);
				let qTitle = parentElement.querySelector(".question-title-show");
				let qOptions = parentElement.querySelectorAll("label");
				let qOptionsInput = parentElement.querySelectorAll("input");
				let optionContaner =
					parentElement.querySelectorAll(".option-container");
				let optionsFromArray = [...randomOrderArray([...optionContaner])];

				qTitle.innerHTML = objectQ.qTitle;
				parentElement.setAttribute("data-id", objectQ.qId);
				parentElement.setAttribute("data-qType", objectQ.qType);
				for (let n = 0; n < qOptions.length; n++) {
					qOptions[n].innerHTML = objectQ.optionsArr[n];
					qOptions[n].classList.add("wrong");
					if (objectQ.correctArr[n] !== undefined) {
						qOptions[objectQ.correctArr[n]].className = "correct";
					}
					if (qOptions[n].classList.contains("correct")) {
						qOptions[n].classList.remove("wrong");
					}
					parentElement
						.querySelector(".question-options-container-show")
						.appendChild(optionsFromArray[n]);
					qOptions[n].setAttribute(`for`, lableIdCounter);
					qOptionsInput[n].setAttribute(`id`, lableIdCounter);
					lableIdCounter++;
				}

				if (objectQ.qImageUrl !== "") {
					let doc = parser.parseFromString(imageShowStr, "text/html");
					parentElement.prepend(doc.body.firstChild);

					parentElement
						.querySelector(".image img")
						.setAttribute("src", objectQ.qImageUrl);
				}
			} else if (objectQ.qType === "match") {
				let parentElement = pushStringToShow(matchShowQuestionFunction());
				let qTitle = parentElement.querySelector(".question-title-show");
				let columnOne = parentElement.querySelector(".left-side");
				let columnTwo = parentElement.querySelector(".right-side");
				let currentArrayOne = [];
				let parser = new DOMParser();
				let htmlString = `
					<div class="container-item">
						<div class="item-content"></div>
						<div class="arrow-to-match"></div>
					</div>`;

				qTitle.innerHTML = objectQ.qTitle;
				parentElement.setAttribute("data-id", objectQ.qId);
				parentElement.setAttribute("data-qType", objectQ.qType);

				for (let n = 0; n < objectQ.rowArr.length; n++) {
					let doc1 = parser.parseFromString(htmlString, "text/html");
					let doc2 = parser.parseFromString(htmlString, "text/html");
					currentArrayOne.push(doc1.body.firstChild);
					columnTwo.appendChild(doc2.body.firstChild);

					currentArrayOne[n].children[0].innerHTML =
						objectQ.rowArr[n].columnOne;
					[...columnTwo.children][n].children[0].innerHTML =
						objectQ.rowArr[n].columnTwo;
				}

				let optionsFromArrayOne = randomOrderArray([...currentArrayOne]);

				for (let n = 0; n < objectQ.rowArr.length; n++) {
					columnOne.appendChild(optionsFromArrayOne[n]);
				}

				if (objectQ.qImageUrl !== "") {
					let doc = parser.parseFromString(imageShowStr, "text/html");
					parentElement.prepend(doc.body.firstChild);

					parentElement
						.querySelector(".image img")
						.setAttribute("src", objectQ.qImageUrl);
				}
			} else if (objectQ.qType === "complete") {
				let parentElement = pushStringToShow(completeShowQuestionFunction());
				let qTitle = parentElement.querySelector(".question-title-show");
				let answersContainer = parentElement.querySelector(
					".question-answer-container-show"
				);
				let parser = new DOMParser();
				let htmlString = `
					<div class="container-option">
            <div class="answer-number"></div>
            <input title="Your Answer" placeholder="Your Answer" type="text" class="inp question-answer" />
          </div>`;

				qTitle.innerHTML = objectQ.qTitle;
				parentElement.setAttribute("data-id", objectQ.qId);
				parentElement.setAttribute("data-qType", objectQ.qType);

				for (let n = 0; n < objectQ.answersArr.length; n++) {
					let doc = parser.parseFromString(htmlString, "text/html");
					answersContainer.appendChild(doc.body.firstChild);
					let answerNumber = parentElement.querySelectorAll(".answer-number");
					answerNumber[n].innerHTML = objectQ.answersArr[n].answerNumber;
				}

				if (objectQ.qImageUrl !== "") {
					let doc = parser.parseFromString(imageShowStr, "text/html");
					parentElement.prepend(doc.body.firstChild);

					parentElement
						.querySelector(".image img")
						.setAttribute("src", objectQ.qImageUrl);
				}
			} else if (objectQ.qType === "trueOrFalse") {
				let parentElement = pushStringToShow(trueOrFalseShowQuestionFunction());
				let qTitle = parentElement.querySelector(".question-title-show");

				qTitle.innerHTML = objectQ.qTitle;
				parentElement.setAttribute("data-id", objectQ.qId);
				parentElement.setAttribute("data-qType", objectQ.qType);

				if (objectQ.qImageUrl !== "") {
					let doc = parser.parseFromString(imageShowStr, "text/html");
					parentElement.prepend(doc.body.firstChild);

					parentElement
						.querySelector(".image img")
						.setAttribute("src", objectQ.qImageUrl);
				}
			} else if (objectQ.qType === "typing") {
				let parentElement = pushStringToShow(typingShowQuestionFunction());
				let qTitle = parentElement.querySelector(".question-title-show");

				qTitle.innerHTML = objectQ.qTitle;
				parentElement.setAttribute("data-id", objectQ.qId);
				parentElement.setAttribute("data-qType", objectQ.qType);

				if (objectQ.qImageUrl !== "") {
					let doc = parser.parseFromString(imageShowStr, "text/html");
					parentElement.prepend(doc.body.firstChild);

					parentElement
						.querySelector(".image img")
						.setAttribute("src", objectQ.qImageUrl);
				}
			}
		}
		startHandlerShowJSFile();
	};
}

function randomOrderArray(array) {
	let result = [];
	for (let i = 0; ; i++) {
		if (array.length !== 0) {
			let randomNumber = Math.floor(Math.random() * array.length);
			result.push(array[randomNumber]);
			array.splice(randomNumber, 1);
		} else {
			break;
		}
	}
	return result;
}

function chooseShowQuestionFunction() {
	let htmlString = `
			<div class="question-show choose-question-show from">
        <div class="question-title-show"></div>
        <div class="question-options-container-show">
          <div class="question-option"></div>
          <div class="question-option"></div>
          <div class="question-option"></div>
          <div class="question-option"></div>
        </div>
      </div>`;
	return htmlString;
}

function maltiAnswersShowQuestionFunction() {
	let htmlString = `
	      <div class="question-show muti-answers-question-show from">
        <div class="question-title-show"> </div>
        <div class="question-options-container-show">
          <div class="option-container">
            <input type="checkbox" id="one">
            <label for="one"></label>
          </div>
          <div class="option-container">
            <input type="checkbox" id="two">
            <label for="two"></label>
          </div>
          <div class="option-container">
            <input type="checkbox" id="three">
            <label for="three"></label>
          </div>
          <div class="option-container">
            <input type="checkbox" id="four">
            <label for="four"></label>
          </div>
        </div>
      </div>`;
	return htmlString;
}

function matchShowQuestionFunction() {
	let htmlString = `
	      <div class="question-show match-question-show from">
        <div class="question-title-show"> </div>
        <div class="question-answer-container-show">
          <div class="right-side">
          </div>
          <div class="left-side">
          </div>
        </div>
      </div>`;
	return htmlString;
}

function completeShowQuestionFunction() {
	let htmlString = `
	      <div class="question-show complete-question-show from">
        <div class="question-title-show"></div>
        <div class="question-answer-container-show">
        </div>
      </div>`;
	return htmlString;
}

function trueOrFalseShowQuestionFunction() {
	let htmlString = `
	      <div class="question-show true-false-question-show from">
        <div class="question-title-show"> </div>
        <div class="question-options-container-show">
          <div class="question-option">True</div>
          <div class="question-option">False</div>
        </div>
      </div>`;
	return htmlString;
}

function typingShowQuestionFunction() {
	let htmlString = `
	      <div class="question-show typing-question-show from">
        <div class="question-title-show"> </div>
        <div class="question-answer-container-show">
          <input title="Required" type="text" class="inp question-answer" placeholder="Your Answer" />
        </div>
      </div>`;
	return htmlString;
}

function pushStringToShow(htmlString) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(htmlString, "text/html");
	let element = doc.body.firstChild;
	questionContainerShow.appendChild(element);
	return element;
}
