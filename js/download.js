downloadBtn.onclick = () => {
	let arrayToPushInHTMLFile = JSON.stringify(
		JSON.parse(window.localStorage.getItem("questions"))
	);
	download(generatHTMLContent(arrayToPushInHTMLFile));

	function download(text) {
		var element = document.createElement("a");
		element.setAttribute(
			"href",
			"data:text/plain;charset=utf-8," + encodeURIComponent(text)
		);
		element.setAttribute("download", "index.html");
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
	false;
};

function generatHTMLContent(arr) {
	let HTMLContent = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <title>Quiz App</title>
  <link rel="shortcut icon" href="https://abdallah-mohamed-sayed.github.io/quiz-app/images/logo-icon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet" />
  <style>
  * {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

:root {
	--main-color: #2196f3;
	--main-hover: #0089f5;
	--transition: 0.3s;
}

body {
	background-color: #eee;
	overflow: hidden;
	font-family: "Open Sans", sans-serif;
}

/* Start Global Staying */
.step {
	box-shadow: 0 0 10px 1px #d0d0d0;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scale(0);
	opacity: 0;
	z-index: -10;
	width: 450px;
	background-color: white;
	padding: 30px 20px;
	border-radius: 6px;
	transition: var(--transition);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	flex-direction: column;
}
.step.active {
	transform: translate(-50%, -50%) scale(1);
	opacity: 1;
	z-index: 1;
}

.image {
	max-width: 200px;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.image .error {
	text-align: center;
	font-size: 15px;
	color: white;
	user-select: none;
	background-color: #f44336;
	padding: 2px 5px;
	border-radius: 6px;
	transform-origin: center bottom;
	transform: scale(0);
	opacity: 0;
	transition: var(--transition);
}
.image .error.active {
	transform: scale(1);
	opacity: 1;
}

.image img {
	-webkit-user-drag: none;
	user-select: none;
	width: 100%;
}

.inp {
	border-radius: 6px;
	width: 100%;
	padding: 10px 15px;
	outline: none;
	caret-color: var(--main-hover);
	border: 1px solid var(--main-hover);
	font-size: 17px;
	transition: 0.3s;
	position: relative;
}
.inp:hover {
	background-color: #fafafa;
}
.inp:focus {
	border-width: 2px;
}

.main-heading {
	text-align: center;
	color: var(--main-hover);
	width: 100%;
	padding: 5px;
	font-size: 23px;
	border-radius: 6px;
	transition: var(--transition);
	user-select: none;
	font-weight: bold;
}
.main-heading:hover {
	background-color: var(--main-hover);
	color: white;
	opacity: 0.7;
}
.main-heading.question-type {
	font-size: 20px;
}

.description {
	text-align: center;
	background-color: #eee;
	padding: 5px;
	border-radius: 6px;
	user-select: none;
	width: 100%;
	font-size: 15px;
}

.add-and-remove-answer-btns {
	display: flex;
	gap: 10px;
	width: 100%;
	justify-content: flex-end;
}

.add-and-remove-answer-btns > div {
	width: 40px;
	font-weight: bold;
}

.btn {
	text-align: center;
	font-size: 20px;
	background-color: var(--main-color);
	color: white;
	padding: 5px 10px;
	width: 100%;
	text-transform: uppercase;
	border-radius: 6px;
	transition: var(--transition);
	user-select: none;
	cursor: pointer;
	position: relative;
}
.btn:hover {
	background-color: var(--main-hover);
}
.remove-question-btn {
	position: absolute;
	background-color: #f44336;
	right: 20px;
	bottom: 10px;
	width: max-content;
	font-size: initial;
}
.remove-question-btn:hover {
	background-color: red;
}
.btn[data-description]::before {
	content: attr(data-description);
	position: absolute;
	transition: var(--transition);
	font-size: 13px;
	color: white;
	padding: 2px 5px;
	background-color: #f44336;
	border-radius: 6px;
	z-index: 100000;
	font-weight: normal;
	width: max-content;
	top: -25px;
	left: 50%;
	transform-origin: bottom;
	transform: translateX(-50%) scale(0);
}
.btn[data-description]:hover::before {
	transition-delay: 1s;
	transform: translateX(-50%) scale(1);
}
.btn[data-error]::before {
	content: attr(data-error);
	position: absolute;
	transition: var(--transition);
	font-size: 13px;
	color: white;
	padding: 2px 5px;
	background-color: #f44336;
	border-radius: 6px;
	z-index: 100000;
	font-weight: normal;
	width: max-content;
	bottom: -25px;
	cursor: no-drop;
	left: 50%;
	text-transform: capitalize;
	transform-origin: top;
	opacity: 0;
	transform: translateX(-50%) scale(0);
}
.btn[data-error].error::before {
	opacity: 1;
	transform: translateX(-50%) scale(1);
}
/* End Global Styling */
/* Start Styling Before Show Step */

.step-welcome .welcome {
	font-size: 30px;
}

.step-create .quiz-title-input-container {
	display: flex;
	gap: 10px;
	width: 100%;
	padding: 20px;
	border-radius: 6px;
	background-color: #eee;
}

.step-create .quiz-title-input-container .quiz-duration-input {
	max-width: 85px;
}

.questions-container-input {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	max-height: 450px;
	overflow-x: hidden;
	overflow-y: auto;
}

.control-btns {
	display: flex;
	gap: 10px;
	flex-direction: column;
	width: 100%;
}

.control-btns .choose-type-controls {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	width: 100%;
	position: relative;
}

.control-btns .choose-type-controls .types {
	padding: 7px 10px;
	font-size: 18px;
	outline: none;
	border-radius: 6px;
	border: 1px solid var(--main-hover);
	transition: var(--transition);
	width: 100%;
}
.control-btns .choose-type-controls .types:focus {
	border-width: 2px;
}

.control-btns .btn-apply {
	width: fit-content;
}

.step-go .main-heading {
	font-size: 18px;
}

.step-go .quiz-title {
	font-size: 35px;
	width: fit-content;
	font-weight: bold;
}

.step-show .quiz-title {
	font-weight: bold;
	color: var(--main-hover);
	user-select: none;
	width: 100%;
	padding: 5px;
	text-align: center;
	border-radius: 6px;
	transition: var(--transition);
}
.step-show .quiz-title:hover {
	background-color: var(--main-hover);
	color: white;
	opacity: 0.7;
}

.step-show .control-quiz {
	color: var(--main-hover);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px;
	transition: 0.3s;
	user-select: none;
	border-radius: 6px;
	gap: 25px;
	font-size: 20px;
	width: 100%;
	background-color: #eee;
}

.step-show .control-quiz > div:not(.ratio),
.step-show .control-quiz .ratio > div {
	padding: 5px 10px;
	transition: 0.3s;
	border-radius: 6px;
	position: relative;
}
.step-show .control-quiz > div:not(.ratio):hover,
.step-show .control-quiz .ratio > div:hover {
	background-color: #f44336;
	color: white;
}
.step-show .control-quiz > div:not(.ratio)::before,
.step-show .control-quiz .ratio > div::before {
	content: attr(data-message);
	position: absolute;
	transition: 0.3s;
	font-size: 13px;
	color: white;
	padding: 2px 5px;
	background-color: #f44336;
	border-radius: 6px;
	z-index: 10;
	width: max-content;
	bottom: 45px;
	left: 50%;
	transform-origin: bottom;
	transform: translateX(-50%) scale(0);
}
.step-show .control-quiz > div:not(.ratio):hover::before,
.step-show .control-quiz .ratio > div:hover::before {
	transition-delay: 0.3s;
	transform: translateX(-50%) scale(1);
}

.step-show .control-quiz .ratio {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
}

.questions-container-show {
	width: 100%;
	position: relative;
}

.step-show .control-btns {
	display: flex;
	width: 100%;
}

.step-show .btn-next,
.step-show .btn-end {
	display: none;
}
.step-show .btn-end {
	background-color: #009636;
}
.step-show .btn-end:hover {
	background-color: #017c2d;
}

/* End Styling All */

.question {
	display: flex;
	flex-direction: column;
	gap: 10px;
	background-color: #eee;
	position: relative;
	border-radius: 6px;
	padding: 20px;
	padding-bottom: 52px;
}

.top-side {
	display: flex;
	gap: 10px;
}

.bottom-side {
	display: flex;
	gap: 10px;
	width: 100%;
	flex-direction: column;
	padding: 10px;
	box-shadow: 0 0 10px 1px #d0d0d0;
	border-radius: 6px;
	justify-content: center;
	align-items: center;
}

.typing-question-input .answer-container-input,
.malti-answers-question-input .option-container-input,
.choose-question-input .option-container-input {
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 10px;
}

.malti-answers-question-input .option-container-input input.correct,
.choose-question-input .option-container-input input.correct {
	border-width: 2px;
	border-color: #009636;
}

.malti-answers-question-input .mk-corct-btn,
.choose-question-input .mk-corct-btn {
	font-size: 13px;
	color: #1d87de;
	user-select: none;
	font-weight: bold;
	display: block;
	align-items: center;
	cursor: pointer;
	padding: 10px 15px;
	border-radius: 6px;
	transition: background-color 0.3s;
	width: fit-content;
	height: 100%;
}
.malti-answers-question-input .mk-corct-btn:hover,
.choose-question-input .mk-corct-btn:hover {
	background-color: #009636;
	color: white;
}

.true-and-false-question-input .bool {
	border: 1px solid #2196f3;
	padding: 5px;
	user-select: none;
	cursor: pointer;
	color: #1d87de;
	background-color: white;
	transition: 0.3s;
	font-size: 15px;
	border-radius: 6px;
	text-align: center;
	width: 90%;
}
.true-and-false-question-input .bool:hover {
	background-color: #fafafa;
}
.true-and-false-question-input .bool.correct {
	font-weight: bold;
	color: #009636;
	border: 2px solid #009636;
}

.typing-question-input .answer-container-input .status-element-for-input {
	font-size: 13px;
	color: #1d87de;
	user-select: none;
	font-weight: bold;
	display: block;
	align-items: center;
	width: 80px;
	padding: 10px 15px;
	border-radius: 6px;
	transition: background-color 0.3s;
	height: 100%;
}

.match-question-input .column-a-and-b {
	display: flex;
	width: 100%;
	color: var(--main-hover);
	user-select: none;
	font-weight: bold;
	font-size: 30px;
	justify-content: space-around;
	align-items: center;
	line-height: 27px;
}

.typing-question-input .container-input,
.match-question-input .container-input {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.match-question-input .row-container-input {
	display: flex;
	gap: 10px;
	justify-content: center;
	align-items: center;
}

.match-question-input .arrow-to-right {
	width: 100px;
	user-select: none;
}

.complete-question-input .top-side {
	flex-direction: column;
}

.complete-question-input .question-title-input-container {
	gap: 10px;
	display: flex;
}

.complete-question-input .question-name-input {
	background-color: white;
	overflow-x: auto;
	width: 100%;
}
.complete-question-input .question-name-input:hover {
	background-color: #fafafa;
}

.complete-question-input .question-name-input span,
.complete-question-input .answer-number {
	width: 25px;
	height: 25px;
	display: inline-flex;
	justify-content: center;
	margin: 0 3px;
	user-select: none;
	align-items: center;
	border-radius: 50%;
	background-color: var(--main-color);
	color: white;
	font-weight: bold;
}

.complete-question-input .add-answer {
	width: fit-content;
	font-size: 16px;
	height: 43px;
	display: flex;
	align-items: center;
}

.complete-question-input .row-container-answer-input {
	display: flex;
	gap: 5px;
	width: 100%;
	align-items: center;
}

.complete-question-input .answers-container-input {
	overflow-x: auto;
	display: flex;
	gap: 5px;
	width: 100%;
	padding-bottom: 4px;
	align-items: center;
}
.complete-question-input .answers-container-input::-webkit-scrollbar {
	height: 7px;
}
.complete-question-input .answers-container-input::-webkit-scrollbar-thumb {
	background-color: var(--main-hover);
}

.complete-question-input .answer-number {
	margin: 0;
	display: flex;
	width: 37px;
}

.complete-question-input .answer {
	background-color: var(--main-color);
	color: white;
	padding: 8px 10px;
	caret-color: white;
	border: none;
	width: 90px;
}
.complete-question-input .answer::placeholder {
	color: #ffffffb8;
}

.complete-question-input .add-and-remove-answer-btns {
	gap: 5px;
	position: sticky;
	right: 0;
	background-color: white;
	width: fit-content;
	padding: 5px;
	border-radius: 6px;
	box-shadow: 0 0 10px 1px #d0d0d0;
}
.complete-question-input .add-and-remove-answer-btns > div {
	font-size: 15px;
	width: 30px;
	height: 30px;
}
/* Start Styling After Show Step */
.question-show {
	display: flex;
	flex-direction: column;
	gap: 10px;
	background-color: #eee;
	padding: 10px;
	border-radius: 6px;
	transition: opacity 0.3s, transform 0.3s;
}

.question-show.from,
.question-show.to {
	position: absolute;
	opacity: 0;
	transform: scaleX(0);
}
.question-show.to {
	right: 0;
}
.question-show.from {
	left: 0;
}

.question-show.active {
	position: relative;
	opacity: 1;
	transform: scaleX(1);
}

.question-show .question-title-show {
	font-size: 20px;
	text-align: start;
	background-color: #cfcfcf;
	border-radius: 6px;
	padding: 7px 10px;
	transition: 0.3s;
	user-select: none;
	cursor: text;
}

.question-show .question-options-container-show {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
}

.question-show .question-option,
.muti-answers-question-show .option-container label {
	padding: 5px 10px;
	background-color: var(--main-color);
	color: white;
	border-radius: 6px;
	cursor: pointer;
	user-select: none;
	transition: var(--transition);
	display: flex;
	align-items: center;
	justify-content: center;
}

.question-show .question-option:hover,
.muti-answers-question-show .option-container label:hover {
	background-color: var(--main-hover);
}

.typing-question-show .question-answer {
	width: 90%;
	margin: 0 50%;
	transform: translateX(-50%);
}

.match-question-show .question-answer-container-show {
	display: flex;
	justify-content: space-between;
	flex-direction: row-reverse;
	align-items: center;
	padding: 0 10px;
}

.match-question-show .right-side,
.match-question-show .left-side {
	display: flex;
	gap: 10px;
	flex-direction: column;
}

.match-question-show .container-item {
	display: grid;
	grid-template-columns: 1fr 25px;
	justify-content: center;
	align-items: center;
	gap: 5px;
}
.match-question-show .right-side .container-item {
	grid-template-columns: 25px 1fr;
}

.match-question-show .item-content {
	padding: 5px 10px;
	background-color: var(--main-hover);
	color: white;
	border-radius: 6px;
	user-select: none;
	transition: 0.3s;
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: center;
}

.match-question-show .arrow-to-match {
	color: var(--main-hover);
	min-height: 32px;
	font-weight: bold;
	justify-content: center;
	background-color: white;
	cursor: pointer;
	display: flex;
	user-select: none;
	border-radius: 6px;
	border: 5px solid var(--main-hover);
	position: relative;
}
.match-question-show .right-side .arrow-to-match {
	cursor: default;
}

.match-question-show .arrow-to-match .options {
	position: absolute;
	left: 20px;
	width: 70px;
	font-size: 17px;
	top: 50%;
	transform: translateY(-50%);
	outline: none;
}

.muti-answers-question-show .option-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.muti-answers-question-show .option-container input {
	outline: none;
	appearance: none;
}

.muti-answers-question-show .option-container label {
	position: relative;
	width: 100%;
	margin-left: 25px;
}
.muti-answers-question-show .option-container input:checked + label {
	background-color: #2196f380;
}

.muti-answers-question-show .option-container label::before {
	content: "";
	position: absolute;
	width: 15px;
	height: 15px;
	border: 1px solid var(--main-color);
	top: 50%;
	left: -25px;
	transform: translateY(-50%);
}
.muti-answers-question-show .option-container input:checked + label::before {
	border-color: #2196f380;
}

.muti-answers-question-show .option-container label::after {
	content: "";
	width: 10px;
	height: 10px;
	position: absolute;
	top: 50%;
	left: -17px;
	transform: translate(-4.5px, -50%);
	transition: 0.5s;
}

.muti-answers-question-show .option-container input:checked + label::after {
	background-color: #2196f380;
}

.complete-question-show .question-title-show {
	align-items: center;
}

.complete-question-show .question-title-show span,
.complete-question-show .answer-number {
	width: 25px;
	height: 25px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 4px;
	user-select: none;
	cursor: default;
	border-radius: 50%;
	background-color: var(--main-hover);
	color: white;
	font-weight: bold;
	font-size: 17px;
}

.complete-question-show .question-answer-container-show {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.complete-question-show .container-option {
	display: flex;
	gap: 5px;
	justify-content: center;
	align-items: center;
}

.complete-question-show .answer-number {
	margin: 0;
	display: flex;
	width: 28px;
}

.overlay {
	display: none;
	position: absolute;
	background-color: #000000b0;
	width: 100vw;
	height: 100vh;
	top: 50%;
	transform: translate(-50%, -50%);
	left: -100%;
	opacity: 0;
	transition: left var(--transition), opacity var(--transition);
	backdrop-filter: blur(2px);
}
.overlay.active {
	opacity: 1;
	left: 50%;
}

.popup {
	box-shadow: none;
	opacity: 1;
	align-items: stretch;
	transform: translate(-50%, -50%) scale(1);
}

.btns-final {
	display: flex;
	gap: 15px;
}
/* Start Get Answers */

.question-show .selected {
	background-color: #2196f380;
	cursor: default;
}
.question-show .selected:hover {
	background-color: #2196f380;
}

.true-false-question-show
	.question-options-container-show.active
	.question-option.wrong,
.muti-answers-question-show .question-options-container-show.active label.wrong,
.choose-question-show
	.question-options-container-show.active
	.question-option.wrong {
	background-color: #f44336;
	cursor: no-drop;
}
.true-false-question-show
	.question-options-container-show.active
	.question-option.correct,
.muti-answers-question-show
	.question-options-container-show.active
	label.correct,
.choose-question-show
	.question-options-container-show.active
	.question-option.correct {
	background-color: #009636;
	cursor: no-drop;
}
.true-false-question-show
	.question-options-container-show.active
	.question-option.selected,
.muti-answers-question-show
	.question-options-container-show.active
	label.selected,
.choose-question-show
	.question-options-container-show.active
	.question-option.selected {
	opacity: 0.5;
}

.typing-question-show .inp.correct,
.complete-question-show .inp.correct,
.muti-answers-question-show
	.question-options-container-show.active
	.option-container
	label.correct::before {
	border-color: #009636;
}
.complete-question-show .answer-number.correct,
.muti-answers-question-show
	.question-options-container-show.active
	.option-container
	label.correct::after {
	background-color: #009636;
}

.typing-question-show .inp.wrong,
.complete-question-show .inp.wrong,
.muti-answers-question-show
	.question-options-container-show.active
	.option-container
	label.wrong::before {
	border-color: #f44336;
}
.complete-question-show .answer-number.wrong,
.muti-answers-question-show
	.question-options-container-show.active
	.option-container
	label.wrong::after {
	background-color: #f44336;
}

@media (max-width: 600px) {
	.step {
		width: 370px;
	}
}

  </style>
</head>

<body>
  <div class="step step-go">
    <div class="main-heading go">Quiz</div>
    <div class="quiz-title"></div>
    <div class="description">
      Answer The Following Questions
    </div>
    <div class="btn btn-go">Go</div>
  </div>
  <div class="step step-show">
    <div class="quiz-title"></div>
    <div class="control-quiz">
      <div class="ratio">
        <div data-message="Total Questions" class="count"></div>
        <span class="arrow">→</span>
        <div data-message="Finished Questions" class="finshed-count">0</div>
      </div>
      <div data-message="Time To Finish The Quiz" class="timer-down"></div>
      <div data-message="Correct Answers" class="count-true-q">0</div>
      <div data-message="Wrong Answers" class="count-false-q">0</div>
    </div>
    <div class="questions-container-show"></div>
    <div class="control-btns">
      <div data-error="You Should Answer This Question" class="btn btn-check">check</div>
      <div class="btn btn-next">next</div>
      <div class="btn btn-end">end</div>
    </div>
    <div class="overlay">
      <div class="popup step">
        <div class="final-message main-heading"></div>
        <div class="control-quiz">
          <div data-message="Total Questions" class="count"></div>
          <div data-message="You Have Finished The Quiz In This Time" class="timer-finished"></div>
          <div data-message="Correct Answers" class="count-true-q">0</div>
          <div data-message="Wrong Answers" class="count-false-q">0</div>
        </div>
        <div class="btns-final">
          <div class="btn btn-again">again</div>
        </div>
      </div>
    </div>
  </div>

  <script>
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
let arrToPushToLS = ${arr};

window.localStorage.setItem("questions", JSON.stringify(arrToPushToLS));

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

function startHandlerShowJSFile() {
	overlayRemoveActiveFunc();
	endBtn.style.display = "none";
	checkBtn.style.display = "block";

	let qeustionsArray = randomOrderArray([
		...document.querySelectorAll(".question-show"),
	]);
	let totalQCount = document.querySelectorAll(".count");
	totalQCount.forEach((e) => {
		e.innerHTML = qeustionsArray.length;
	});
	for (let i = 0; i < qeustionsArray.length; i++) {
		document
			.querySelectorAll(".question-show")[0]
			.parentElement.appendChild(qeustionsArray[i]);
	}
	let indexOfCurrentQ = 0;
	let qeustionsArrayFromDOM = document.querySelectorAll(".question-show");
	let currentQ = qeustionsArrayFromDOM[indexOfCurrentQ];
	currentQ.classList.add("active");

	nextBtnFunc();
	function nextBtnFunc() {
		// Start Match Handler
		let mattchRightColumns = currentQ.querySelectorAll(
			".match-question-show .right-side .container-item"
		);
		let rowNumber = 0;
		let aviliOptionsArr = [];
		mattchRightColumns.forEach((rightColumn) => {
			let reversedArr = [];
			for (let i = 0; i < rightColumn.children.length; i++) {
				reversedArr.push(rightColumn.children[i]);
				rightColumn.appendChild(reversedArr[i]);
			}
		});
		for (let i = 0; i < mattchRightColumns.length; i++) {
			rowNumber += 1;
			mattchRightColumns[i].children[0].innerHTML = rowNumber;
			aviliOptionsArr.push(rowNumber);
		}

		let arrowsToMatch = currentQ.querySelectorAll(
			".match-question-show .left-side .arrow-to-match"
		);
		arrowsToMatch.forEach((arrow) => {
			arrow.onclick = () => {
				arrowsToMatch.forEach((a) => {
					if (a.children.length > 0 && arrow !== a) {
						a.children[0].remove();
					}
					if (a.getAttribute("data-answer") !== null) {
						aviliOptionsArr = arrayRemove(
							aviliOptionsArr,
							a.getAttribute("data-answer")
						);
					}
				});
				if (
					typeof parseInt(arrow.getAttribute("data-answer")) === "number" &&
					arrow.getAttribute("data-answer") !== "" &&
					arrow.getAttribute("data-answer") !== null
				) {
					aviliOptionsArr.push(arrow.getAttribute("data-answer"));
				}
				if (arrow.children.length === 0) {
					let options = document.createElement("select");
					options.className = "options";
					for (let i = 0; i < aviliOptionsArr.length; i++) {
						let option = document.createElement("option");
						option.innerHTML = aviliOptionsArr[i];
						option.className = "option";
						options.appendChild(option);
					}
					let defaltOption = document.createElement("option");
					defaltOption.innerHTML = "Select";
					defaltOption.setAttribute("selected", "selected");
					options.prepend(defaltOption);
					arrow.appendChild(options);

					arrow.onmouseleave = () => {
						if (
							options.value !== defaltOption.textContent &&
							options.value !== ""
						) {
							arrow.innerHTML = options.value;
							arrow.setAttribute("data-answer", options.value);
						} else {
							options.value = "";
							arrow.innerHTML = options.value;
							arrow.setAttribute("data-answer", options.value);
						}
					};
				}
			};
		});
		// End Match Handler
		// Start Choose Handler
		let chooseOption = currentQ.querySelectorAll(
			".choose-question-show .question-option"
		);
		chooseOption.forEach((option) => {
			option.onclick = () => {
				chooseOption.forEach((o) => {
					if (
						o.classList.contains("selected") &&
						!option.parentElement.classList.contains("active")
					) {
						o.classList.remove("selected");
					}
				});

				if (!option.parentElement.classList.contains("active")) {
					option.classList.add("selected");
				}
			};
		});
		// End Choose Handler
		// Start Multiple Answers Handler
		let maltiOptions = currentQ.querySelectorAll(
			".muti-answers-question-show .option-container label"
		);
		maltiOptions.forEach((option) => {
			option.onclick = () => {
				if (!option.parentElement.parentElement.classList.contains("active")) {
					option.classList.toggle("selected");
				}
			};
		});
		// End Multiple Answers Handler
		// Start True And False Handler
		let trueFalseOtions = currentQ.querySelectorAll(
			".true-false-question-show .question-option"
		);
		trueFalseOtions.forEach((option) => {
			option.onclick = () => {
				getObjectFromLSBy("trueOrFalse").forEach((object) => {
					if (object.qId === currentQ.getAttribute("data-id")) {
						trueFalseOtions.forEach((option) => {
							if (option.innerHTML.toLowerCase() === object.answerStr) {
								option.classList.add("correct");
							} else {
								option.classList.add("wrong");
							}
						});
					}
				});

				trueFalseOtions.forEach((o) => {
					if (
						o.classList.contains("selected") &&
						!option.parentElement.classList.contains("active")
					) {
						o.classList.remove("selected");
					}
				});

				if (!option.parentElement.classList.contains("active")) {
					option.classList.add("selected");
				}
			};
		});
		// End True And False Handler

		checkBtn.onclick = () => {
			let firstIncrement = true;
			if (currentQ.getAttribute("data-qType") === "choose") {
				chooseOption.forEach((ch) => {
					if (ch.classList.contains("selected")) {
						currentQ
							.querySelector(".question-options-container-show")
							.classList.add("active");

						if (
							currentQ.querySelector(".selected").classList.contains("correct")
						) {
							succesSound();
						} else {
							unSccesSound();
						}

						checkBtn.style.display = "none";
						nextBtn.style.display = "block";
					} else {
						checkBtn.classList.add("error");
						setTimeout(() => {
							checkBtn.classList.remove("error");
						}, 5000);
					}
				});
			} else if (currentQ.getAttribute("data-qType") === "maltiAnswers") {
				maltiOptions.forEach((ch) => {
					let countSelected =
						ch.parentElement.parentElement.querySelectorAll(".selected").length;
					let countSelectedWCorrect =
						ch.parentElement.parentElement.querySelectorAll(
							".selected.correct"
						).length;
					let countCorrect =
						ch.parentElement.parentElement.querySelectorAll(".correct").length;

					if (ch.classList.contains("selected")) {
						currentQ
							.querySelector(".question-options-container-show")
							.classList.add("active");

						if (
							countSelected === countCorrect &&
							countCorrect === countSelectedWCorrect
						) {
							succesSound(false);
							if (firstIncrement) {
								++countOfCorrectQuestions;
								firstIncrement = false;
							}
						} else {
							unSccesSound(false);
							if (firstIncrement) {
								++countOfWrongQuestions;
								firstIncrement = false;
							}
						}

						checkBtn.style.display = "none";
						nextBtn.style.display = "block";
					} else {
						checkBtn.classList.add("error");
						setTimeout(() => {
							checkBtn.classList.remove("error");
						}, 5000);
					}
				});
			} else if (currentQ.getAttribute("data-qType") === "match") {
				let objectFromLS = {};
				getObjectFromLSBy("match").forEach((object) => {
					if (object.qId === currentQ.getAttribute("data-id")) {
						objectFromLS = object;
					}
				});
				let countOfTotalArrows = arrowsToMatch.length;
				let countOfFilledArrows = 0;
				let arrayToSort = [];
				let allAnswersCorrect = true;
				let arrowsToMatchTO = currentQ.querySelectorAll(
					".match-question-show .right-side .arrow-to-match"
				);
				arrowsToMatch.forEach((arrow) => {
					if (
						typeof parseInt(arrow.textContent) === "number" &&
						arrow.textContent !== ""
					) {
						++countOfFilledArrows;
					}
					if (countOfFilledArrows === countOfTotalArrows) {
						// From StackOverFlow
						Array.prototype.map
							.call(arrowsToMatch, function (node) {
								return {
									node: node,
									relevantText: node.textContent,
								};
							})
							.sort(function (a, b) {
								return a.relevantText.localeCompare(b.relevantText);
							})
							.forEach(function (item) {
								arrayToSort.push(item.node);
							});
						// From StackOverFlow

						for (let i = 0; i < arrowsToMatch.length; i++) {
							if (
								objectFromLS.rowArr[i].columnOne ===
								arrayToSort[i].parentElement.children[0].textContent
							) {
								arrayToSort[i].parentElement.style.setProperty(
									"--main-hover",
									"#009636"
								);
								arrowsToMatchTO[i].parentElement.style.setProperty(
									"--main-hover",
									"#009636"
								);
							} else {
								arrayToSort[i].parentElement.style.setProperty(
									"--main-hover",
									"#f44336"
								);
								arrowsToMatchTO[i].parentElement.style.setProperty(
									"--main-hover",
									"#f44336"
								);
								allAnswersCorrect = false;
							}
						}

						if (allAnswersCorrect) {
							succesSound();
						} else {
							unSccesSound();
						}

						checkBtn.style.display = "none";
						nextBtn.style.display = "block";
					} else {
						checkBtn.classList.add("error");
						setTimeout(() => {
							checkBtn.classList.remove("error");
						}, 5000);
					}
				});
			} else if (currentQ.getAttribute("data-qType") === "trueOrFalse") {
				trueFalseOtions.forEach((ch) => {
					if (ch.classList.contains("selected")) {
						currentQ
							.querySelector(".question-options-container-show")
							.classList.add("active");
						if (
							currentQ.querySelector(".selected").classList.contains("correct")
						) {
							succesSound();
						} else {
							unSccesSound();
						}
						checkBtn.style.display = "none";
						nextBtn.style.display = "block";
					} else {
						checkBtn.classList.add("error");
						setTimeout(() => {
							checkBtn.classList.remove("error");
						}, 5000);
					}
				});
			} else if (currentQ.getAttribute("data-qType") === "complete") {
				let completeAnswers = currentQ.querySelectorAll(".question-answer");
				let countAnswersElements = completeAnswers.length;
				let countAnswersFilled = 0;
				let countAnswersCorrect = 0;
				let firstIncrement = true;
				getObjectFromLSBy("complete").forEach((object) => {
					if (object.qId === currentQ.getAttribute("data-id")) {
						for (let i = 0; i < countAnswersElements; i++) {
							if (completeAnswers[i].value !== "") {
								++countAnswersFilled;
							}
						}
						for (let i = 0; i < countAnswersElements; i++) {
							if (countAnswersFilled === countAnswersElements) {
								for (
									let n = 0;
									n < object.answersArr[i].answersArray.length;
									n++
								) {
									if (
										completeAnswers[i].value
											.toLowerCase()
											.replace(/\s/g, "") ===
										object.answersArr[i].answersArray[n]
											.toLowerCase()
											.replace(/\s/g, "")
									) {
										[...completeAnswers[i].parentElement.children].forEach(
											(e) => {
												e.classList.remove("wrong");
												e.classList.add("correct");
											}
										);
										if (
											countAnswersElements ===
											completeAnswers[0].parentElement.parentElement.querySelectorAll(
												".inp.correct"
											).length
										) {
											succesSound();
										}
										++countAnswersCorrect;
										break;
									} else {
										[...completeAnswers[i].parentElement.children].forEach(
											(e) => {
												e.classList.remove("correct");
												e.classList.add("wrong");
											}
										);
									}
								}
								if (
									completeAnswers[0].parentElement.parentElement.querySelectorAll(
										".inp.wrong"
									).length > 0
								) {
									unSccesSound(false);
									if (firstIncrement) {
										++countOfWrongQuestions;
										firstIncrement = false;
									}
								}
								checkBtn.style.display = "none";
								nextBtn.style.display = "block";
							} else {
								checkBtn.classList.add("error");
								setTimeout(() => {
									checkBtn.classList.remove("error");
								}, 5000);
							}
						}
					}
				});
			} else if (currentQ.getAttribute("data-qType") === "typing") {
				let typingAnswers = currentQ.querySelector(".question-answer");
				let correct = false;
				let firstPlaySound = true;
				getObjectFromLSBy("typing").forEach((object) => {
					if (object.qId === currentQ.getAttribute("data-id")) {
						if (typingAnswers.value !== "") {
							for (let i = 0; i < object.answersArr.length; i++) {
								if (
									typingAnswers.value.toLowerCase().replace(/\s/g, "") ===
									object.answersArr[i].toLowerCase().replace(/\s/g, "")
								) {
									if (firstPlaySound) {
										succesSound();
										firstPlaySound = false;
									}
									typingAnswers.classList.remove("wrong");
									typingAnswers.classList.add("correct");
									correct = true;
								}
								if (i + 1 === object.answersArr.length && !correct) {
									typingAnswers.classList.remove("correct");
									typingAnswers.classList.add("wrong");
									unSccesSound();
								}
							}
							checkBtn.style.display = "none";
							nextBtn.style.display = "block";
						} else {
							checkBtn.classList.add("error");
							setTimeout(() => {
								checkBtn.classList.remove("error");
							}, 5000);
						}
					}
				});
			}

			// Show The countOfCorrectAnswersElement && countOfWrogngAnswersElement
			setControlsBarValues();
		};
	}

	nextBtn.onclick = () => {
		if (indexOfCurrentQ + 1 < qeustionsArrayFromDOM.length) {
			currentQ.classList.remove("active");
			currentQ.classList.add("to");
			currentQ.style.cssText = "transform-origin: right center";
			currentQ = qeustionsArrayFromDOM[++indexOfCurrentQ];
			currentQ.classList.remove("from");
			currentQ.classList.add("active");
			currentQ.style.cssText = "transform-origin: left center";
			checkBtn.style.display = "block";
			checkBtn.classList.remove("error");
			nextBtn.style.display = "none";
			nextBtnFunc();
		} else {
			endBtn.style.display = "block";
			nextBtn.style.display = "none";
		}
	};

	// Start Time Coding
	let timerDown = document.querySelector(".timer-down");
	let timerFinished = document.querySelector(".timer-finished");
	let quizDuration = JSON.parse(window.localStorage.getItem("questions"))[1];
	let minuts = Math.floor(parseInt(quizDuration));
	let seconds = (quizDuration - minuts) * 60;

	// Show The timerDown Content
	timerDown.innerHTML = \`\${minuts > 9 ? minuts : "0" + minuts}:\${
		seconds > 9 ? seconds : "0" + seconds
	}\`;
	let counterDecrement = setInterval(() => {
		if (minuts >= 0) {
			if (seconds > 0) {
				seconds--;
			} else if (seconds === 0 && minuts > 0) {
				minuts--;
				seconds = 59;
			} else {
				clearInterval(counterDecrement);
				endBtn.click();
			}
			timerDown.innerHTML = \`\${minuts > 9 ? minuts : "0" + minuts}:\${
				seconds > 9 ? seconds : "0" + seconds
			}\`;
		}
	}, 1000);

	endBtn.onclick = () => {
		overlay.style.display = "flex";
		let set = setTimeout(() => {
			overlay.classList.add("active");
		}, 300);
		if (overlay.classList.contains("active")) {
			clearTimeout(set);
		}
		// Show The timerFinished Content
		clearInterval(counterDecrement);
		let defferenceTime = differenceTime(
			\`\${minuts > 9 ? minuts : "0" + minuts}:\${
				seconds > 9 ? seconds : "0" + seconds
			}\`,
			\`\${
				Math.floor(parseInt(quizDuration)) > 9
					? Math.floor(parseInt(quizDuration))
					: "0" + Math.floor(parseInt(quizDuration))
			}:\${
				(quizDuration - Math.floor(parseInt(quizDuration))) * 60 > 9
					? (quizDuration - Math.floor(parseInt(quizDuration))) * 60
					: "0" + (quizDuration - Math.floor(parseInt(quizDuration))) * 60
			}\`
		);
		timerFinished.innerHTML = defferenceTime;
		// Control Final Sound
		let finalMessage = document.querySelector(".final-message");
		if (qeustionsArray.length === countOfCorrectQuestions) {
			finalMessage.innerHTML = "Congratulations!";
			let successAudio = new Audio("https://abdallah-mohamed-sayed.github.io/quiz-app/audios/Final-Success.mp3");
			successAudio.play();
		} else {
			let unSuccessAudio = new Audio("https://abdallah-mohamed-sayed.github.io/quiz-app/audios/Final-Unsuccess.mp3");
			unSuccessAudio.play();
			finalMessage.innerHTML = "Try Again, You can do it!";
		}
	};

	againBtn.onclick = () => {
		stepsChanger(stepShow, stepGo);
		document.querySelectorAll(".question-show").forEach((ele) => {
			ele.remove();
		});
		countOfWrongQuestions = 0;
		countOfCorrectQuestions = 0;
		setControlsBarValues();

		startHandlerShowJSFile();
	};

	resetBtn.onclick = () => {
		startHandlerEditJSFile();
	};
}

function arrayRemove(arr, value) {
	return arr.filter(function (geeks) {
		return geeks != value;
	});
}

function differenceTime(start, end) {
	start = start.split(":");
	end = end.split(":");
	var startDate = new Date(0, 0, 0, start[0], start[1], 0);
	var endDate = new Date(0, 0, 0, end[0], end[1], 0);
	var diff = endDate.getTime() - startDate.getTime();
	var hours = Math.floor(diff / 1000 / 60 / 60);
	diff -= hours * 1000 * 60 * 60;
	var minutes = Math.floor(diff / 1000 / 60);
	// If using time pickers with 24 hours format, add the below line get exact hours
	if (hours < 0) hours = hours + 24;
	return (
		(hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes
	);
}

function getObjectFromLSBy(qType) {
	let questionArrayFromLoaclStorage = JSON.parse(
		window.localStorage.getItem("questions")
	);
	let result = [];
	questionArrayFromLoaclStorage.forEach((object) => {
		if (object.qType === qType) {
			result.push(object);
		}
	});
	return result;
}

function succesSound(increment = true) {
	if (increment) {
		++countOfCorrectQuestions;
	}
	let correctSound = new Audio("https://abdallah-mohamed-sayed.github.io/quiz-app/audios/Correct.mp3");
	correctSound.play();
}
function unSccesSound(increment = true) {
	if (increment) {
		++countOfWrongQuestions;
	}
	let wrongtSound = new Audio("https://abdallah-mohamed-sayed.github.io/quiz-app/audios/Wrong.mp3");
	wrongtSound.play();
}

function overlayRemoveActiveFunc() {
	overlay.classList.remove("active");
	let removeOverLay = setTimeout(() => {
		overlay.style.display = "none";
	}, 300);
	if (overlay.style.display === "none") {
		clearTimeout(removeOverLay);
	}
}

function setControlsBarValues() {
	let totalQFinishedCount = document.querySelector(".finshed-count");
	let countOfCorrectAnswersElement = document.querySelectorAll(".count-true-q");
	let countOfWrogngAnswersElement = document.querySelectorAll(".count-false-q");

	totalQFinishedCount.innerHTML =
		countOfCorrectQuestions + countOfWrongQuestions;
	countOfCorrectAnswersElement.forEach((e) => {
		e.innerHTML = countOfCorrectQuestions;
	});
	countOfWrogngAnswersElement.forEach((e) => {
		e.innerHTML = countOfWrongQuestions;
	});
}

if (window.localStorage.getItem("editQuesions") === "true") {
	startHandlerEditJSFile();
} else if (window.localStorage.getItem("questions") !== null) {
	let questionArrayFromLoaclStorage = JSON.parse(
		window.localStorage.getItem("questions")
	);
	quizTitleDiv.forEach((titleDiv) => {
		titleDiv.innerHTML = questionArrayFromLoaclStorage[0];
	});
	stepGo.classList.add("active");

	let lableIdCounter = 0;
	let parser = new DOMParser();
	let imageShowStr = \`
	<div class="image">
		<img src="">
	</div>\`;

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
					qOptions[n].setAttribute(\`for\`, lableIdCounter);
					qOptionsInput[n].setAttribute(\`id\`, lableIdCounter);
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
				let htmlString = \`
					<div class="container-item">
						<div class="item-content"></div>
						<div class="arrow-to-match"></div>
					</div>\`;

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
				let htmlString = \`
					<div class="container-option">
            <div class="answer-number"></div>
            <input title="Your Answer" placeholder="Your Answer" type="text" class="inp question-answer" />
          </div>\`;

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
	let htmlString = \`
			<div class="question-show choose-question-show from">
        <div class="question-title-show"></div>
        <div class="question-options-container-show">
          <div class="question-option"></div>
          <div class="question-option"></div>
          <div class="question-option"></div>
          <div class="question-option"></div>
        </div>
      </div>\`;
	return htmlString;
}

function maltiAnswersShowQuestionFunction() {
	let htmlString = \`
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
      </div>\`;
	return htmlString;
}

function matchShowQuestionFunction() {
	let htmlString = \`
	      <div class="question-show match-question-show from">
        <div class="question-title-show"> </div>
        <div class="question-answer-container-show">
          <div class="right-side">
          </div>
          <div class="left-side">
          </div>
        </div>
      </div>\`;
	return htmlString;
}

function completeShowQuestionFunction() {
	let htmlString = \`
	      <div class="question-show complete-question-show from">
        <div class="question-title-show"></div>
        <div class="question-answer-container-show">
        </div>
      </div>\`;
	return htmlString;
}

function trueOrFalseShowQuestionFunction() {
	let htmlString = \`
	      <div class="question-show true-false-question-show from">
        <div class="question-title-show"> </div>
        <div class="question-options-container-show">
          <div class="question-option">True</div>
          <div class="question-option">False</div>
        </div>
      </div>\`;
	return htmlString;
}

function typingShowQuestionFunction() {
	let htmlString = \`
	      <div class="question-show typing-question-show from">
        <div class="question-title-show"> </div>
        <div class="question-answer-container-show">
          <input title="Required" type="text" class="inp question-answer" placeholder="Your Answer" />
        </div>
      </div>\`;
	return htmlString;
}

function pushStringToShow(htmlString) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(htmlString, "text/html");
	let element = doc.body.firstChild;
	questionContainerShow.appendChild(element);
	return element;
}
let noPrint = true;
let noCopy = true;
let noScreenshot = true;
let autoBlur = false;

if (noCopy) {
	document.body.oncopy = function () {
		return false;
	};
	document.onkeydown = function (e) {
		if (e.ctrlKey == true && e.keyCode == 83) {
			e.preventDefault();
		}
	};
}

if (noPrint) {
	let c = document.createElement("span");
	c.style.display = "none";
	c.style.postion = "absolute";
	c.style.background = "#000";
	document.body.insertBefore(c, document.body.firstChild);
	c.setAttribute("width", document.body.scrollWidth);
	c.setAttribute("height", document.body.scrollHeight);
	c.style.display = "block";
	let cssNode3 = document.createElement("style");
	cssNode3.type = "text/css";
	cssNode3.media = "print";
	cssNode3.innerHTML = "body{display:none}";
	document.head.appendChild(cssNode3);
}

document.addEventListener("keyup", (e) => {
	if (e.key == "PrintScreen") {
		if (noScreenshot) {
			navigator.clipboard.writeText("");
		}
	}
});

document.addEventListener("keydown", (e) => {
	if (e.ctrlKey && e.key == "p") {
		if (noPrint) {
			e.cancelBubble = true;
			e.preventDefault();
			e.stopImmediatePropagation();
		}
	}
});

document.onkeydown = (e) => {
	if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.shiftKey && e.keyCode == "M".charCodeAt(0)) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == 67) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == 85) {
		return false;
	}
	if (e.ctrlKey && e.keyCode == 88) {
		return false;
	}
	if (e.keyCode === 123) {
		return false;
	}
};

document.oncontextmenu = function () {
	return false;
};


  </script>
</body>

</html>`;
	return HTMLContent;
}
