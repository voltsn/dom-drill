const list = document.querySelector("ul");
const listItems = list.children
// List all the children from the ul using childNodes.
console.log(list.childNodes);

// Iterate over every child
for (let i = 0; i < list.children.length; i++){
  // Iterate over only element nodes.
  if (listItems[i].nodeType === 1){
    // Add event listener to all items
    listItems[i].addEventListener("click", (event) => {
      let output = event.target.textContent;
      if (output === "Fast and Furious"){
        output = "The most important franchise ever, the story of DOM(inic) Toretto's family. It's not about car, it's about family.";
      }

      alert(output);
    });

    // If "fast and furious" is not at the top, put to the top.
    if (listItems[i].textContent === "Fast and Furious" && i !== 0){
      // .important class
      listItems[i].classList.add("important");
      list.insertBefore(listItems[i], listItems[0]);
    }

    // Remove duplicates
    for (let j = 0; j < listItems.length; j++){
      if (j === i){
        continue;
      }

      if (listItems[i].isEqualNode(listItems[j])){
        list.removeChild(listItems[j]);
      }
    }
  }
}

// When pressing the r key list should get sorted in random order
// but fast and furious should remain the first element.
document.body.addEventListener("keypress", (event) => {
  if (event.code === "KeyR"){
    for (let i = 1; i < listItems.length; i++){
      let randIndex = Math.floor(Math.random() * (listItems.length - 1) + 1);
      list.insertBefore(listItems[randIndex], listItems[i]);
    }
  }
});

document.body.addEventListener("keypress", (event) => {
  if (event.code === "KeyD"){
    let clonedNode = listItems[0].cloneNode(true);
    list.insertBefore(clonedNode, listItems[0]);
  }
});

// Add a div before the list
let div = document.createElement("div");
document.body.insertBefore(div, list);

// Add a select element inside the div
let select = document.createElement("select");
let option1 = document.createElement("option");
let option2 = document.createElement("option");

option1.appendChild(document.createTextNode("normal franchise"));
option2.appendChild(document.createTextNode("important franchise"));

select.appendChild(option1);
select.appendChild(option2);

div.appendChild(select);

// Display only elements with the class important when the
// when the important franchise is selected.
select.addEventListener("change", (event) => {
  if (event.target.value === "important franchise"){
    for (let item of listItems){
      if (!item.classList.contains("important")){
        item.style.visibility = "hidden";
      }
    }
  }else{
    for (let item of listItems){
      item.style.visibility = "visible";
    }
  }
});

