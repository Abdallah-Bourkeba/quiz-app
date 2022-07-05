let stepWelcome = document.querySelector(".step-welcome");
let startBtn = document.querySelector(".btn-start");
let stepCreate = document.querySelector(".step-create");
let quizTitleInp = document.querySelector(".quiz-title-input");
let quizDurationInp = document.querySelector(".quiz-duration-input");
let quizContainerQuestions = document.querySelector(
	".questions-container-input"
);
let applyBtn = document.querySelector(".btn-apply");
let selectTypeInp = document.querySelector(".types");
let submitBtn = document.querySelector(".btn-submit");
let arrayToPushFromStepCreate = [];
let stepReload = document.querySelector(".step-reload");
let reloadBtn = document.querySelector(".btn-reload");
let stepGo = document.querySelector(".step-go");
let goBtn = document.querySelector(".btn-go");
let stepShow = document.querySelector(".step-show");
let quizTitleDiv = document.querySelectorAll(".quiz-title");
let questionContainerShow = document.querySelector(".questions-container-show");
let checkBtn = document.querySelector(".btn-check");
let nextBtn = document.querySelector(".btn-next");
let endBtn = document.querySelector(".btn-end");
let countOfCorrectQuestions = 0;
let countOfWrongQuestions = 0;
let againBtn = document.querySelector(".btn-again");
let downloadBtn = document.querySelector(".btn-download");
let resetBtn = document.querySelector(".btn-reset");
let overlay = document.querySelector(".overlay");
let answerCount = 1;
let allImageUrlValid = false;

function stepsChanger(from, to) {
	from.classList.remove("active");
	to.style.display = "flex";
	let set = setTimeout(() => {
		from.style.display = "none";
		to.classList.add("active");
	}, 300);
	if (to.classList.contains("active") && from.style.display == "none") {
		clearTimeout(set);
	}
}
