const year = document.querySelector(".date-box__year");
const date = document.querySelector(".date-box__date");

const month = new Date().getMonth() + 1;
const dates = new Date().getDate();

year.innerText = new Date().getFullYear();
date.innerText = `${month < 10 ? `0${month}` : month}/${
  dates < 10 ? `0${dates}` : dates
} `;
