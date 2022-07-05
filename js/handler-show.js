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
	timerDown.innerHTML = `${minuts > 9 ? minuts : "0" + minuts}:${
		seconds > 9 ? seconds : "0" + seconds
	}`;
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
			timerDown.innerHTML = `${minuts > 9 ? minuts : "0" + minuts}:${
				seconds > 9 ? seconds : "0" + seconds
			}`;
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
			`${minuts > 9 ? minuts : "0" + minuts}:${
				seconds > 9 ? seconds : "0" + seconds
			}`,
			`${
				Math.floor(parseInt(quizDuration)) > 9
					? Math.floor(parseInt(quizDuration))
					: "0" + Math.floor(parseInt(quizDuration))
			}:${
				(quizDuration - Math.floor(parseInt(quizDuration))) * 60 > 9
					? (quizDuration - Math.floor(parseInt(quizDuration))) * 60
					: "0" + (quizDuration - Math.floor(parseInt(quizDuration))) * 60
			}`
		);
		timerFinished.innerHTML = defferenceTime;
		// Control Final Sound
		let finalMessage = document.querySelector(".final-message");
		if (qeustionsArray.length === countOfCorrectQuestions) {
			finalMessage.innerHTML = "Congratulations!";
			let successAudio = new Audio("audios/Final-Success.mp3");
			successAudio.play();
		} else {
			let unSuccessAudio = new Audio("audios/Final-Unsuccess.mp3");
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
	let correctSound = new Audio("audios/Correct.mp3");
	correctSound.play();
}
function unSccesSound(increment = true) {
	if (increment) {
		++countOfWrongQuestions;
	}
	let wrongtSound = new Audio("audios/Wrong.mp3");
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
