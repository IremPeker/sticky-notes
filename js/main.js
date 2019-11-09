$(document).ready(function() {
  console.log(`document is ready...`);

  let textareaVal = document.getElementById("text");
  console.log(`textareaVal.value=>`, textareaVal.value);

  let toDo =
    localStorage.getItem("todo") == null
      ? []
      : JSON.parse(localStorage.getItem("todo"));

  // create new div
  createNew = item => {
    console.log(`I will get item...`);

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
    console.log(`toDo array before remove=>`, toDo);

    let targetClose = e.target.id;
    console.log(`e.target=>`, targetClose);

    for (let i = 0; i < toDo.length; i++) {
      if (targetClose == toDo[i].id) e.target.parentElement.remove();
    }
    // remove from toDo array
    let index = toDo.findIndex(x => x.id == targetClose);
    console.log(`index is=>`, index);
    toDo.splice(index, 1);

    // set localStorage again with the latest version of toDo array
    localStorage.setItem("todo", JSON.stringify(toDo));
    console.log(`toDo array after remove=>`, toDo);
  });

  // update specific item
  // needs improvements============>, newValue gives only the value of the item at index 0

  $(".createNewDiv").on("click", "span.save", function(e) {
    console.log(`update onclick...`);
    console.log(`toDo array before update=>`, toDo);

    let targetUpdate = e.target.previousSibling.id;
    console.log(`e.target=>`, targetUpdate);

    console.log(
      `targetUpdate previpus sibling=>`,
      e.target.previousSibling.previousSibling
    );

    let newValue = $(".inputVal").val();
    console.log(`new value=>`, newValue);

    // find the index of the item
    let index = toDo.findIndex(x => x.id == targetUpdate);
    console.log(`index of the updated item is=>`, index);
    console.log(`before update item is=>`, toDo[index].item); //this works

    // toDo[index].item = newValue;

    // console.log(`after update=>`, toDo[index].item);
    // // // set localStorage again with the latest version of toDo array
    // // localStorage.setItem("todo", JSON.stringify(toDo));
    // console.log(`toDo array after update=>`, toDo);
  });

  textIdGen = () => {
    for (let i = 0; i <= localStorage.length; i++) {
      textId = new Date().getTime();
    }
  };
});
