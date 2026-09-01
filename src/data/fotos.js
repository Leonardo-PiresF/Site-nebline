// ---------------------------------------------------------------
// FOTOS
// ---------------------------------------------------------------
// Este arquivo existe para que a troca por fotos reais da Nebline seja
// feita em um lugar so.
//
// FOTOS_REAIS liga o id do produto (src/data/catalogo.js) ao arquivo em
// public/fotos/. Item listado aqui usa a foto da casa; o que ainda nao tem
// foto aparece sem foto, com a placa da inicial no lugar.
//
// COMO ADICIONAR UMA FOTO NOVA:
// 1. coloque o arquivo em public/fotos/ (nome sem acento e sem espaco, para
//    nao dar problema de url na hospedagem)
// 2. acrescente a linha aqui, com o id do produto
//
// O hero e a foto da secao "sobre" tambem sao da cliente e ficam no fim
// deste arquivo.

export const FOTOS_REAIS = {
  // Tortas
  'tor-banoffee': '/fotos/torta-banoffee.jpeg',
  'tor-chocolatuda': '/fotos/chocolatuda.jpeg',
  'tor-choco-chocolate': '/fotos/torta-choco-chocolate.jpeg',
  'tor-limao': '/fotos/torta-limao.jpeg',
  'tor-limao-siciliano': '/fotos/torta-limao-siciliano-2.jpeg',
  'tor-cheesecake': '/fotos/cheesecake.jpeg',
  'tor-mousse-belga': '/fotos/torta-mousse-belga.jpeg',
  'tor-coconut': '/fotos/coconut.jpeg',
  'tor-pistache-zero': '/fotos/torta-pistache-zero.jpeg',
  'tor-chocroc': '/fotos/torta-chocroc.jpeg',

  // Bolos
  'bol-caseiro': '/fotos/bolo-caseiro-limao.jpeg',
  'bol-peras': '/fotos/bolo-pera-amendoas-sem-lactose.jpeg',
  'bol-banana': '/fotos/bolo-zero-zero.jpeg',
  'bol-especial': '/fotos/bolo-laranja-amendoas.jpeg',
  'bol-muffin': '/fotos/muffins.jpeg',

  // Doces
  'doc-brownie': '/fotos/brownie.jpeg',
  'doc-brownie-belga': '/fotos/brownie-cremoso-belga.jpeg',
  // Os dois brownies com sorvete saem na mesma foto.
  'doc-brownie-sorvete': '/fotos/brownie-com-sorvete.jpeg',
  'doc-brownie-belga-sorvete': '/fotos/brownie-com-sorvete.jpeg',
  'doc-macaron': '/fotos/macaron-duo-chocolate.jpeg',
  'doc-panelinha': '/fotos/mousse-belga-zero-panelinha.jpeg',
  'doc-vasinho': '/fotos/vasinho.jpeg',
  'doc-salada-frutas': '/fotos/salada-de-frutas.jpeg',
  'doc-salada-frutas-sorvete': '/fotos/salada-de-frutas-com-sorvete.jpeg',

  // Salgados
  'sal-quiche': '/fotos/quiche-frango.jpeg',
  'sal-empanada': '/fotos/empanada.jpeg',
  'sal-croissant-ganache': '/fotos/croissant-chocolate.jpeg',
  'sal-croissant': '/fotos/croissant.jpeg',
  'sal-croissant-amendoas': '/fotos/croissant-amendoas.jpeg',
  'sal-croissant-morango-dl': '/fotos/croissant-morango-doce-de-leite.jpeg',
  'sal-croissant-morango-patissier': '/fotos/croissant-morango-patissier.jpeg',
  'sal-toast-leite': '/fotos/toast.jpeg',
  'sal-toast-lowcarb': '/fotos/toast-low-carb.jpeg',
  'sal-brusch-parma': '/fotos/bruschetta-parma-brie.jpeg',
  'sal-brusch-cogumelos': '/fotos/bruschetta-cogumelos.jpeg',
  'sal-brusch-caprese': '/fotos/bruschetta-caprese.jpeg',

  // Pratos
  'pra-salada-nebline': '/fotos/salada-nebline.jpeg',
  'pra-lanchinho': '/fotos/lanchinho-frango-cream-cheese.jpeg',
  'pra-massa-fiore': '/fotos/raviolone-camarao-catupiry.jpeg',
  'pra-massa-nebline': '/fotos/massa-nebline.jpeg',
  'pra-omelete': '/fotos/omelete-toast.jpeg',
  'pra-massa-carne-seca': '/fotos/massa-carne-seca-abobora.jpeg',
  'pra-massa-bufala': '/fotos/massa-mucarela-bufala.jpeg',
  'pra-cafe-manha': '/fotos/cafe-da-manha.jpeg',
  'pra-ovos': '/fotos/ovos-mexidos.jpeg',

  // Cafeteria
  // A mesma xicara de expresso serve o expresso, o duplo, o descafeinado e o drip.
  'caf-expresso': '/fotos/cafe-expresso.jpeg',
  'caf-expresso-duplo': '/fotos/cafe-expresso.jpeg',
  'caf-descafeinado': '/fotos/cafe-expresso.jpeg',
  'caf-drip': '/fotos/cafe-expresso.jpeg',
  // O macchiato e o macchiato duplo saem na mesma xicara.
  'caf-macchiato': '/fotos/macchiato.jpeg',
  'caf-macchiato-duplo': '/fotos/macchiato.jpeg',
  'caf-chantilly': '/fotos/expresso-com-chantilly.jpeg',
  'caf-expresso-tonica': '/fotos/expresso-tonico.jpeg',
  // A foto dos chas Moncloa serve o quente e o gelado.
  'caf-cha-moncloa': '/fotos/chas-moncloa.jpeg',
  'caf-cha-gelado': '/fotos/chas-moncloa.jpeg',
  'caf-irish': '/fotos/irish-coffee.jpeg',
  'caf-mocha': '/fotos/cafe-mocha.jpeg',
  'caf-chocolate-gelado': '/fotos/chocolate-gelado-belga.jpeg',
  'caf-chocolate-belga': '/fotos/chocolate-quente-belga.jpeg',
  // A mesma foto de xicara serve os tres capuccinos quentes.
  'caf-capuccino': '/fotos/capuccino.jpeg',
  'caf-capuccino-zero': '/fotos/capuccino.jpeg',
  'caf-capuccino-amendoas': '/fotos/capuccino.jpeg',
  'caf-capuccino-gelado': '/fotos/capuccino-gelado.jpeg',
  'caf-capuccino-vegano': '/fotos/capuccino-gelado-vegano.jpeg',

  // Para refrescar
  'beb-agua': '/fotos/agua.jpg',
  'beb-agua-gas': '/fotos/agua-com-gas.jpg',
  'beb-coca': '/fotos/coca-cola.jpg',
  'beb-guarana': '/fotos/guarana.jpg',
  'beb-tonica': '/fotos/tonica.jpg',
  'beb-mate': '/fotos/mates.jpeg',
  'beb-spritz': '/fotos/soda-spritz.jpeg',
  // A mesma foto de sucos serve todos, menos o detox, que e verde.
  'beb-suco-laranja': '/fotos/sucos.jpeg',
  'beb-suco-laranja-frutas': '/fotos/sucos.jpeg',
  'beb-suco-abacaxi': '/fotos/sucos.jpeg',
  'beb-suco-abacaxi-hortela': '/fotos/sucos.jpeg',

  // Bar
  'bar-stella': '/fotos/stella-artois.jpg',
  'bar-heineken': '/fotos/heineken.jpg',
  'bar-gin': '/fotos/gin-drink.webp',
  'bar-mimosa': '/fotos/mimosa.jpeg',
  'bar-aperol': '/fotos/aperol-spritz.webp',
  'bar-sangria': '/fotos/sangria.webp'
}

// Fotos da casa que estao em public/fotos/ mas nao entram em nenhum produto.
// Ficam anotadas aqui para nao se perderem:
//
// - hamburguer-vegano.jpeg ....... prato que nao consta no cardapio 2025
// - lanchinhos-toasts.jpeg ....... os dois recheios do Lanchinho, juntos
// - lanchinho-toast-integral.jpeg  Lanchinho de peito de peru no integral
// - macaron-chocolatudo.jpeg ..... outros sabores de macaron
// - macaron-pistache.jpeg
// - macaron-sortido.jpeg
// - cafe-da-manha-2.jpeg ......... segundo angulo
// - massa-carne-seca-abobora-2.jpeg
// - massa-carne-seca-com-abobora.jpeg  terceiro angulo
// - massa-fiore-2.jpeg ........... segundo angulo do raviolone
// - salada-nebline-2.jpeg
// - torta-choco-chocolate-2.jpeg
// - torta-limao-siciliano.jpeg
// - hero.png .................... hero antigo, trocado pela foto da fachada
//
// Ainda faltam fotos de: Verrine vegana, Toast integral, Toast vegano,
// Bruschetta de parmesao, Quiche com salada, Massa de frango com catupiry,
// Iogurte, Ovos mexidos com frios, parte da cafeteria (cafe com leite, leite
// de amendoas, cafes gelados, frape), o suco detox, os smoothies, os sorvetes
// e o pao de queijo.

// Um produto ja tem foto da casa?
export const temFotoReal = (produtoId) => Boolean(FOTOS_REAIS[produtoId])

// Fotos enviadas pela cliente
export const HERO = '/fotos/fachada-nebline.jpeg'
export const SOBRE = '/fotos/sobre.png'

// Sem banco de imagens provisorio: item sem foto da casa fica sem foto
// nenhuma. fotoDe devolve null e o componente Foto mostra a placa com a
// inicial do item, que e mais honesto do que uma foto de outra cozinha.
export const fotoDe = (produtoId) => FOTOS_REAIS[produtoId] || null

export const fotoHero = () => HERO
export const fotoSobre = () => SOBRE
