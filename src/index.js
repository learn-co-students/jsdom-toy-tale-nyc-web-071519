const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const container = document.getElementById('toy-collection')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(data => {
  data.forEach(function (el, I, arr){
    const str = `
    <div class="card">
      <h2>${el.name}</h2>
      <img src=${el.image} class="toy-avatar" />
      <p><span data-toy-id=${el.id} data-action="like">${el.likes} Likes </span></p>
      <button class="like-btn" data-action="like" data-toy-id=${el.id}>Like <3</button>
    </div>`

    container.insertAdjacentHTML("beforeend", str)
  });
})

const newToyForm = document.querySelector(".add-toy-form")

newToyForm.addEventListener("submit", function(e){
  e.preventDefault()

  //grab all the user input
  const name = e.target.name.value
  const image = e.target.image.value
  const likes = 0

  // tie in neat little bow (object)
  const formData = {
    name: name,
    image: image,
    likes: likes,
  }


  // send off the request
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(data => {
    const str = `
      <div class="card">
        <h2>${data.name}</h2>
        <img src=${data.image} class="toy-avatar" />
        <p><span data-toy-id=${data.id}>${data.likes} Likes </span></p>
        <button class="like-btn" data-action="like" data-toy-id=${data.id}>Like <3</button>
      </div>`

    container.insertAdjacentHTML("beforeend", str)
  })

})

container.addEventListener("click", function(e){
  if (e.target.dataset.action === "like"){
    e.preventDefault()

    //get the like count and id
    let spans = document.querySelectorAll(`span`)
    NodeList.prototype.find = Array.prototype.find
    let span = spans.find(span => span.dataset.toyId === e.target.dataset.toyId)
    const likes = parseInt(span.textContent) + 1
    const id = span.dataset.toyId

  
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: `{
        "likes": ${likes}
      }`     
    })
    .then(res => res.json())
    .then(data => { 
        let spans = document.querySelectorAll(`span`)
        NodeList.prototype.find = Array.prototype.find
        let span = spans.find(span => span.dataset.toyId === e.target.dataset.toyId)
        let likes = parseInt(span.textContent) + 1
        span.textContent = `${likes} Likes`  
    })
  }
})
