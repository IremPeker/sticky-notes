$(document).ready(function() {
  console.log(`document is ready...`);

  // this is the textarea in html
  let textareaVal = document.getElementById("text");

  let toDo =
    localStorage.getItem("todo") == null
      ? []
      : JSON.parse(localStorage.getItem("todo"));

  // create new div
  createNew = item => {
    let spanClose = "✖";
    let spanSave = "✔";
    $("#notes").append(
      `<div class="createNewDiv"><textarea class="inputVal">${item.item}</textarea><span id="${item.id}" class="close">${spanClose}</span><span class="save">${spanSave}</span></div>`
    );
  };

  // save on local storage
  $(".saveInput").on("click", function(e) {
    console.log(`create button onclick...`);
    e.preventDefault();
    getToDo();
    textareaVal.value = "";
  });

  getToDo = item => {
    console.log(`inside getToDo function`);

    console.log(`textareaVal.value=>`, textareaVal.value);
    textIdGen();

    // this is the object that I will push into the ToDo array
    item = {
      item: textareaVal.value,
      id: textId
    };

    if (toDo == null) toDo = [];
    toDo.push(item);
    console.log(`todo array after push=>`, toDo);

    console.log(`I will set item...`);

    localStorage.setItem("todo", JSON.stringify(toDo));

    createNew(item);
  };

  toDo.forEach(item => {
    console.log(`item inside for each=>`, item);
    createNew(item);
  });

  // delete specific item

  $(".createNewDiv").on("click", "span.close", function(e) {
    console.log(`delete onclick...`);

    // find the id of the target
    let targetClose = e.target.id;

    for (let i = 0; i < toDo.length; i++) {
      if (targetClose == toDo[i].id) e.target.parentElement.remove();
    }
    // remove from toDo array
    let index = toDo.findIndex(x => x.id == targetClose);
    toDo.splice(index, 1);

    // set localStorage again with the latest version of toDo array
    localStorage.setItem("todo", JSON.stringify(toDo));
  });

  // update specific item

  $(".createNewDiv").on("click", "span.save", function(e) {
    console.log(`update onclick...`);
    console.log(`toDo array before update=>`, toDo);

    let targetUpdate = e.target.previousSibling.id;
    let newValue = document.getElementsByClassName("inputVal");

    // find the index of the selected item
    let index = toDo.findIndex(x => x.id == targetUpdate);
    console.log(`index of the updated item is=>`, index);
    console.log(`newValue of the specific item is`, newValue[index].value);

    console.log(`before update item is=>`, toDo[index].item);

    // update the element inside the toDo array
    toDo[index].item = newValue[index].value;

    console.log(`after update=>`, toDo[index].item);

    // set localStorage again with the latest version of toDo array
    localStorage.setItem("todo", JSON.stringify(toDo));
    console.log(`toDo array after update=>`, toDo);
  });

  // how-to use explanation onclick

  $(".flip-input").on("click", ".how-to", function() {
    console.log(`how to onclick....`);

    $(".flip-input").toggleClass("flipped");
  });

  // this is to generate unique id's for close spans
  textIdGen = () => {
    for (let i = 0; i <= localStorage.length; i++) {
      textId = new Date().getTime();
    }
  };
});
