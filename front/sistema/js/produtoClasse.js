let editandoProdutoClasse = null;

// Refatorar função para enviar os dados para o back-end
document.getElementById("btn-salvar-produtoClasse").addEventListener("click", async function(){
    const descricao = document.getElementById("descricaoProdutoClasse").value;
    const id = document.getElementById("categoriaconta").value;
    const acao = document.getElementById("tipoLancamento").value;
    


    if (descricao === ""){
        alert("Preencha a Descrição da Classificação");
        return;
    } else {
        if (editandoProdutoClasse !== null){
            const response = await fetch("http://localhost:8000/produtoClasse", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({id,descricao, acao}),
            });
            
            if (response.status == 200){
                editandoProdutoClasse.children[0].textContent = id;
                editandoProdutoClasse.children[1].textContent = descricao;
                editandoProdutoClasse.children[2].textContent = acao;
            } else {
                const errorMessage = await response.text();
                alert("Erro: "+errorMessage);
            }            
        } else {
            const response = await fetch("http://localhost:8000/produtoClasse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({id,descricao,acao}),
            });
            
            if (response.status == 200){
                adicionarLinhaTabelaProdutoClasse(id,descricao,acao);
            } else {
                const errorMessage = await response.text();
                alert("Erro: "+errorMessage);
            }
        }
        
        limparFormularioProdutoClasse();
    }
})

function adicionarLinhaTabelaProdutoClasse(id,descricao,acao){
    const corpoTabela = document.getElementById("tabela-produtoClasse");
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td class="dataContaTabela">${id}</td>
        <td>${descricao}</td>
        <td>${acao}</td>
        <td>
            <button class="btn-acao btn-editar">Editar</button>
            <button class="btn-acao btn-excluir">Excluir</button>
        </td>
    `
    novaLinha.querySelector(".btn-editar").
        addEventListener("click", function(){
        editarRegistroProdutoClasse(novaLinha);
    });
    
    novaLinha.querySelector(".btn-excluir").
        addEventListener("click", function(){
        excluirRegistroProdutoClasse(novaLinha);
    });
    
    corpoTabela.appendChild(novaLinha);
}

function limparFormularioProdutoClasse(){
    document.getElementById("descricaoProdutoClasse").value = "";
    document.getElementById("descricaoAnteriorProdutoClasse").value = "";
}

// Refatorando - Exclui no back-end
async function excluirRegistroProdutoClasse(linha){
    if (confirm("Tem certeza que deseja excluir esta linha?")){
        const response = await fetch("http://localhost:8000/produtoClasse", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({descricao: linha.children[0].textContent}),
        });
        if (response.status === 200){
            linha.remove();
        } else {
            const errorMessage = await response.text();
            alert("Erro: "+errorMessage);
        }
    }    
}

function editarRegistroProdutoClasse(linha){
    document.getElementById("categoriaconta").value = linha.children[0].textContent;
    document.getElementById("descricaoProdutoClasse").value = linha.children[1].textContent;
    document.getElementById("tipoLancamento").value = linha.children[2].textContent;
    
    editandoProdutoClasse = linha;
}


// Refatoração - Acessar o Back End
async function getProdutoClasses(){
    const response = await fetch("http://localhost:8000/produtoClasse", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },        
    });

    if (response.status == 200){
        const corpoTabela = document.getElementById("tabela-produtoClasse");
        corpoTabela.innerHTML = "";
        
        const data = await response.json();
        for (conta of data){
            adicionarLinhaTabelaProdutoClasse(conta.id,conta.descricao,conta.acao);    
        }

    } else {
        errorMessage = response.text();
        console.log("Erro: ", errorMessage);
    }

    const responseConta = await fetch("http://localhost:8000/contas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },        
    });

    if (responseConta.status == 200){
        const selectContas = document.getElementById("categoriaconta");
        selectContas.innerHTML = "";
        const contaOption = document.createElement('option');
        contaOption.value = "item";
        contaOption.textContent = "Conta";
        contaOption.selected;
        selectContas.appendChild(contaOption);

        const tdProdutoClasse = document.getElementsByClassName("dataContaTabela");

        console.log("TD= ",tdProdutoClasse);
        
        const data = await responseConta.json();
        console.log("Contas",data);
        
        data.forEach(conta => {
            const option = document.createElement('option');
            option.value = conta.id;
            option.textContent = conta.nome + " - " + conta.contaInst;
            option.classList.add("selectedContas");
            selectContas.appendChild(option);
            option.value.selected = "item";

            // for (td of tdProdutoClasse) {
            //     td[0].innerHTML = conta.id;
            //     td[1].innerHTML = conta.descricao;
            //     td[2].innerHTML = conta.acao;
            // }
        });

    } else {
        errorMessage = await responseConta.text();
        console.log("Erro: ", errorMessage);
    }
}
