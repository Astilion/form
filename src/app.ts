const username: HTMLInputElement = document.querySelector("#username");
const password: HTMLInputElement = document.querySelector("#password");
const repeatPassword: HTMLInputElement = document.querySelector("#password2");
const email: HTMLInputElement = document.querySelector("#email");
const clearBtn = document.querySelector(".clear");
const sendBtn = document.querySelector(".send");
const closeBtn = document.querySelector(".close");
const popup = document.querySelector(".popup");

const checkform = (input: HTMLInputElement[]) => {
	input.forEach((el: HTMLInputElement) => {
		if (el.value === "") {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const showError = (input: HTMLInputElement, msg: string) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector(".error-text");
	formBox.classList.add("error");
	errorMsg.textContent = msg;
};

const clearError = (input: HTMLInputElement) => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};

const checkLenght = (input: HTMLInputElement, min: number) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.textContent.slice(
				0,
				-1
			)} składa się z min. ${min} znaków.`
		);
	}
};

const checkPassword = (pass1: HTMLInputElement, pass2: HTMLInputElement) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, "Hasła do siebie nie pasują");
	}
};
const validateEmail = (email: HTMLInputElement) => {
	const reg =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (reg.test(email.value)) {
		clearError(email);
	} else {
		showError(email, "E-mail jest niepoprawny");
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll(".form-box");
	let errorCount = 0;
	allInputs.forEach(el => {
		if (el.classList.contains("error")) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popup.classList.add("show-popup");
	}
};

sendBtn.addEventListener("click", e => {
	e.preventDefault();
	checkform([username, password, repeatPassword, email]);

	checkLenght(username, 3);
	checkLenght(password, 8);
	checkPassword(password, repeatPassword);
	validateEmail(email);
	checkErrors();
});

clearBtn.addEventListener("click", e => {
	e.preventDefault();
	[username, password, repeatPassword, email].forEach(el => {
		el.value = "";
		clearError(el);
	});
});
