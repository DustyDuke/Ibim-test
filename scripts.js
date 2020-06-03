let users = [
{id: '3', name: 'Bendi Manos', age: 20},
{id: '2', name: 'Al Rayhan', age: 40},
{id: '1', name: 'Ali Sayed', age: 13},
{id: '4', name: 'Ali Sayeda', age: 20}
]

console.log(users)

fetch('https://github.com/DustyDuke/Ibim-test/blob/master/SourceData_JSON/big_data_persons.json')
  .then(response => response.json())
  .then(commits => alert("ok"));




const toUsersTable = user => `
<tr><td>${user.id}</td><td>${user.name}</td><td>${user.age}</td><td><button class="removeButton">&times;</button></td></tr>
`


function render() {

const htmlTable = users.map(user => toUsersTable(user)).join('')
document.querySelector('table').insertAdjacentHTML('beforeEnd', htmlTable)
}

render()


let tbody = document.querySelectorAll('tBody')[0]
let row = Array.from(document.querySelectorAll('tr'))
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


function AddUser(){
let addForm = document.createElement('div')
addForm.insertAdjacentHTML('afterbegin', `
	<div class="modal-overlay"  data-close='true'>
<div class="modal-window">
<span class="modal-close" data-close='true'>&times;</span>
<div class="modal-header">
	
<h2 class="modal-title">Добавить пользователя</h2>
</div>
<div class="modal-body" data-content>
	<form method="post" onsubmit="alert('submit!')">
<input type="text" placeholder="Введите ID" value="" />
<input type="text" placeholder="Введите ФИО"  value="" />
<input type="text" placeholder="Введите возраст" value="" />
<input type="submit" value="Добавить">
</form>
<div class="modal-body" data-content>
</div>
</div>
</div>
`)
document.body.appendChild(addForm)
}

function addData(){
let inputs = Array.from(document.querySelectorAll('input'))

console.log(inputs)
}
AddUser()
addData()
