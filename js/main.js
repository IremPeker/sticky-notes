$(document).ready(function() {
  const textArea = document.getElementById("text-area");
  const toDo =
    localStorage.getItem("todo") == null
      ? []
      : JSON.parse(localStorage.getItem("todo"));

  // create new div
  createNew = newToDo => {
    const closeButton = "✖";
    const saveButton = "✔";
    $("#notes-wrapper").append(
      `<div class="newItem"><textarea class="new-text-area">${newToDo.item}</textarea><button id="${newToDo.id}" class="close-button">${closeButton}</button><button class="save-button">${saveButton}</button><p class="date-time">Created At: ${newToDo.dateAndTime}</p></div>`
    );
  };

  // save on local storage
  $(".input-save").on("click", function(e) {
    e.preventDefault();
    getToDo();
    textArea.value = "";
  });

  getToDo = newToDo => {
    textIdGen();
    getDateAndTime();

    // the object 
    newToDo = {
      item: textArea.value,
      id: textId,
      dateAndTime: createdAt 
    };

    if (toDo == null) toDo = [];
    toDo.push(newToDo);
    localStorage.setItem("todo", JSON.stringify(toDo));
    createNew(newToDo);
  };

  toDo.forEach(item => {
    createNew(item);
  });

  // delete 

  $(".close-button").on("click", function(e) {
    // find the id of the target
    const targetClose = e.target.id;
    for (let i = 0; i < toDo.length; i++) {
      if (targetClose == toDo[i].id) e.target.parentElement.remove();
    }
    // remove from toDo array
    const index = toDo.findIndex(x => x.id == targetClose);
    toDo.splice(index, 1);
    // set localStorage again with the latest version of toDo array
    localStorage.setItem("todo", JSON.stringify(toDo));
  });

  // update 

  $(".save-button").on("click", function(e) {
    const targetUpdate = e.target.previousSibling.id;
    const newValue = document.getElementsByClassName("new-text-area");
    const newDate = document.lastModified;
    const dateTime = document.getElementsByClassName("date-time");
    // find the index of the selected item
    const index = toDo.findIndex(x => x.id == targetUpdate);
    // update the element inside the toDo array
    toDo[index].item = newValue[index].value;
    toDo[index].dateAndTime = newDate;
    dateTime[index].textContent = `Updated At: ${newDate}`;
    // set localStorage again with the latest version of toDo array
    localStorage.setItem("todo", JSON.stringify(toDo));
  });

  // how-to use explanation onclick

  $(".flip-input").on("click", ".how-to", function() {
    $(".flip-input").toggleClass("flipped");
  });

  // generate unique id's for close buttons
  textIdGen = () => {
    for (let i = 0; i <= localStorage.length; i++) {
      textId = new Date().getTime();
    }
  };

  // get date for each toDo
  getDateAndTime = () => {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    createdAt = date+' '+time;
  }
});


