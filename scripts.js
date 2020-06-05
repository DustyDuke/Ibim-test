let users = []
let row = []
async function getUsers(){
	let response = await fetch('https://ibim-test.firebaseio.com/users/.json/')
  .then(response => response.json())
  .then(data => {data.map(user => users.push(user))
  Render()
row = Array.from(document.querySelectorAll('tr'))})
}

getUsers()

const toUsersTable = user => `
<tr><td>${user.ID}</td><td>${user.Name}</td><td>${user.Age}</td><td><button class="removeButton">Удалить</button></td></tr>
`

function Render(){
const htmlTable = users.map(user => toUsersTable(user)).join('')
document.querySelector('table').insertAdjacentHTML('beforeEnd', htmlTable)
}

// ==== Table Sort

let tbody = document.querySelectorAll('tBody')[0]


function SortAge(){
let sortAge = row.slice(1).sort((rowA, rowB) => rowA.cells[2].innerHTML > rowB.cells[2].innerHTML ? 1 : -1)
  tbody.append(...sortAge)
}

function SortSurname(){
let sortSurname = row.slice(1).sort((rowA, rowB) =>  rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1)
tbody.append(...sortSurname)

}

function SortName(){
	let sortName = row.slice(1).sort((rowA, rowB) => rowA.cells[1].innerHTML.split(' ')[1] < rowB.cells[1].innerHTML.split(' ')[1]  ? 1 : -1)
	console.log(sortName)
	tbody.append(...sortName)

}

table.onclick = function(event) {
      if (event.target.className != 'removeButton') return;
	let removeRow = event.target.closest('tr')
    removeRow.remove()
}

//===== Modal Window
let showForm = document.querySelector('.addUserForm')
function AddUser() {	
	showForm.classList.remove('hide')
}

function ModalClose() {
	showForm.classList.add('hide')
}

let overlayClose = document.querySelector('.modal-overlay')
overlayClose.onclick = function(event) {
     if(event.target != this) return;
     ModalClose()
}
//=== Add User Form
let input = Array.from(document.querySelectorAll('input'))

input = input.slice(0, input.length-1)

input.validity = {  
  valid: false, // Поле валидно
  rangeOverflow: false, // Значение превосходит атрибут max
  rangeUnderflow: true, // Значение меньше атрибута min
 tooLong: false, // Значение слишком длинное
  tooShort: false, // Значение слишком короткое
  typeMismatch: false, // Значение не соответствует указаному атрибуту type
  valueMissing: false, // Отсутствует обязательное значение
};
