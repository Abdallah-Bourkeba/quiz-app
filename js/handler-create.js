startBtn.onclick = () => {
	stepsChanger(stepWelcome, stepCreate);
};

applyBtn.onclick = () => {
	applyBtnFanc();
	removeBtnFuncAndImageHandlerFanc();
};

function applyBtnFanc() {
	if (selectTypeInp.value === "choose") {
		let questionEle = pushStringToContainer(chooseCreateInputFunction());
		let makeCorrectInput = document.querySelectorAll(".mk-corct-btn");
		makeCorrectInput.forEach((btn) => {
			btn.onclick = () => {
				btn.parentElement.children[1].classList.toggle("correct");
			};
		});
		return questionEle;
	} else if (selectTypeInp.value === "mutiAnswers") {
		let questionEle = pushStringToContainer(mutiAnswersCreateInputFunction());
		let makeCorrectInput = document.querySelectorAll(".mk-corct-btn");
		makeCorrectInput.forEach((btn) => {
			btn.onclick = () => {
				btn.parentElement.children[1].classList.toggle("correct");
			};
		});
		return questionEle;
	} else if (selectTypeInp.value === "match") {
		let questionEle = pushStringToContainer(matchCreateInputFunction());
		let addRowBtns = document.querySelectorAll(
			".match-question-input .add-another-answer-btn"
		);
		let rowsCount = 2;
		addRowBtns.forEach((addRowBtn) => {
			addRowBtn.onclick = () => {
				let tableParent = addRowBtn.parentElement.parentElement.children[1];
				var parser = new DOMParser();
				var doc = parser.parseFromString(
					`<div class="row-container-input">
						<input data-rowNumber="${rowsCount}" type="text" class="column-one-input inp" placeholder="Column One" />
						<div class="arrow-to-right">
							<object data="images/arrow-to-right.svg"></object>
						</div>
						<input data-rowNumber="${rowsCount}" type="text" class="column-two-input inp" placeholder="Column Two" />
					</div>`,
					"text/html"
				);
				++rowsCount;
				tableParent.appendChild(doc.body.firstChild);
			};
		});

		let removeRowBtns = document.querySelectorAll(
			".match-question-input .remove-answer-btn"
		);
		removeRowBtns.forEach((removeRowBtn) => {
			removeRowBtn.onclick = () => {
				let tableParentChildrenLength =
					removeRowBtn.parentElement.parentElement.children[1].children.length;
				let tableParent = removeRowBtn.parentElement.parentElement.children[1];
				if (tableParentChildrenLength > 2) {
					tableParent.lastChild.remove();
				}
			};
		});
		return questionEle;
	} else if (selectTypeInp.value === "complete") {
		let questionEle = pushStringToContainer(completeCreateInputFunction());

		let addAnswerBtns = document.querySelectorAll(".add-answer");
		let firstAddAnswer = false;
		answerCount = 1;
		addAnswerBtns.forEach((addAnswerBtn) => {
			addAnswerBtn.onclick = () => {
				let questionInputParagraph =
					addAnswerBtn.parentElement.parentElement.parentElement.querySelector(
						".question-name-input"
					);
				let bottomSideRowContainer =
					addAnswerBtn.parentElement.parentElement.parentElement.querySelector(
						".bottom-side"
					);
				var parser = new DOMParser();

				if (firstAddAnswer) {
					if (
						!/<span contenteditable="false">\d+<\/span>/gi.test(
							questionInputParagraph.innerHTML
						)
					) {
						answerCount = 1;
						[...bottomSideRowContainer.children].forEach((child) => {
							child.remove();
						});
					}
				}
				firstAddAnswer = true;

				var doc = parser.parseFromString(
					`<span contenteditable="false">${answerCount}</span>`,
					"text/html"
				);
				questionInputParagraph.appendChild(doc.body.firstChild);

				doc = parser.parseFromString(
					`
							<div class="row-container-answer-input">
								<div class="answer-number">${answerCount}</div>
								<div class="answers-container-input">
									<input type="text" class="inp answer" title="Required" placeholder="Answer" />
								</div>
								<div class="add-and-remove-answer-btns">
									<div data-description="Remove This Answer" class="btn remove-answer-btn">
										-
									</div>
									<div data-description="Add Answer" class="btn add-another-answer-btn">
										+
									</div>
								</div>
							</div>`,
					"text/html"
				);
				bottomSideRowContainer.appendChild(doc.body.firstChild);

				answerCount++;

				let addOptionalAnswerBtn = document.querySelectorAll(
					".complete-question-input .add-another-answer-btn"
				);
				addOptionalAnswerBtn.forEach((btn) => {
					btn.onclick = () => {
						let optionalAnswersParent =
							btn.parentElement.parentElement.children[1];
						doc = parser.parseFromString(
							`<input type="text" class="inp answer" placeholder="Answer" />`,
							"text/html"
						);
						optionalAnswersParent.appendChild(doc.body.firstChild);
					};
				});

				let removeOptionalAnswerBtn = document.querySelectorAll(
					".complete-question-input .remove-answer-btn"
				);
				removeOptionalAnswerBtn.forEach((btn) => {
					btn.onclick = () => {
						let optionalAnswersParent =
							btn.parentElement.parentElement.children[1];
						if (optionalAnswersParent.children.length > 1) {
							optionalAnswersParent.lastChild.remove();
						}
					};
				});
			};
		});
		return questionEle;
	} else if (selectTypeInp.value === "trueOrFalse") {
		let questionEle = pushStringToContainer(trueOrFalseCreateInputFunction());

		let optionInputTrueOrFalse = document.querySelectorAll(".bool");
		optionInputTrueOrFalse.forEach((boolean) => {
			boolean.onclick = () => {
				for (let i = 0; i < boolean.parentElement.children.length; i++) {
					boolean.parentElement.children[i].classList.remove("correct");
				}
				boolean.classList.add("correct");
			};
		});
		return questionEle;
	} else if (selectTypeInp.value === "typing") {
		let questionEle = pushStringToContainer(typingCreateInputFunction());
		let addAnotherAnswerBtns = document.querySelectorAll(
			".typing-question-input .add-another-answer-btn"
		);
		addAnotherAnswerBtns.forEach((btn) => {
			btn.onclick = () => {
				let tableParent = btn.parentElement.parentElement.children[0];
				var parser = new DOMParser();
				var doc = parser.parseFromString(
					`
							<div class="answer-container-input">
								<div class="status-element-for-input">Optional</div>
								<input type="text" class="answer-input inp" placeholder="Answer" />
							</div>`,
					"text/html"
				);
				tableParent.appendChild(doc.body.firstChild);
			};
		});
		let removeThisAnswerBtns = document.querySelectorAll(
			".typing-question-input .remove-answer-btn"
		);
		removeThisAnswerBtns.forEach((btn) => {
			btn.onclick = () => {
				let tableParent = btn.parentElement.parentElement.children[0];
				if (tableParent.parentElement.children[0].children.length > 1) {
					tableParent.lastChild.remove();
				}
			};
		});
		return questionEle;
	}
}

function removeBtnFuncAndImageHandlerFanc() {
	let removeQuestionBtns = document.querySelectorAll(".remove-question-btn");
	removeQuestionBtns.forEach((removeBtn) => {
		removeBtn.onclick = () => {
			removeBtn.parentElement.remove();
		};
	});
	imageHandlerFanc();
}

function imageHandlerFanc() {
	let imageUrlInput = document.querySelectorAll(".image-url");
	imageUrlInput.forEach((input) => {
		allImageUrlValid = true;
		input.value !== "" ? imageUrlFunc(input) : "";
		input.oninput = () => {
			imageUrlFunc(input);
		};
	});

	function imageUrlFunc(input) {
		var parser = new DOMParser();
		let imageHtmlStr = `
							<div class="image">
								<img src="">
								<div class="error">This Image Url Is Not Valid</div>
							</div>`;
		var doc = parser.parseFromString(imageHtmlStr, "text/html");
		let parentElement = input.parentElement.parentElement;

		if (input.value !== "" && !parentElement.querySelector(".image")) {
			parentElement.insertBefore(
				doc.body.firstChild,
				parentElement.children[1]
			);
		}

		/drive.google.com\/file/gi.test(input.value)
			? (input.value = input.value
					.replace("/view?usp=sharing", "&export=download")
					.replace("file/d/", "u/0/uc?id="))
			: "";

		parentElement.children[1].children[0].addEventListener("error", () => {
			if (input.value === "") {
				parentElement.children[1].children[1].classList.remove("active");
				allImageUrlValid = true;
			} else {
				parentElement.children[1].children[1].classList.add("active");
				parentElement.children[1].children[0].setAttribute("src", "");
				allImageUrlValid = false;
			}
		});

		allImageUrlValid = true;
		parentElement.children[1].children[0].setAttribute("src", input.value);
		parentElement.children[1].children[1].classList.remove("active");
	}
}

function chooseCreateInputFunction() {
	let htmlString = `
			<div data-q-type="choose" class="question choose-question-input">
        <div class="main-heading question-type">Choose Question</div>
        <div class="top-side">
          <input type="text" class="inp question-name-input" placeholder="Question Title" />
          <input type="url" class="inp image-url" placeholder="Image Url (Optional)" />
        </div>
        <div class="bottom-side">
          <div class="option-container-input">
            <div class="mk-corct-btn">Correct</div>
            <input type="text" class="option-input inp correct" placeholder="option" />
          </div>
          <div class="option-container-input">
            <div class="mk-corct-btn">Correct</div>
            <input type="text" class="option-input inp" placeholder="option" />
          </div>
          <div class="option-container-input">
            <div class="mk-corct-btn">Correct</div>
            <input type="text" class="option-input inp" placeholder="option" />
          </div>
          <div class="option-container-input">
            <div class="mk-corct-btn">Correct</div>
            <input type="text" class="option-input inp" placeholder="option" />
          </div>
        </div>
        <div class="btn remove-question-btn">Remove</div>
      </div>`;
	return htmlString;
}

function mutiAnswersCreateInputFunction() {
	let htmlString = `
	      <div data-q-type="maltiAnswers" class="question malti-answers-question-input">
        <div class="main-heading question-type">Multiple Answers Question</div>
        <div class="top-side">
          <input type="text" class="inp question-name-input" placeholder="Question Title" />
          <input type="url" class="inp image-url" placeholder="Image Url (Optional)" />
        </div>
        <div class="bottom-side">
          <div class="option-container-input">
            <div class="mk-corct-btn">Correct</div>
            <input type="text" class="option-input inp correct" placeholder="option" />
          </div>
          <div class="option-container-input">
            <div class="mk-corct-btn">Correct</div>
            <input type="text" class="option-input inp" placeholder="option" />
          </div>
          <div class="option-container-input">
            <div class="mk-corct-btn">Correct</div>
            <input type="text" class="option-input inp" placeholder="option" />
          </div>
          <div class="option-container-input">
            <div class="mk-corct-btn">Correct</div>
            <input type="text" class="option-input inp" placeholder="option" />
          </div>
        </div>
        <div class="btn remove-question-btn">Remove</div>
      </div>`;
	return htmlString;
}

function matchCreateInputFunction() {
	let htmlString = `
	      <div data-q-type="match" class="question match-question-input">
        <div class="main-heading question-type">Match Question</div>
        <div class="top-side">
          <input type="text" class="inp question-name-input" placeholder="Question Title" />
          <input type="url" class="inp image-url" placeholder="Image Url (Optional)" />
        </div>
        <div class="bottom-side">
          <div class="column-a-and-b">
            <div class="column-a">A</div>
            <div class="column-b">B</div>
          </div>
          <div class="container-input">
						<div class="row-container-input">
							<input data-rowNumber="0" type="text" class="column-one-input inp"  title="Required" placeholder="Column One" />
							<div class="arrow-to-right">
								<object data="images/arrow-to-right.svg"></object>
							</div>
							<input data-rowNumber="0" type="text" class="column-two-input inp"  title="Required" placeholder="Column Two" />
						</div>
						<div class="row-container-input">
							<input data-rowNumber="1" type="text" class="column-one-input inp"  title="Required" placeholder="Column One" />
							<div class="arrow-to-right">
								<object data="images/arrow-to-right.svg"></object>
							</div>
							<input data-rowNumber="1" type="text" class="column-two-input inp"  title="Required" placeholder="Column Two" />
						</div>
          </div>
          <div class="add-and-remove-answer-btns">
            <div data-description="Remove This Row" class="btn remove-answer-btn">
              -
            </div>
            <div data-description="Add Row" class="btn add-another-answer-btn">
              +
            </div>
          </div>
        </div>
        <div class="btn remove-question-btn">Remove</div>
      </div>`;
	return htmlString;
}

function completeCreateInputFunction() {
	let htmlString = `
	      <div data-q-type="complete" class="question complete-question-input">
        <div class="main-heading question-type">Complete Question</div>
        <div class="top-side">
          <input type="url" class="inp image-url" placeholder="Image Url (Optional)" />
          <div class="question-title-input-container">
            <p contenteditable="true" class="inp question-name-input"></p>
            <div title="Add Answer Here" class="btn add-answer">Add</div>
          </div>
        </div>
        <div class="bottom-side"></div>
        <div class="btn remove-question-btn">Remove</div>
      </div>`;
	return htmlString;
}

function trueOrFalseCreateInputFunction() {
	let htmlString = `
	      <div data-q-type="trueOrFalse" class="question true-and-false-question-input">
        <div class="main-heading question-type">True Or False Question</div>
        <div class="top-side">
          <input type="text" class="inp question-name-input" placeholder="Question Title" />
          <input type="url" class="inp image-url" placeholder="Image Url (Optional)" />
        </div>
        <div class="bottom-side">
          <div class="option-input bool correct">True</div>
          <div class="option-input bool">False</div>
        </div>
        <div class="btn remove-question-btn">Remove</div>
      </div>`;
	return htmlString;
}

function typingCreateInputFunction() {
	let htmlString = `
	      <div data-q-type="typing" class="question typing-question-input">
        <div class="main-heading question-type">Typing Question</div>
        <div class="top-side">
          <input type="text" class="inp question-name-input" placeholder="Question Title" />
          <input type="url" class="inp image-url" placeholder="Image Url (Optional)" />
        </div>
        <div class="bottom-side">
          <div class="container-input">
						<div class="answer-container-input">
							<div class="status-element-for-input">Required</div>
							<input type="text" class="answer-input inp" placeholder="Answer" />
						</div>
          </div>
          <div class="add-and-remove-answer-btns">
            <div data-description="Remove This Answer" class="btn remove-answer-btn">
              -
            </div>
            <div data-description="Add Answer" class="btn add-another-answer-btn">
              +
            </div>
          </div>
        </div>
        <div class="btn remove-question-btn">Remove</div>
      </div>`;
	return htmlString;
}

function pushStringToContainer(htmlString) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(htmlString, "text/html");
	quizContainerQuestions.appendChild(doc.body.firstChild);
	return quizContainerQuestions.lastChild;
}
