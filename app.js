const toDoForm = document.querySelector("form"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".pending-list"),
  finishedList = document.querySelector(".finished-list");
const PENDING_LS = "pending";
const FINSHED_LS = "finished";

let pending = [];
let finished = [];

function savePending() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
}

function transPending(event) {
  const finishedObject = pendingRemove(event);
  finishedPaint(finishedObject.text, finishedObject.id);
}

function pendingRemove(event) {
  const icon = event.target;
  const box = icon.parentNode;
  const li = box.parentNode;
  const id = li.id;
  const text = li.childNodes[0].innerText;
  pendingList.removeChild(li);
  const rebuildLi = pending.filter((pendings) => {
    return pendings.id !== parseInt(li.id);
  });
  const finishedObject = {
    id: id,
    text: text,
  };

  pending = rebuildLi;
  savePending();
  return finishedObject;
}

function pendingPaint(text, id = null) {
  const li = document.createElement("li");
  const delBtn = document.createElement("div");
  const icon = document.createElement("i");
  const checkBtn = document.createElement("div");
  const checkIcon = document.createElement("i");
  checkBtn.setAttribute("class", "delBtn-setting");
  checkIcon.setAttribute("class", "far fa-check-square");
  checkBtn.appendChild(checkIcon);

  delBtn.setAttribute("class", "delBtn-setting");
  icon.setAttribute("class", "far fa-times-circle");
  li.setAttribute("class", "list-setting");
  delBtn.addEventListener("click", pendingRemove);

  checkBtn.addEventListener("click", transPending);
  const span = document.createElement("span");
  const newId = pending.length + 1;
  span.innerText = text;
  delBtn.appendChild(icon);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  if (id !== null) {
    li.id = id;
  } else {
    li.id = newId;
  }
  pendingList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  pending.push(toDoObj);
  savePending();
}

function loadPending() {
  const pendingValue = localStorage.getItem(PENDING_LS);
  if (pendingValue !== null) {
    const parsedPendingValue = JSON.parse(pendingValue);
    parsedPendingValue.forEach(function (toDo) {
      pendingPaint(toDo.text);
    });
  }
}

function saveFinished() {
  localStorage.setItem(FINSHED_LS, JSON.stringify(finished));
}

function transFinished(event) {
  const pendingObject = finishedRemove(event);
  pendingPaint(pendingObject.text, pendingObject.id);
}

function finishedRemove(event) {
  const icon = event.target;
  const box = icon.parentNode;
  const li = box.parentNode;
  const id = li.id;
  const text = li.childNodes[0].innerText;
  console.log(text, li);
  finishedList.removeChild(li);
  const pendingObject = {
    id: id,
    text: text,
  };
  const rebuildLi = finished.filter((finisheds) => {
    return finisheds.id !== li.id;
  });

  finished = rebuildLi;
  saveFinished();
  return pendingObject;
}

function finishedPaint(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("div");
  const icon = document.createElement("i");
  const checkBtn = document.createElement("div");
  const checkIcon = document.createElement("i");
  checkBtn.setAttribute("class", "delBtn-setting");
  checkIcon.setAttribute("class", "fas fa-backspace");
  checkBtn.appendChild(checkIcon);
  delBtn.setAttribute("class", "delBtn-setting");
  icon.setAttribute("class", "far fa-times-circle");
  li.setAttribute("class", "list-setting");
  delBtn.addEventListener("click", finishedRemove);
  checkBtn.addEventListener("click", transFinished);
  const span = document.createElement("span");
  span.innerText = text;
  delBtn.appendChild(icon);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  li.id = id;
  finishedList.appendChild(li);
  const toDoObj = {
    text: text,
    id: id,
  };
  finished.push(toDoObj);
  saveFinished();
}

function loadFinished() {
  const finishedValue = localStorage.getItem(FINSHED_LS);
  if (finishedValue !== null) {
    const parsedFinishedValue = JSON.parse(finishedValue);
    parsedFinishedValue.forEach(function (toDo) {
      finishedPaint(toDo.text, toDo.id);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = toDoInput.value;
  pendingPaint(inputValue);
  toDoInput.value = "";
}

function init() {
  loadPending();
  loadFinished();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
