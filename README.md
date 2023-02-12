Neste projeto foi desenvolvido uma loja de computadores com produtos do Mercado Livre. A aplicação renderiza os produtos disponíveis em cards e um carrinho de compras dinâmico que atualiza os produtos adicionados e o valor total.

Para obter os produtos, a aplicação consome os dados da API do Mercado Livre ([manual](https://developers.mercadolivre.com.br/pt_br/itens-e-buscas)) nos endpoints:

1- https://api.mercadolibre.com/sites/MLB/search?q=computador, para buscar todos os produtos 'computador'.

2- https://api.mercadolibre.com/items/$ItemID, para buscar um determinado produto, onde $ItemID é o id do produto.

A aplicação foi implementada em html, css e javascript e seu desenvolvimento seguiu a prática de TDD (Test Driven Development). Para ver a aplicação é só abrir o arquivo index.html no browser.

## TDD ##
 Os testes foram implementados para uma cobertura de 100% da aplicação utilizando o módulo de test ***jest***. Para rodar a cobertura de teste, você deve dar o comando **npm install** e depois **npm run test:coverage** ou **npm test**, se quiser rodar apenas os testes.


