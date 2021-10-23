function calculator() {
	const result = document.querySelector('.calculating__total span');
	let sex, height, weight, age, ratio;

	function setLocalSettings(selector, activeClass) {
		if (localStorage.getItem("sex")) {
			sex = localStorage.getItem("sex");
		} else {
			sex = "female";
			localStorage.setItem("sex", "female");
		}

		if (localStorage.getItem("ratio")) {
			ratio = localStorage.getItem("ratio");
		} else {
			ratio = 1.375;
			localStorage.setItem("ratio", 1.375);
		}
		const elements = document.querySelectorAll(selector);

		elements.forEach(item => {
			item.classList.remove(activeClass);
			if (item.getAttribute("id") === localStorage.getItem("sex")) {
				item.classList.add(activeClass);
			}

			if (item.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
				item.classList.add(activeClass);
			}
		});
	}



	function calculateResult() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = "____";
			return;
		}

		if (sex === "female") {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calculateResult();

	function getStaticInfo(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(item => {
			item.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
					localStorage.setItem("ratio", e.target.getAttribute("data-ratio"));
				} else {
					sex = e.target.getAttribute("id");
					localStorage.setItem("sex", e.target.getAttribute("id"));
				}

				console.log(ratio, sex);

				elements.forEach(item => {
					item.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);

				calculateResult();
			});
		});
	}

	function getDynamicInfo(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', (e) => {
			e.preventDefault();

			if (input.value.match(/\D/g)) {
				input.style.border = "2px solid rgba(255, 0, 0, 0.7)";
				input.style.transition = "none";
			} else {
				input.style.border = "none";
			}

			switch (e.target.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}

			calculateResult();
		});
	}

	setLocalSettings("#gender div", "calculating__choose-item_active");
	setLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

	getStaticInfo("#gender div", "calculating__choose-item_active");
	getStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");

	getDynamicInfo("#height");
	getDynamicInfo("#weight");
	getDynamicInfo("#age");
}

export default calculator;