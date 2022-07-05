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
