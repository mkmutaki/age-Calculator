const inputDay = document.querySelector(".input_day");
const inputMonth = document.querySelector(".input_month");
const inputYear = document.querySelector(".input_year");
const submit = document.querySelector(".submit-btn");
const outputDay = document.querySelector(".output_day");
const outputMonth = document.querySelector(".output_month");
const outputYear = document.querySelector(".output_year");

const now = new Date();
const day = now.getDay();
const month = now.getMonth();
const year = now.getFullYear();
