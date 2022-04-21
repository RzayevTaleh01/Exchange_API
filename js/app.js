let ulFrom = document.querySelector(".ul-from");
let ulFromLi = document.querySelectorAll(".ul-from li");
let ulTo = document.querySelector(".ul-to");
let ulToLi = document.querySelectorAll(".ul-to li");
let fromInput = document.querySelector(".from-input");
let toInput = document.querySelector(".to-input");
let form = document.querySelector(".from-form");
let fromP = document.querySelector(".from-p");
let toP = document.querySelector(".to-p");
let from = "RUB",
  to = "USD";
fromInput.value = 1;

eventListeners();
checkLi();

function eventListeners() {
  ulFrom.addEventListener("click", fromValue);
  ulTo.addEventListener("click", toValue);
  fromInput.addEventListener("keyup", getData);
  form.addEventListener("submit", getData);
  ulTo.addEventListener("click", getData);
  ulFrom.addEventListener("click", getData);
  document.addEventListener("DOMContentLoaded", getData);
}

function getData(e) {
  let out;
  e.preventDefault();
  fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      out = Object.values(data.rates)[0];
      fromP.innerText = `1 ${from} = ${out} ${to}`;
      toP.innerText = `1 ${to} = ${1 / out} ${from}`;
      calc(out);
    });
}

function fromValue(e) {
  if (e.target.className === "li-from") {
    from = e.target.innerText;
    checkLi();
  }
  e.preventDefault();
}

function toValue(e) {
  if (e.target.className === "li-to") {
    to = e.target.innerText;
    checkLi();
  }
  e.preventDefault();
}

function calc(out) {
  toInput.value = (out * fromInput.value).toFixed(4);
}

function checkLi() {
  ulFromLi.forEach((item) => {
    item.classList.remove("active");
    if (from == item.innerText) {
      item.classList.add("active");
    }
  });
  ulToLi.forEach((item) => {
    item.classList.remove("active");
    if (to == item.innerText) {
      item.classList.add("active");
    }
  });
}
