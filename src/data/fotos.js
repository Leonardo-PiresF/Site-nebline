// ---------------------------------------------------------------
// FOTOS
// ---------------------------------------------------------------
// Este arquivo existe para que a troca por fotos reais da Nebline seja
// feita em um lugar so.
//
// HOJE: as imagens de PRODUTO vem do Unsplash. Sao fotos de confeitaria de
// verdade, mas NAO sao os doces da Nebline. Servem para demonstracao e
// precisam sair antes de qualquer coisa ir ao ar.
//
// O hero e a foto da secao "sobre" ja sao reais, enviadas pela cliente, e
// ficam em public/fotos/.
//
// COMO TROCAR PELAS FOTOS REAIS DOS PRODUTOS:
// 1. coloque os arquivos em public/fotos/
// 2. preencha FOTOS_REAIS abaixo usando o id do produto, que esta em
//    src/data/catalogo.js
//
// Qualquer item listado aqui passa a usar a foto real automaticamente, e os
// que faltam continuam no banco de imagens. Da para ir trocando aos poucos.

export const FOTOS_REAIS = {
  // 'tor-chocolatuda': '/fotos/chocolatuda.jpg',
  // 'tor-banoffee': '/fotos/banoffee.jpg',
}

// Fotos enviadas pela cliente
export const HERO = '/fotos/hero.png'
export const SOBRE = '/fotos/sobre.png'

// ---------------------------------------------------------------
// Banco de imagens provisorio
// ---------------------------------------------------------------
// Unsplash, uso livre. Agrupadas por tipo de item, para nao cair foto de
// cafe da manha em uma torta.

const U = (id, l, a) =>
  `https://images.unsplash.com/photo-${id}?fm=jpg&q=70&w=${l}&h=${a}&fit=crop&auto=format`

const BANCO = {
  doce: [
    '1564844536308-75c540dbf14e', // fatia de bolo de chocolate
    '1516054575922-f0b8eeadec1a', // bolo de chocolate, flat lay
    '1533134242443-d4fd215305ad', // cheesecake de mirtilo
    '1524351199678-941a58a3df50', // fatia em prato escuro
    '1567171466295-4afa63d45416', // fatia com frutas vermelhas
    '1547414368-ac947d00b91d'     // fatia de caramelo
  ],
  cafe: [
    '1676300185983-d5f242babe34', // doce com cafe
    '1675125530909-15213f01a9e1'  // bandeja de cafe da manha
  ],
  padaria: [
    '1675125530909-15213f01a9e1', // croissants
    '1516054575922-f0b8eeadec1a'
  ]
}

// Cada categoria do cardapio puxa de um grupo do banco.
const GRUPO_POR_CATEGORIA = {
  tortas: 'doce',
  bolos: 'doce',
  doces: 'doce',
  salgados: 'padaria',
  pratos: 'padaria',
  cafes: 'cafe',
  bebidas: 'cafe',
  bar: 'cafe'
}

// Soma simples dos caracteres do id: a mesma foto cai sempre no mesmo item,
// sem precisar guardar nada.
function indice(chave, tamanho) {
  let n = 0
  for (let i = 0; i < chave.length; i++) n = (n + chave.charCodeAt(i) * (i + 1)) % 9973
  return n % tamanho
}

export function fotoDe(produtoId, categoria = 'tortas', largura = 400, altura = 400) {
  if (FOTOS_REAIS[produtoId]) return FOTOS_REAIS[produtoId]
  const grupo = BANCO[GRUPO_POR_CATEGORIA[categoria] || 'doce']
  return U(grupo[indice(produtoId, grupo.length)], largura, altura)
}

export const fotoHero = () => HERO
export const fotoSobre = () => SOBRE
