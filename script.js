const listaProdutos = document.querySelector('#lista-produtos');

//função para atualizar a quantidade de produtos, exibida na imagem do carrinho
function notificacaoProdutos(carrinho) {
    const notificacao = document.querySelector('#notificacao');

    if (carrinho && carrinho.length !== 0) {
        notificacao.style.display = 'flex';
        
        let qnt = 0;
        for (let i = 0; i < carrinho.length; i++) {
            qnt += carrinho[i].quantidade;
        }
        notificacao.innerHTML = `${qnt}`;
        return;
    }
    notificacao.style.display = 'none';
}

// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade, img) {
    // Obter os produtos do localStorage ou criar um novo array vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let produtoExiste = carrinho.find(produto => produto.id === id);
    
    if (produtoExiste) {
        produtoExiste.quantidade ++;
        produtoExiste.valor = produtoExiste.quantidade * valor;
    } else {
        // Adicionar o novo produto ao array
        carrinho.push({ id, nome, valor, quantidade, img});
    }

    //atualizar quantidade de produtos visualmente no carrinho
    notificacaoProdutos(carrinho);

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();
};

// Função para remover um produto do carrinho
function removerProduto(id) {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Filtrar os produtos, removendo o produto com o id especificado
    carrinho = carrinho.filter(produto => produto.id !== id);
    notificacaoProdutos(carrinho);

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();
}

function fecharCarrinho() {
    listaProdutos.style.display = 'none';
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    //se tiver produtos, irá exibi-los na tela
    if (carrinho && carrinho.length > 0) {

        listaProdutos.innerHTML = '';

        //criação do X para fechar o carrinho
        const fechar = document.createElement('span');
        fechar.innerHTML = '<i class="bi bi-x-lg">';
        fechar.setAttribute('id', 'fechar');
        listaProdutos.appendChild(fechar);

        //para cada produto dentro do array, executará essa função
        carrinho.forEach(produto => {
            //criação do li
            const li = document.createElement('li');
            
            //criação da imagem do produto
            const produtoImg = document.createElement('img');
            produtoImg.setAttribute('src', produto.img);
            li.appendChild(produtoImg);

            //criação de uma div que terá dois parafragos dentro
            const detalhes = document.createElement('div');
            
            const nome = document.createElement('p');
            nome.textContent = produto.nome;
            detalhes.appendChild(nome);
            
            const valor = document.createElement('p');
            valor.innerHTML = `R$ ${produto.valor.toFixed(2)}<br> x ${produto.quantidade}`;
            detalhes.appendChild(valor);

            li.appendChild(detalhes);
            
            //criação da imagem da lixeira para excluir os produtos
            const imgLixeira = document.createElement('img');
            imgLixeira.src = 'img/lixeira.svg';
            imgLixeira.alt = 'ícone de uma lixeira';
            imgLixeira.setAttribute('id', produto.id);
            li.appendChild(imgLixeira);

            listaProdutos.appendChild(li);
        
            //disparo da função que remove os produtos
            imgLixeira.addEventListener('click', () => removerProduto(produto.id));
        });

    } else { 
        listaProdutos.innerHTML = '';

        //criação do X para fechar o carrinho
        const fechar = document.createElement('p');
        fechar.innerHTML = '<i class="bi bi-x-lg">';
        fechar.setAttribute('id', 'fechar');
        
        listaProdutos.appendChild(fechar);
        listaProdutos.innerHTML += 'O carrinho está vazio!';
    }
    //disparo da função que fecha a tela do carrinho
    fechar.addEventListener('click', () => fecharCarrinho());
}

//mesmo recarregando a página, o localstorage será analisado
//se houver algum produto no carrinho, a função para mostrar a notificação no carrinho será disparada
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
if (carrinho && carrinho.length !== 0) {
    notificacaoProdutos(carrinho);
}

// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
exibirCarrinho();

//disparo da função que abre o carrinho na tela, quando a img é clicada
const btnCarrinho = document.querySelector('#btnCarrinho');
btnCarrinho.addEventListener('click', () => {
    listaProdutos.style.display = 'flex';
})