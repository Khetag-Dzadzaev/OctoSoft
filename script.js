const popup = document.querySelector("#popup");
const menu = document.querySelector(".menu");
const body = document.body;
const burger = document.querySelector(".burger");
burger.addEventListener("click", hambHandler);

function hambHandler(e) {
	popup.classList.toggle("open");
	burger.classList.toggle("active");
	body.classList.toggle("noscroll");
	renderPopup();
}

function renderPopup() {
	popup.appendChild(menu);
}

let feedback = document.querySelectorAll(".modal-button");
let modal = document.querySelector(".modal");
let close = document.querySelector(".modal__close");

feedback.forEach((elem) => {
	elem.addEventListener("click", function () {
		modal.style.display = "block";
		body.classList.add("noscroll");
	});
});
if (close) {
	close.addEventListener("click", closeModal);
}
if (modal) {
	modal.addEventListener("click", (e) => {
		if (e.target.classList.contains("modal")) closeModal();
	});
}

function closeModal() {
	if (modal) modal.style.display = "none";
	body.classList.remove("noscroll");
}


function submitForm(e) {
	var act = e.getAttribute("action");

	var request = new XMLHttpRequest();
	var formData = new FormData(e);
	for (let formItem of e) {
		formData.append(formItem.name, formItem.value);
	}
	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			if (request.status === 422) {
				console.log(request.response);
				e.querySelector(".response").innerHTML = request.response;
				let inputs = e.querySelectorAll("input, select, textarea");
				inputs.forEach((el) => {
					el.addEventListener("input", () => {
						el.removeAttribute("style");
						el.classList.remove("error");
					});
				});
				let errors = e.querySelector(".response").querySelectorAll("[data-error]");
				console.log(errors);
				errors.forEach((el) => {
					let dataAt = el.getAttribute("data-error");
					let input = e.querySelector("input[name=" + dataAt + "], select[name=" + dataAt + "], textarea[name=" + dataAt + "]");
					input.style.borderColor = "#da4c4c";
					input.classList.add("error");
					// console.log(input);
				});
			} else {
				e.querySelector(".response").innerHTML = request.response;
				e.reset();
			}
		}
	};

	request.open("POST", act, true);
	request.send(formData);
	return false;
}

let discount = document.querySelector(".discount");
let checkBox = document.querySelector(".custom-checkbox");
let chart = document.querySelectorAll(".chart__row");

if (chart.length > 0 && discount && checkBox) {

	if (checkBox.checked) {
		chart.forEach(el => {
			var summ = el.querySelector(".chart__sum>span").textContent;
			el.querySelector(".chart__sum>span").textContent = parseFloat(el.querySelector(".chart__sum>span").textContent) * 0.8;
		});
	}
	console.log(checkBox.checked);
	discount.addEventListener("click", function () {
		if (!checkBox.checked) {
			chart.forEach(el => {
				el.querySelector(".chart__sum>span").textContent = parseFloat(el.querySelector(".chart__sum>span").textContent) * 0.8;
			});
		} else {
			chart.forEach(el => {
				el.querySelector(".chart__sum>span").textContent = parseFloat((el.querySelector(".chart__sum>span").textContent) * 100) / 80;
			});
		}
	})
}