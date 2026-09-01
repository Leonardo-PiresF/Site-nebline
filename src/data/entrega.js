// A loja do site atende SO retirada no balcao: o cliente monta o pedido aqui,
// fecha no WhatsApp e busca na Nebline. Nao ha entrega, nao ha taxa e nao ha
// pedido minimo.
//
// Se um dia a entrega voltar, este e o arquivo que ganha a tabela de bairros
// de novo, e o modo de entrega volta em Comanda.jsx e Encomendas.jsx.

export const RETIRADA = {
  id: 'retirada',
  nome: 'Retirar na loja',
  taxa: 0,
  prazo: 'Pronto em cerca de 20 min'
}
