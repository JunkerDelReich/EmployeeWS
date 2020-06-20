var id = 0;
var selectedRow = null;

function clear() {
    document.getElementById("nome").value = " ";
    document.getElementById("salario").value = " ";
    document.getElementById("idade").value = 0;
    document.getElementById("avatar").value = " ";

    selectedRow = null;
    id = 0;
}

function save() {
    if (selectedRow == null)
        opInsert();
    else
        opUpdate();

    

    
}

async function opUpdate() {
    obj = validateFields();
    if (obj != null) {
        var json = { "name": obj.nome.value, "salary": obj.salario.value, "age": obj.idade.value, "profile_image": obj.avatar.value };
        var response = await fetch('http://rest-api-employees.jmborges.site/api/v1/update/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        var retorno = await response.json();

        updateRow(retorno.data);
    }
}

async function onDelete(td) {
    if (confirm('você tem certeza que deseja excluir este registro ?')) {


        row = td.parentElement.parentElement;
        id = row.cells[0].innerText;
        var response = await fetch('http://rest-api-employees.jmborges.site/api/v1/delete/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response != null) {
            document.getElementById("myTable").deleteRow(row.rowIndex);
            clear();
        }
        id = 0;
    }
}

async function opInsert() {
    obj = validateFields();
    if (obj != null) {
        var json = { "name": obj.nome.value, "salary": obj.salario.value, "age": obj.idade.value, "profile_image": obj.avatar.value }
        var response = await fetch('http://rest-api-employees.jmborges.site/api/v1/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        var retorno = await response.json();

        insertRow(retorno.data);
    }
}

function insertRow(data) {
    var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell0.innerHTML = data.id;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.salary;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.age;
    cell3 = newRow.insertCell(4);
    cell3.innerHTML = data.profile_image;
    cell4 = newRow.insertCell(5);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;

}

function updateRow(data) {
    selectedRow.cells[1].innerHTML = data.name;
    selectedRow.cells[2].innerHTML = data.salary;
    selectedRow.cells[3].innerHTML = data.age;
    selectedRow.cells[4].innerHTML = data.profile_image;

    clear();
}

function validateFields() {
    var nome = document.getElementById("nome");
    var salario = document.getElementById("salario");
    var idade = document.getElementById("idade");
    var avatar = document.getElementById("avatar");

    if ((nome.value != "") || (salario.value != "") || (idade.value != "") || (avatar.value != "")) {
        var obj = Object;
        obj.nome = nome;
        obj.salario = salario;
        obj.idade = idade;
        obj.avatar = avatar;
        return obj;
    }
    return null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;

    id = selectedRow.cells[0].innerHTML;
    document.getElementById("nome").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salario").value = selectedRow.cells[2].innerHTML;
    document.getElementById("idade").value = selectedRow.cells[3].innerHTML;
    document.getElementById("avatar").value = selectedRow.cells[4].innerHTML;

}
