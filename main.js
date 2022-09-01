//const { default: axios } = require("axios")



console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000' 

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function getAllCharacters(){
  
  clearCharacters();

  axios.get(`${baseURL}/characters`)
    .then(response =>{
      console.log(response.data)

      // let's store the response data in a variable
      const charactersArr = response.data

      for (let i = 0; i < charactersArr.length; i++){
        console.log(charactersArr[i])

        createCharacterCard(charactersArr[i]);
      }
    })
    .catch(error =>{
       console.log(error)
    })
}


function getOneChar(event){
  clearCharacters();

  axios.get(`${baseURL}/character/${event.target.id}`)
  .then((response)=>{
    console.log(response.data)

    const characterObj = response.data;
    createCharacterCard(characterObj);
  })
}

function createNewChar(event){
  event.preventDefault();

  clearCharacters();

  let newLikes = [...newLikesText.value.split(',')];
  console.log(newLikes)

  let bodyObj = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes
  }

  axios.post(`${baseURL}/character`, bodyObj)
    .then((response) =>{
       
      const newArr = response.data;

      for(let i = 0; i < newArr.length; i++){
        createCharacterCard[newArr[i]];
      }
  })
  newFirstInput.value = ''
  newLastInput.value = ''
  newGenderDropDown.value = ''
  newAgeInput.value = ''
  newLikes.value = ''
}


function getOldChars(event) {
  event.preventDefault()

  clearCharacters()

  axios.get(`${baseURL}/character/?age=${ageInput.value}`)
    .then(function(res) {
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })

  ageInput.value = ''
}



// step:3 attach it with eventlistener

getAllBtn.addEventListener('click', getAllCharacters);

for(let i = 0; i < charBtns.length; i++){
  charBtns[i].addEventListener('click', getOneChar);
}


createForm.addEventListener('submit', createNewChar);

ageForm.addEventListener('submit', getOldChars)