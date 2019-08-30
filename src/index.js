const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let collectionList = document.querySelector('#toy-collection')

function createCard(data){
  const htmlString = `<div class="card", data-id=${data.id}>
      <h2>${data.name}</h2>
      <img src=${data.image} class="toy-avatar" />
      <p data-id=${data.id}>${data.likes} Likes </p>
      <button class="like-btn", data-id=${data.id}>Like <3</button>
    </div>`
  collectionList.insertAdjacentHTML('beforeend', htmlString);
}

fetch ('http://localhost:3000/toys',)
.then (response => {return response.json()})
.then (data => {
  data.forEach( element =>{
    // console.log(element)
    createCard(element);
  }) 
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
toyForm.addEventListener('submit', e => {
  e.preventDefault();
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    })
  })
    .then (response => {return response.json()})
    .then (data => {
      // console.log(data)
    createCard(data);
  }) 
})

collectionList.addEventListener('click', e => {
  const id = e.target.dataset.id;
  const Likes = collectionList.querySelector(`p[data-id = "${id}"]`);
  correctLikes = parseInt(Likes.innerText) + 1
  
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": correctLikes,
    })
  })
    .then (response => {return response.json()})
    .then (data => {
      Likes.innerText = `${data.likes} Likes`;
    });
})
