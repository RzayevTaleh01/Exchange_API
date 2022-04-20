let ulFrom = document.querySelector(".ul-from");
let ulTo = document.querySelector(".ul-to");
let fromInput = document.querySelector(".from-input");
let toInput = document.querySelector(".to-input");
let form = document.querySelector(".from-form");
let fromP = document.querySelector(".from-p");
let toP = document.querySelector(".to-p");
let from = "RUB",
  to = "USD";
eventListeners();
function eventListeners() {
  ulFrom.addEventListener("click", fromValue);
  ulTo.addEventListener("click", toValue);
  fromInput.addEventListener("keyup", getData);
  form.addEventListener("submit", getData);
  ulTo.addEventListener("click", getData);
  ulFrom.addEventListener("click", getData);
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
      calc(out, fromInput.value);
    });
}
function fromValue(e) {
  if (e.target.className === "li-from") {
    from = e.target.innerText;
    checkli(".ul-from");
    e.target.classList.add('active');
  }
  e.preventDefault();
  console.log(from);
}

function toValue(e) {
  if (e.target.className === "li-to") {
    to = e.target.innerText;
    checkli(".ul-to");
    e.target.classList.add('active');
  }
  e.preventDefault();
  console.log(to);
}

function calc(value, from) {
  console.log(value);
  console.log(value * from);
  toInput.value = value * from;
}
function checkli(className) {
  let allLi = document.querySelectorAll(`${className} li`);
  allLi.forEach((item) => {
    item.classList.remove("active");
  });
}
