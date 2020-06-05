let users = []
let row = []

 
 

//console.log(response)
const toUsersTable = user => `
<tr><td>${user.ID}</td><td>${user.Name}</td><td>${user.Age}</td><td><button class="removeButton">&times;</button></td></tr>
`

function Render(){
const htmlTable = users.map(user => toUsersTable(user)).join('')
document.querySelector('table').insertAdjacentHTML('beforeEnd', htmlTable)
}

//console.log(htmlTable)

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
<input type="text" placeholder="Введите ID" />
<input type="text" placeholder="Введите ФИО"  />
<input type="text" placeholder="Введите возраст" />
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
let inputs = document.querySelectorAll('input')
let res = 
console.log(inputs)
}
//AddUser()
//AddData()
