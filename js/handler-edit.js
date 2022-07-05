function startHandlerEditJSFile() {
	let arrayFromLS = JSON.parse(window.localStorage.getItem("quizQuestions"));

	stepWelcome.classList.remove("active");
	stepsChanger(stepShow, stepCreate);
	window.localStorage.setItem("editQuesions", "true");

	quizTitleInp.value = arrayFromLS[0];
	quizDurationInp.value = arrayFromLS[1];

	for (let i = 2; i < arrayFromLS.length; i++) {
		if (arrayFromLS[i].qType === "choose") {
			selectTypeInp.value = "choose";

			let questionContainerEle = applyBtnFanc();

			let qTitleInp = questionContainerEle.querySelector(
				".question-name-input"
			);
			let qImageUrlInp = questionContainerEle.querySelector(".image-url");
			let qOptionsInps = questionContainerEle.querySelectorAll(".option-input");

			qTitleInp.value = arrayFromLS[i].qTitle;
			qImageUrlInp.value = arrayFromLS[i].qImageUrl;

			for (let n = 0; n < qOptionsInps.length; n++) {
				qOptionsInps[n].value = arrayFromLS[i].optionsArr[n];

				if (arrayFromLS[i].correctArr[n] !== undefined) {
					qOptionsInps[arrayFromLS[i].correctArr[n]].classList.add("correct");
				}
			}
		} else if (arrayFromLS[i].qType === "maltiAnswers") {
			selectTypeInp.value = "mutiAnswers";
			let questionContainerEle = applyBtnFanc();
			let qTitleInp = questionContainerEle.querySelector(
				".question-name-input"
			);
			let qImageUrlInp = questionContainerEle.querySelector(".image-url");
			let qOptionsInps = questionContainerEle.querySelectorAll(".option-input");

			qTitleInp.value = arrayFromLS[i].qTitle;
			qImageUrlInp.value = arrayFromLS[i].qImageUrl;

			for (let n = 0; n < qOptionsInps.length; n++) {
				qOptionsInps[n].value = arrayFromLS[i].optionsArr[n];

				if (arrayFromLS[i].correctArr[n] !== undefined) {
					qOptionsInps[arrayFromLS[i].correctArr[n]].classList.add("correct");
				}
			}
		} else if (arrayFromLS[i].qType === "match") {
			selectTypeInp.value = "match";
			let questionContainerEle = applyBtnFanc();
			let qTitleInp = questionContainerEle.querySelector(
				".question-name-input"
			);
			let qImageUrlInp = questionContainerEle.querySelector(".image-url");
			let addRowBtn = questionContainerEle.querySelector(
				".add-another-answer-btn"
			);

			qTitleInp.value = arrayFromLS[i].qTitle;
			qImageUrlInp.value = arrayFromLS[i].qImageUrl;

			for (let n = 0; n < arrayFromLS[i].rowArr.length; n++) {
				if (n > 1) {
					addRowBtn.click();
				}
				let columnOneCildren =
					questionContainerEle.querySelectorAll(".column-one-input");
				let columnTwoCildren =
					questionContainerEle.querySelectorAll(".column-two-input");
				columnOneCildren[n].value = arrayFromLS[i].rowArr[n].columnOne;
				columnTwoCildren[n].value = arrayFromLS[i].rowArr[n].columnTwo;
			}
		} else if (arrayFromLS[i].qType === "complete") {
			selectTypeInp.value = "complete";
			let questionContainerEle = applyBtnFanc();
			let qTitleInp = questionContainerEle.querySelector(
				".question-name-input"
			);
			let qImageUrlInp = questionContainerEle.querySelector(".image-url");
			let addAnswerBtn = questionContainerEle.querySelector(".add-answer");
			let numb = 1;

			for (let n = 0; n < arrayFromLS[i].answersArr.length; n++) {
				addAnswerBtn.click();
				let addAnotherAnswerBtns = questionContainerEle.querySelectorAll(
					".add-another-answer-btn"
				);
				for (
					let a = 0;
					a < arrayFromLS[i].answersArr[n].answersArray.length;
					a++
				) {
					if (numb !== arrayFromLS[i].answersArr[n].answersArray.length) {
						numb += 1;
						addAnotherAnswerBtns[n].click();
					} else {
						numb = 1;
					}
					addAnotherAnswerBtns[n].parentElement.parentElement.querySelectorAll(
						".answer"
					)[a].value = arrayFromLS[i].answersArr[n].answersArray[a];
				}
			}

			arrayFromLS[i].qTitle = arrayFromLS[i].qTitle.replace(
				/<span>/gi,
				'<span contenteditable="false">'
			);
			qTitleInp.innerHTML = arrayFromLS[i].qTitle;
			qImageUrlInp.value = arrayFromLS[i].qImageUrl;
		} else if (arrayFromLS[i].qType === "trueOrFalse") {
			selectTypeInp.value = "trueOrFalse";
			let questionContainerEle = applyBtnFanc();
			let qTitleInp = questionContainerEle.querySelector(
				".question-name-input"
			);
			let qImageUrlInp = questionContainerEle.querySelector(".image-url");
			let options = questionContainerEle.querySelectorAll(".bool");

			qTitleInp.value = arrayFromLS[i].qTitle;
			qImageUrlInp.value = arrayFromLS[i].qImageUrl;

			if (arrayFromLS[i].answerStr === "true") {
				options[0].classList.add("correct");
				options[1].classList.remove("correct");
			} else {
				options[1].classList.add("correct");
				options[0].classList.remove("correct");
			}
		} else if (arrayFromLS[i].qType === "typing") {
			selectTypeInp.value = "typing";
			let questionContainerEle = applyBtnFanc();
			let qTitleInp = questionContainerEle.querySelector(
				".question-name-input"
			);
			let qImageUrlInp = questionContainerEle.querySelector(".image-url");
			let addAnotherAnswerBtn = questionContainerEle.querySelector(
				".add-another-answer-btn"
			);

			qTitleInp.value = arrayFromLS[i].qTitle;
			qImageUrlInp.value = arrayFromLS[i].qImageUrl;

			for (let n = 0; n < arrayFromLS[i].answersArr.length; n++) {
				if (n > 0) {
					addAnotherAnswerBtn.click();
				}
				let answers = questionContainerEle.querySelectorAll(".answer-input");
				answers[n].value = arrayFromLS[i].answersArr[n];
			}
		}
	}

	removeBtnFuncAndImageHandlerFanc();
	imageHandlerFanc();
}
