const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toysContainer = document.getElementById("toy-collection");
const newToyForm = document.querySelector(".add-toy-form");
let toyCard = document.querySelector(".card");
let addToy = false;

// YOUR CODE HERE

fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach(function(element) {
      toy = `
      <div class="card">
        <h2>${element.name}</h2>
          <img src=${element.image} class="toy-avatar" />
          <p><span data-id=${element.id}>${element.likes}<span> Likes </p>
        <button class="like" data-id=${element.id} data-action="like">Like <3</button>
      </div>
      `;

      toysContainer.insertAdjacentHTML("beforeend", toy);
    });
  });

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

newToyForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const image = e.target.image.value;
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
  })
    .then(res => res.json())
    .then(data => {
      const string = `
    <div class="card">
      <h2>${data.name}</h2>
        <img src=${data.image} class="toy-avatar" />
        <p><span data-id=${data.id}>${data.likes}<span> Likes </p>
      <button class="like" data-id=${element.id} data-action="like">Like <3</button>
    </div>`;
      toysContainer.insertAdjacentHTML("beforeend", string);
    });
});

// like button

toysContainer.addEventListener("click", function(e) {
  e.preventDefault();
  if (e.target.dataset.action === "like") {
    // find span
    let spans = document.querySelectorAll(`span`);
    NodeList.prototype.find = Array.prototype.find;
    let span = spans.find(span => span.dataset.id === e.target.dataset.id);
    // update span
    span.innerText = parseInt(span.textContent) + 1 + " Likes";
  }
});
