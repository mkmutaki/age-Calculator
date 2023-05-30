const inputDay = window.document.querySelector("#Day");
const inputMonth = window.document.querySelector("#Month");
const inputYear = window.document.querySelector("#Year");
const inputs = window.document.querySelectorAll(".dates");

const submit = window.document.querySelector("#submit-btn");
const resultDiv = window.document.querySelector("#result");
const form = window.document.querySelector("#form-dates");

const curDate = new Date();
let curDay = curDate.getDate();
let curMonth = curDate.getMonth() + 1;
let curYear = curDate.getFullYear();
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

////functions////

function displayResult(day, month, year) {
  resultDiv.innerHTML = "";
  resultDiv.innerHTML = `<div class="time" id="output-year">
  <span class="text-purple"> ${year} </span> years</div>
 <div class="time" id="output_month">
   <span class="text-purple"> ${month} </span> months</div>
 <div class="time" id="output_day">
   <span class="text-purple"> ${day} </span> days</div>`;

  anime({
    targets: resultDiv,
    translateX: 50,
    direction: "alternate",
  });
}

function daysInAMonth(month, year) {
  return (date = new Date(year, month, 0).getDate());
}

function isAValidDate(day, month, year) {
  const daysInMonth = daysInAMonth(month, year);
  if (day > daysInMonth) return false;
  return true;
}

function isAFutureDate(userDate, curDate) {
  if (userDate > curDate) return true;
  return false;
}

function showErrors(input, message) {
  const parent = input.parentNode;
  const span = input.nextElementSibling;
  parent.classList.add("error");
  span.style.display = "flex";
  span.textContent = message;
  console.log(parent);
}

function hideErrors(input) {
  const parent = input.parentNode;
  const span = input.nextElementSibling;
  parent.classList.remove("error");
  span.style.display = "none";
  span.textContent = "";
}

function formatValue(value, isYear) {
  if (isYear) {
    switch (String(value).length) {
      case 1:
        return `000${value}`;
      case 2:
        return `00${value}`;
      case 3:
        return `0${value}`;
      default:
        return value;
    }
  } else {
    if (String(value).length < 2) return `0${value}`;
    return value;
  }
}

function verify() {
  let validate = true;

  inputs.forEach((input) => {
    const userDay = parseInt(inputDay.value);
    const userMonth = parseInt(inputMonth.value);
    const userYear = parseInt(inputYear.value);
    const userString = `${userYear}-${userMonth}-${userDay}`;
    const userDate = new Date(userString);

    if (!input.value) {
      hideErrors(input);
      showErrors(input, "Value is required");
      validate = false;
    } else if (userDay <= 0 || userDay > 31 || !isAValidDate(userDay, userMonth, userYear) || isNaN(userDay)) {
      hideErrors(input);
      showErrors(inputDay, "Day is not valid");
      validate = false;
    } else if (userMonth <= 0 || userMonth > 12 || isNaN(userMonth)) {
      hideErrors(input);
      showErrors(inputMonth, "Month is not valid");
      validate = false;
    } else if (userYear > curYear) {
      hideErrors(input);
      showErrors(inputYear, "Must be in the past");
      validate = false;
    } else if (userYear <= 0 || isNaN(inputYear.value)) {
      hideErrors(input);
      showErrors(inputYear, "Year is not valid");
      validate = false;
    } else if (isAFutureDate(userDate, curDate)) {
      hideErrors(input);
      showErrors(input, "Date must be in the past");
      validate = false;
    } else {
      hideErrors(input);
      validate = true;
    }
  });
  return validate;
}

function handleSubmit(e) {
  e.preventDefault();
  curDay = curDate.getDate();
  curMonth = curDate.getMonth() + 1;
  curYear = curDate.getFullYear();

  if (verify()) {
    if (inputDay.value > curDay) {
      curDay = curDay + months[curMonth - 1];
      curMonth = curMonth - 1;
    }

    if (inputMonth.value > curMonth) {
      curMonth = curMonth + 12;
      curYear = curYear - 1;
    }

    const d = curDay - inputDay.value;
    const m = curMonth - inputMonth.value;
    const y = curYear - inputYear.value;

    displayResult(d, m, y);
  }
}

//// Events ////
inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    let inputVal = input.value;
    if (isNaN(Number(inputVal)) || String(inputVal).length == 0) return;

    if (input.getAttribute("id") == "Year") {
      input.value = formatValue(inputVal, true);
    } else {
      input.value = formatValue(inputVal, false);
    }
  });
});

form.addEventListener("submit", handleSubmit);
