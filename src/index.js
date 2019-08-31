const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;
let divToy = document.querySelector("#toy-collection");

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

/// GET ::::

fetch("http://localhost:3000/toys").then(function(resp) {
  resp.json().then(function(dataObject) {
    dataObject.forEach(function(element, i, arr) {
      const toy = `<div class="card">
        <h2> ${element.name}</h2>
        <img src = "${element.image}" class="toy-avatar"/>
        <p class="ppp" id= ${element.id}>${element.likes} Likes</p>
        <button class ="like-btn">like <3</button>
      </div>`;

      divToy.insertAdjacentHTML("beforeend", toy);
    });
  });
});

// POST:::::

const newToyForm = document.querySelector(".add-toy-form");
newToyForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const image = event.target.image.value;
  const likes = 0;

  const formData = {
    name: name,
    image: image,
    likes: likes
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify(formData)
  }).then(function(response) {
    response.json().then(function(data) {
      const toy = `<div class="card">
        <h2> ${data.name}</h2>
        <img src = "${data.image}" class="toy-avatar"/>
        <p class= "ppp", id= ${data.id}, data-likes= ${data.likes} >${data.likes} Likes</p>
        <button class ="like-btn",data-action= "like", id= ${data.id}>like <3</button>
      </div>`;
      let divToy = document.querySelector("#toy-collection");
      divToy.insertAdjacentHTML("beforeend", toy);
    });
  });
});

///Patch ::::

divToy.addEventListener("click", function(event) {
  console.log(event.target.previousElementSibling.id);
  event.preventDefault();
  let id = event.target.previousElementSibling.id;
  let toyLikes = divToy.querySelector(`p[id= "${id}"]`);
  let updatedLikes =
    parseInt(event.target.previousElementSibling.innerText) + 1;
  // debugger;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: updatedLikes
    })
  }).then(function(response) {
    response.json().then(function(data) {
      toyLikes.innerText = `${updatedLikes} Likes`;
    });
  });
});
