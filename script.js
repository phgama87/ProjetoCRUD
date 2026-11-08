//busca o elemtos do html

const form =document.getElementById("formClient");
const listaClientes= document.getElementById("listaClientes")

//Recupera clientes salvos no navegador
let clientes =JSON.parse(localStorage.getItem("clientes")) || [];

//guardao índice do cliente que está sndo editado
let indiceEdicao = null;

//Salva os clientes no LocalStorage
function salvarDados() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

//mostra os clientes na tabela
function listarClientes() {
    listaClientes.innerHTML = "";

    clientes.forEach((cliente, indice) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.cidade}</td>
            <td>
                <button type="button" onclick="editarCliente(${indice})">
                    Editar
                </button>
                <button type="button" onclick="excluirCliente(${indice})">
                    Excluir
                </button>
            </td>
        `;

        listaClientes.appendChild(linha);
    });
}

//Cadastra ou atualiza um cliente 
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const cliente = {
        nome: document.getElementById("nome").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        cidade: document.getElementById("cidade").value.trim(),
        
    };

    if (indiceEdicao === null) {
        clientes.push(cliente);
        alert("Cliente Cadastrado  com sucesso !");

    }else {
        clientes[indiceEdicao] = cliente;
        alert("Cliente Atualizado com sucesso !");
        indiceEdicao = null;
    }

    salvarDados();
    listarClientes();
    form.reset();
});

//edita um cliente
function editarCliente(indice) {
    const cliente =  clientes[indice];

    document.getElementById("nome").value = cliente.nome;
    document.getElementById("email").value = cliente.email;
    document.getElementById("telefone").value = cliente.telefone;
    document.getElementById("cidade").value = cliente.cidade;

    indiceEdicao = indice;
}

//excluir um cliente
function excluirCliente(indice) {
    const confirmar = confirm("Deseja relamente excluir este cliente?");

    if  (confirmar){
        clientes.splice(indice, 1);

        salvarDados();
        listarClientes();

        alert("Cliente excluído com sucesso !")

    }

}
//carrega a lista ao abrir pagina 
listarClientes();