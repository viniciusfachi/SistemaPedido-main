const fs = require("fs");
const path = require("path");


let produtoClasses = [];

const filePath = path.resolve("db/", "produtoClasses.json");
const fileContaPath = path.resolve("db/", "contas.json");

// Função que salva a lista de produtoClasses na pasta db
const saveProdutoClassesToFile = () => {
    fs.writeFile(filePath, JSON.stringify(produtoClasses, null, 2), (err) => {
        if (err){
            console.error("Erro ao salvar produto Classes no arquivo:", err);
        } else {
            console.log("produto Classes Salvos com sucesso");
        }
    })
}
// Função que carrega os produtoClasses salvos na pasta
const loadProdutoClassesFromFile = () => {
    if (fs.existsSync(filePath)){
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err){
                console.error("Erro ao ler o arquivo de produtoClasses", err);
            } else if (data.trim() === ""){
                produtoClasses = [];
                console.log("Arquivo de produtoClasses está vazio");
            } else {
                try {
                    produtoClasses = JSON.parse(data);
                    console.log("produtoClasses carregados com sucesso")
                } catch (parseError) {
                    console.error("erro ao interpretar o JSON", parseError);
                }
            }
        })   
    }
}

const loadContasFromFile = () => {
    if (fs.existsSync(fileContaPath)){
        fs.readFile(fileContaPath, 'utf-8', (err, data) => {
            if (err){
                console.error("Erro ao ler o arquivo de Contas", err);
            } else if (data.trim() === ""){
                contas = [];
                console.log("Arquivo de Contas está vazio");
            } else {
                try {
                    contas = JSON.parse(data);
                    console.log("Contas carregados com sucesso")
                } catch (parseError) {
                    console.error("erro ao interpretar o JSON", parseError);
                }
            }
        })   
    }
}

const addProdutoClasse = (value) => {
    const produtoClasse = {
        id : value.id,
        descricao : value.descricao,
        acao : value.acao
    }

    produtoClasses.push(produtoClasse);
    saveProdutoClassesToFile();
    console.log("produtoClasse Cadastrado: ", produtoClasse);
    return produtoClasse;
}

const findProdutoClasseById = (id) => {
    return produtoClasses.find(conta => conta.id === id) || null;
}

const updateProdutoClasse = (value) => {
    const produtoClasse = findProdutoClasseById(value.id);
    if (produtoClasse){
        produtoClasse.descricao = value.descricao;
    
        saveProdutoClassesToFile();
        console.log("produto Classe atualizado: ", produtoClasse);
        
        return produtoClasse;
    } else {
        return null;
    }
}


const deleteProdutoClasse = (id) => {
    const index = produtoClasses.findIndex(produtoClasse => produtoClasse.id === id);

    if (index !== -1){
        produtoClasses.splice(index, 1); // remove o produto Classe da lista
        saveProdutoClassesToFile()
        console.log("produto Classe Deletado: ", id);
        return true;
    } else {
        return false;
    }
}

const listContas = () => {
    return listContas;
}

// Função que devolve a lista de produtoClasses
const listProdutoClasses = () => {
    return produtoClasses;
}

// Carrega os produtoClasses salvos no arquivo ao iniciar
loadProdutoClassesFromFile();
loadContasFromFile();

// Exportamos as funções para poder utilizar nos outros módulos
exports.findProdutoClasseById = findProdutoClasseById;
exports.addProdutoClasse = addProdutoClasse;
exports.updateProdutoClasse = updateProdutoClasse;
exports.deleteProdutoClasse = deleteProdutoClasse;
exports.listProdutoClasses = listProdutoClasses;
exports.produtoClasseService = produtoClasses;
exports.listContas = listContas;