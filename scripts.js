
let users = []
let row = []
async function getUsers(){
	await fetch('https://ibim-test.firebaseio.com/users.json')
  .then(response => response.json())
  .then(data => {
    for (const [key, value] of Object.entries(data)) { users.push(value);}
  Render()
row = Array.from(document.querySelectorAll('tr'))})
}

getUsers()
const toUsersTable = user => `
<tr><td>${user.ID}</td><td>${user.Name}</td><td>${user.Age}</td><td><button class="removeButton">Удалить</button><button class="editButton">Изменить</button></td></tr>
`
function Render(){
const htmlTable = users.map(user => toUsersTable(user)).join('')
document.querySelector('table').insertAdjacentHTML('beforeEnd', htmlTable)
}

// ==== Table Sort

let tbody = document.querySelectorAll('tBody')[0]

let SortAge = () =>{
let sortAge = row.slice(1).sort((rowA, rowB) => rowA.cells[2].innerHTML > rowB.cells[2].innerHTML ? 1 : -1)
  tbody.append(...sortAge)
}

let SortSurname = () => {
let sortSurname = row.slice(1).sort((rowA, rowB) =>  rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1)
tbody.append(...sortSurname)
}

let SortName = () => {
	let sortName = row.slice(1).sort((rowA, rowB) => rowA.cells[1].innerHTML.split(' ')[1] < rowB.cells[1].innerHTML.split(' ')[1]  ? 1 : -1)
	tbody.append(...sortName)
}

// Remove User
table.addEventListener('click', function(event) {
      if (event.target.className != 'removeButton') return;
  let removeRow = event.target.closest('tr')
  let userID = removeRow.querySelector('td').innerHTML

 fetch(`https://ibim-test.firebaseio.com/users.json`)
        .then(response => response.json())
        .then(data => { 
          let a = Object.values(data).map(el => Object.values(el)[1])        
        let delID = a.indexOf(`${userID}`)
         fetch(`https://ibim-test.firebaseio.com/users/${delID}.json`, {method: "DELETE"})
        .then(response => response.json())  
        }
         ) 
    removeRow.remove()

})  


table.addEventListener('click', function(event) {
      if (event.target.className != 'editButton') return;
 EditUser()
})

//===== Modal Window
let forms = document.querySelectorAll('.modal')
let showForm = document.querySelector('.addUserForm')
let AddUser = () => showForm.classList.remove('hide')

function ModalClose(){Array.from(forms).map(el => el.classList.add('hide'))}

let showEditForm = document.querySelector('.editUserForm')
let EditUser = () => showEditForm.classList.remove('hide')

let overlayClose = Array.from(document.querySelectorAll('.modal-overlay'))
overlayClose.map( el => el.onclick = function(e) {
     if(event.target != this) return;
    ModalClose()
})


// Edit cells
let editForm = document.querySelector('.editUserForm')
let inputValues = Array.from(document.querySelectorAll('.editUserForm input'))

table.onclick = function(event) {
      if (event.target.className != 'editButton') return;
let findRow = event.target.closest('tr')
let values = Array.from(findRow.querySelectorAll('td'))
let saveBtn = editForm.querySelector('input[type="button"]')

inputValues.slice(0, 3).map((val, idx) => {
  let elems = values.slice(0, 3).map(el => el.innerHTML)
  val.value = elems[idx]
})
 let removeRow = event.target.closest('tr')
  let userID = removeRow.querySelector('td').innerHTML
saveBtn.onclick = function(event) {
let id = inputValues[0]
let name = inputValues[1]
let age = inputValues[2]
if(id.value != values[0].innerHTML || name.value != values[1].innerHTML || age.value != values[2].innerHTML){
if(IdValidator(id) && NameValidator(name) && AgeValidator(age)){
values[0].innerHTML = id.value
values[1].innerHTML = name.value
values[2].innerHTML = age.value

fetch(`https://ibim-test.firebaseio.com/users.json`)
        .then(response => response.json())
        .then(data => { 
          let a = Object.values(data).map(el => Object.values(el)[1])        
        let chID = a.indexOf(`${userID}`)
        let user = {
            ID: id.value,
            Name: name.value,
            Age: age.value
        };

         fetch(`https://ibim-test.firebaseio.com/users/${chID}.json`, 
          {method: "PATCH",
           body: JSON.stringify(user),
          headers: {'Content-type': 'application/json'}})
        .then(response => response.json())   
  }).then(ModalClose()) 
} return false
    } ModalClose()
  }
}

//=== User Form Validation

let sendform = document.querySelector('input[type="button"]')
let form = document.querySelector('addUser')
let inputs = Array.from(document.querySelectorAll('input[type="text"]'))

sendform.addEventListener('click', function(e) {
	let id = inputs[0];
	let name = inputs[1]
	let age = inputs[2]
if(IdValidator(id) && NameValidator(name) && AgeValidator(age)){
  
		 let user = {
		 	      ID: id.value,
            Name: name.value,
            Age: age.value
        };
        fetch(`https://ibim-test.firebaseio.com/users.json`, 
        	{method: 'POST',
        	body: JSON.stringify(user),
        	headers: {'Content-type': 'application/json'}
        	})
        .then(response => response.json())
				.then(data => { users.push(user)
                  let newUser = `
                <tr><td>${user.ID}</td><td>${user.Name}</td><td>${user.Age}</td><td>
                <button class="removeButton">Удалить</button>
                <button class="editButton">Изменить</button>
                </td></tr>
                `
                document.querySelector('table').insertAdjacentHTML('beforeEnd', newUser)
                                })
         .catch(alert)
         .then(ModalClose())
         .then(inputs.map(input => input.value = ''))
        .then(alert('Пользователь добавлен'))

               
  return true;
	} else false;
})


 function IdValidator(inp) {
let ids = []
Array.from(users).map(user => ids.push(user.ID))
let value = inp.value
let match = ids.forEach(el => {
	if(+el === +value){
		return (alert('Такой ID уже есть'))
    return false
 } else return;
	})
 	if(!inp.value){
	alert(`${inp.placeholder}`)
  	return false
 	} else if (inp.value.length > 1000 && inp.value.match(/[^0-9.,]+/g)) {
  	inp.value = '';
	alert('ID слишком длинный должен содержать только цифры');
	return false;
  } else if (inp.value.match(/[^0-9.,]+/g)) {
  	inp.value = '';
    alert('ID должен содержать только цифры');
    return false;
  }  else if (inp.value.length > 1000){
  	inp.value = '';
  	alert('ID слишком длинный');
  	 return false;
  } return true
}

function NameValidator(inp) {
 	if(!inp.value){
	alert(`${inp.placeholder}`)
  	return false
  } else if (inp.value.length > 100 && inp.value.match(/[^a-zA-Zа-яА-Я ]+/g)) {
  	inp.value = '';
	alert('ФИО слишком длинное и должно содержать только буквы');
 	return false;
  } else if (inp.value.match(/[^a-zA-Zа-яА-Я ]+/g)) {
  	inp.value = '';
    alert('Имя должно содержать только буквы');
     return false;
  } else if (inp.value.length > 100){
  	inp.value = '';
    alert('ФИО слишком длинное');
     return false;
  } return true;
}

function AgeValidator(inp) {
	if(!inp.value){
	alert(`${inp.placeholder}`)
  	return false
  } else if (inp.value.length > 1000 && inp.value.match(/[^0-9.,]+/g)) {
  	inp.value = '';
	alert('Возраст слишком большой и должен содержать только цифры');
 	return false;
  } else if (inp.value.match(/[^0-9.,]+/g)) {
  	inp.value = '';
    alert('Возраст должен содержать только цифры');
     return false;
  }  else if (inp.value.length > 1000){
  	inp.value = '';
  	alert('Возраст слишком большой');
  	 return false;
  } else if (!Number.isInteger(+inp.value) === true){
  	let checkDecimal
  	if(inp.value.includes('.')){ 
  	checkDecimal = inp.value.split('.')
  		}else if(inp.value.includes(',')){
	checkDecimal = inp.value.split(',')
  		}
	if(+checkDecimal[1].length > 4){
	inp.value = '';
	alert('Дробная часть не должна быть длиннее 4 символов')
	} return false;
	} return true;
} 
