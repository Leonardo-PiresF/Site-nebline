// Catalogo de pronta entrega, transcrito do cardapio Nebline 2025.
// Precos em reais. Para editar um preco, mexa so aqui.
// tags aceitas: 'vegano', 'sem lactose', 'sem gluten', 'zero acucar'

export const CATEGORIAS = [
  { id: 'tortas', nome: 'Tortas', linha: 'Fatias da vitrine' },
  { id: 'bolos', nome: 'Bolos', linha: 'Caseiros e especiais' },
  { id: 'doces', nome: 'Doces', linha: 'Brownies, verrines e macarons' },
  { id: 'salgados', nome: 'Não sou só doce', linha: 'Quiches, croissants e toasts' },
  { id: 'pratos', nome: 'Pratos', linha: 'Saladas, massas e café da manhã' },
  { id: 'cafes', nome: 'Cafeteria', linha: 'Quentes e gelados' },
  { id: 'bebidas', nome: 'Para refrescar', linha: 'Sucos, spritz e mates' },
  { id: 'bar', nome: 'Bar', linha: 'Drinks e cervejas' }
]

export const PRODUTOS = [
  // TORTAS
  { id: 'tor-banoffee', cat: 'tortas', nome: 'Torta Banoffee', peso: '180g', preco: 25, desc: 'A queridinha da Nebline.' },
  { id: 'tor-chocolatuda', cat: 'tortas', nome: 'Torta Chocolatuda', peso: '150g', preco: 28, desc: 'A torta vencedora do Que Seja Doce, no GNT.', destaque: true },
  { id: 'tor-choco-chocolate', cat: 'tortas', nome: 'Torta Choco Chocolate', peso: '180g', preco: 26, desc: 'Para os amantes de chocolate e doce de leite caseiro.' },
  { id: 'tor-limao', cat: 'tortas', nome: 'Torta de Limão', peso: '180g', preco: 24, desc: 'Massa crocante com mousse de limão fresco e cremoso.' },
  { id: 'tor-limao-siciliano', cat: 'tortas', nome: 'Torta Limão Siciliano', peso: '140g', preco: 26, desc: 'Base de brownie, ganache de chocolate belga e mousse de limão siciliano.' },
  { id: 'tor-cheesecake', cat: 'tortas', nome: 'Cheesecake', peso: '170g', preco: 25, desc: 'Na deliciosa versão de frutas vermelhas.' },
  { id: 'tor-mousse-belga', cat: 'tortas', nome: 'Mousse Belga', peso: '95g', preco: 25, desc: 'Sobremesa com mousse belga.' },
  { id: 'tor-coconut', cat: 'tortas', nome: 'Torta Coconut', peso: '160g', preco: 26, desc: 'Massa de creme de chocolate com creme de coco e ganache belga meio amargo.' },
  { id: 'tor-chocroc', cat: 'tortas', nome: 'Torta Chocroc', peso: '200g', preco: 29, desc: 'Ganache de avelã, pralinê de castanha do Pará e crispearls Callebaut.' },
  { id: 'tor-pistache-zero', cat: 'tortas', nome: 'Torta Mousse Zero Açúcar de Pistache', peso: '90g', preco: 29, tags: ['zero acucar'] },

  // BOLOS
  { id: 'bol-caseiro', cat: 'bolos', nome: 'Bolo caseiro do dia', peso: '150g', preco: 14, desc: 'Massa fofinha, consulte o sabor do dia.' },
  { id: 'bol-peras', cat: 'bolos', nome: 'Bolo de peras zero lactose', peso: '190g', preco: 21, desc: 'Massa de cumaru com peras assadas.', tags: ['sem lactose'] },
  { id: 'bol-banana', cat: 'bolos', nome: 'Bolo zero de banana com aveia', peso: '170g', preco: 22, desc: 'Frutas secas e castanhas.', tags: ['vegano', 'zero acucar', 'sem gluten', 'sem lactose'] },
  { id: 'bol-especial', cat: 'bolos', nome: 'Bolo especial do dia', peso: '200g', preco: 24, desc: 'Consulte a experiência do dia.' },
  { id: 'bol-muffin', cat: 'bolos', nome: 'Muffin', peso: '120g', preco: 14, desc: 'Massa fofinha com explosão de gotas de chocolate.' },

  // DOCES
  { id: 'doc-brownie', cat: 'doces', nome: 'Brownie', peso: '65g', preco: 13 },
  { id: 'doc-brownie-sorvete', cat: 'doces', nome: 'Brownie com sorvete de creme', peso: '215g', preco: 28, desc: 'Doce de leite, Nutella ou belga.' },
  { id: 'doc-brownie-belga', cat: 'doces', nome: 'Brownie cremoso belga', peso: '130g', preco: 24 },
  { id: 'doc-brownie-belga-sorvete', cat: 'doces', nome: 'Brownie cremoso belga com sorvete', peso: '290g', preco: 29, desc: 'Brownie quentinho com ganache Nebline e sorvete de creme.' },
  { id: 'doc-macaron', cat: 'doces', nome: 'Macaron', peso: '15g', preco: 8, desc: 'Consulte os sabores do dia.' },
  { id: 'doc-panelinha', cat: 'doces', nome: 'Mousse belga zero açúcar na panelinha', peso: '130g', preco: 29, tags: ['zero acucar'] },
  { id: 'doc-vasinho', cat: 'doces', nome: 'Vasinho', peso: '200g', preco: 32, desc: 'Vencedor da prova técnica do Que Seja Doce. Pavê belga com flores comestíveis.', destaque: true },
  { id: 'doc-verrine', cat: 'doces', nome: 'Verrine Nebline', peso: '120g', preco: 28, desc: 'Consulte a experiência do dia.' },
  { id: 'doc-verrine-vegana', cat: 'doces', nome: 'Verrine vegana', peso: '120g', preco: 28, desc: 'Ganache belga meio amargo, redução de frutas vermelhas e crocante de pistache.', tags: ['vegano', 'sem lactose'] },

  // SALGADOS
  { id: 'sal-quiche', cat: 'salgados', nome: 'Quiche (fatia)', peso: '200g', preco: 29, desc: 'Frango, alho-poró ou lorraine.', opcoes: { rotulo: 'Sabor', valores: ['Frango', 'Alho-poró', 'Lorraine'] } },
  { id: 'sal-empanada', cat: 'salgados', nome: 'Empanada', peso: '160g a 180g', preco: 19, opcoes: { rotulo: 'Recheio', valores: ['Carne', 'Frango', 'Cogumelo', 'Palmito com ora-pro-nóbis (vegana)'] } },
  { id: 'sal-croissant', cat: 'salgados', nome: 'Croissant tradicional', peso: '70g', preco: 13, desc: 'Acompanha manteiga ou geleia de frutas vermelhas.' },
  { id: 'sal-croissant-amendoas', cat: 'salgados', nome: 'Croissant de amêndoas', peso: '160g', preco: 23 },
  { id: 'sal-croissant-ganache', cat: 'salgados', nome: 'Croissant de ganache belga', peso: '160g', preco: 23 },
  { id: 'sal-toast-leite', cat: 'salgados', nome: 'Toast ao leite', peso: '130g', preco: 16, desc: 'Duas fatias de pão de fermentação natural, com geleia ou manteiga.' },
  { id: 'sal-toast-integral', cat: 'salgados', nome: 'Toast integral', peso: '130g', preco: 16 },
  { id: 'sal-toast-lowcarb', cat: 'salgados', nome: 'Toast low carb', peso: '150g', preco: 18 },
  { id: 'sal-toast-vegano', cat: 'salgados', nome: 'Toast vegano', peso: '120g', preco: 18, tags: ['vegano', 'sem lactose'] },
  { id: 'sal-brusch-parmesao', cat: 'salgados', nome: 'Bruschetta de parmesão', peso: '300g', preco: 43, desc: 'Duas fatias generosas.' },
  { id: 'sal-brusch-caprese', cat: 'salgados', nome: 'Bruschetta caprese com pesto de rúcula', peso: '360g', preco: 49 },
  { id: 'sal-brusch-parma', cat: 'salgados', nome: 'Bruschetta parma e brie com mel', peso: '280g', preco: 57 },
  { id: 'sal-brusch-cogumelos', cat: 'salgados', nome: 'Bruschetta mix de cogumelos e cebolas caramelizadas', peso: '320g', preco: 54 },

  // PRATOS
  { id: 'pra-salada-nebline', cat: 'pratos', nome: 'Salada Nebline', peso: '300g', preco: 38, desc: 'Mix de folhas, frango desfiado, tomate cereja, lascas de parmesão e croutons.' },
  { id: 'pra-quiche-salada', cat: 'pratos', nome: 'Quiche com salada', peso: '300g', preco: 42, opcoes: { rotulo: 'Sabor da quiche', valores: ['Frango', 'Alho-poró', 'Lorraine'] } },
  { id: 'pra-lanchinho', cat: 'pratos', nome: 'Lanchinho', peso: '150g', preco: 38, desc: 'Croissant, pão de leite ou pão integral de fermentação natural.', opcoes: { rotulo: 'Recheio', valores: ['Frango com cream cheese e cenoura', 'Queijo branco, mix de folhas e peito de peru'] } },
  { id: 'pra-massa-carne-seca', cat: 'pratos', nome: 'Massa de carne seca com abóbora', peso: '250g', preco: 55 },
  { id: 'pra-massa-bufala', cat: 'pratos', nome: 'Massa de muçarela de búfala', peso: '250g', preco: 51 },
  { id: 'pra-massa-fiore', cat: 'pratos', nome: 'Massa Fiore', peso: '250g', preco: 55, desc: 'Raviolone de camarão com creme de catupiry, salsinha e camarão.' },
  { id: 'pra-massa-nebline', cat: 'pratos', nome: 'Massa Nebline', peso: '250g', preco: 51, desc: 'Funghi em emulsão de manteiga, lâminas de amêndoas e sálvia.' },
  { id: 'pra-massa-limao', cat: 'pratos', nome: 'Massa de muçarela com limão siciliano', peso: '250g', preco: 51 },
  { id: 'pra-massa-frango', cat: 'pratos', nome: 'Massa de frango com catupiry', peso: '250g', preco: 51 },
  { id: 'pra-cafe-manha', cat: 'pratos', nome: 'Café da manhã Nebline', peso: 'individual', preco: 76, desc: 'Toast de fermentação natural, geleia, manteiga, ovos mexidos, iogurte com granola, café e suco de laranja.' },
  { id: 'pra-iogurte', cat: 'pratos', nome: 'Iogurte natural com redução de frutas vermelhas', peso: '120g', preco: 16 },
  { id: 'pra-ovos-frios', cat: 'pratos', nome: 'Ovos mexidos com frios', peso: '260g', preco: 27, desc: 'Quatro ovos com peito de peru e queijo branco.' },
  { id: 'pra-ovos', cat: 'pratos', nome: 'Ovos mexidos', peso: '200g', preco: 20 },
  { id: 'pra-omelete', cat: 'pratos', nome: 'Omelete', peso: '250g', preco: 37, desc: 'Queijo branco e peito de peru, com mix de folhas ou toast.' },

  // CAFETERIA
  { id: 'caf-expresso', cat: 'cafes', nome: 'Expresso', peso: '45ml', preco: 7.9 },
  { id: 'caf-expresso-duplo', cat: 'cafes', nome: 'Expresso duplo', peso: '90ml', preco: 13 },
  { id: 'caf-com-leite', cat: 'cafes', nome: 'Café com leite tradicional', peso: '150ml', preco: 15 },
  { id: 'caf-drip', cat: 'cafes', nome: 'Café coado drip', peso: '000ml', preco: 13 },
  { id: 'caf-amendoas', cat: 'cafes', nome: 'Café com leite de amêndoas', peso: '150ml', preco: 19, tags: ['sem lactose'] },
  { id: 'caf-descafeinado', cat: 'cafes', nome: 'Café descafeinado', peso: '45ml', preco: 7.9 },
  { id: 'caf-macchiato', cat: 'cafes', nome: 'Macchiato', peso: '45ml', preco: 9 },
  { id: 'caf-macchiato-duplo', cat: 'cafes', nome: 'Macchiato duplo', peso: '150ml', preco: 13 },
  { id: 'caf-chantilly', cat: 'cafes', nome: 'Expresso com chantilly', peso: '160ml', preco: 18 },
  { id: 'caf-chocolate-belga', cat: 'cafes', nome: 'Chocolate quente belga', peso: '150ml', preco: 21 },
  { id: 'caf-capuccino', cat: 'cafes', nome: 'Capuccino', peso: '150ml', preco: 18 },
  { id: 'caf-capuccino-zero', cat: 'cafes', nome: 'Capuccino zero açúcar', peso: '150ml', preco: 21, tags: ['zero acucar'] },
  { id: 'caf-capuccino-amendoas', cat: 'cafes', nome: 'Capuccino com leite de amêndoas', peso: '150ml', preco: 20, tags: ['sem lactose'] },
  { id: 'caf-cha-moncloa', cat: 'cafes', nome: 'Chá quente Moncloa', peso: '300ml', preco: 20 },
  { id: 'caf-mocha', cat: 'cafes', nome: 'Café mocha', peso: '200ml', preco: 21 },
  { id: 'caf-irish', cat: 'cafes', nome: 'Irish coffee', peso: '200ml', preco: 19 },
  { id: 'caf-capuccino-gelado', cat: 'cafes', nome: 'Capuccino gelado', peso: '300ml', preco: 21 },
  { id: 'caf-cha-gelado', cat: 'cafes', nome: 'Chá gelado Moncloa', peso: '300ml', preco: 19 },
  { id: 'caf-chocolate-gelado', cat: 'cafes', nome: 'Chocolate gelado belga', peso: '300ml', preco: 23 },
  { id: 'caf-cafe-gelado', cat: 'cafes', nome: 'Café gelado', peso: '300ml', preco: 20 },
  { id: 'caf-gelado-amendoas', cat: 'cafes', nome: 'Café gelado com leite de amêndoas', peso: '300ml', preco: 24, tags: ['sem lactose'] },
  { id: 'caf-expresso-tonica', cat: 'cafes', nome: 'Expresso tônica', peso: '450ml', preco: 18 },
  { id: 'caf-frape', cat: 'cafes', nome: 'Frapê', peso: '300ml', preco: 27, desc: 'Café gelado batido com sorvete de creme.' },
  { id: 'caf-capuccino-vegano', cat: 'cafes', nome: 'Capuccino gelado vegano', peso: '300ml', preco: 28, tags: ['vegano', 'sem lactose'] },

  // PARA REFRESCAR
  { id: 'beb-agua', cat: 'bebidas', nome: 'Água', peso: '310ml', preco: 7 },
  { id: 'beb-agua-gas', cat: 'bebidas', nome: 'Água com gás', peso: '310ml', preco: 7 },
  { id: 'beb-coca', cat: 'bebidas', nome: 'Coca-Cola', peso: '250ml', preco: 7 },
  { id: 'beb-guarana', cat: 'bebidas', nome: 'Guaraná', peso: '350ml', preco: 7 },
  { id: 'beb-tonica', cat: 'bebidas', nome: 'Tônica', peso: '350ml', preco: 11 },
  { id: 'beb-suco-laranja', cat: 'bebidas', nome: 'Suco de laranja', peso: '300ml', preco: 13 },
  { id: 'beb-suco-laranja-frutas', cat: 'bebidas', nome: 'Suco de laranja com frutas vermelhas', peso: '300ml', preco: 18 },
  { id: 'beb-suco-abacaxi', cat: 'bebidas', nome: 'Suco de abacaxi', peso: '300ml', preco: 17 },
  { id: 'beb-suco-abacaxi-hortela', cat: 'bebidas', nome: 'Suco de abacaxi com hortelã', peso: '300ml', preco: 17 },
  { id: 'beb-suco-detox', cat: 'bebidas', nome: 'Suco detox', peso: '300ml', preco: 18 },
  { id: 'beb-mate', cat: 'bebidas', nome: 'Mate', peso: '370ml', preco: 17, opcoes: { rotulo: 'Sabor', valores: ['Frutas vermelhas', 'Maracujá', 'Limão'] } },
  { id: 'beb-smoothie', cat: 'bebidas', nome: 'Smoothie de frutas vermelhas', peso: '320ml', preco: 27, desc: 'Batido com sorvete artesanal de creme.' },
  { id: 'beb-smoothie-vegano', cat: 'bebidas', nome: 'Smoothie vegano de frutas vermelhas', peso: '320ml', preco: 29, tags: ['vegano', 'sem lactose'] },
  { id: 'beb-spritz', cat: 'bebidas', nome: 'Spritz', peso: '400ml', preco: 17, desc: 'Água gasosa com essência italiana.', opcoes: { rotulo: 'Sabor', valores: ['Maçã verde', 'Tangerina', 'Cranberry', 'Limão siciliano'] } },

  // BAR
  { id: 'bar-stella', cat: 'bar', nome: 'Stella Artois long neck', peso: '330ml', preco: 13 },
  { id: 'bar-heineken', cat: 'bar', nome: 'Heineken long neck', peso: '330ml', preco: 13 },
  { id: 'bar-gin', cat: 'bar', nome: 'Gin drink', peso: '450ml', preco: 38, opcoes: { rotulo: 'Drink', valores: ['Pôr do sol', 'Sol da manhã', 'Sol do oriente'] } },
  { id: 'bar-mimosa', cat: 'bar', nome: 'Mimosa', peso: '150ml', preco: 19 },
  { id: 'bar-aperol', cat: 'bar', nome: 'Aperol Spritz', peso: '450ml', preco: 32 },
  { id: 'bar-sangria', cat: 'bar', nome: 'Sangria', peso: '450ml', preco: 27 }
]

// ENCOMENDAS
// Os precos abaixo sao PROVISORIOS, o cardapio manda consultar a equipe.
// Confirme com a Nebline antes de publicar.
export const ENCOMENDAS = [
  {
    id: 'enc-bolo-festivo',
    tipo: 'bolo_festivo',
    nome: 'Bolo festivo confeitado',
    desc: 'Bolo decorado sob encomenda, com massa, recheio e acabamento à sua escolha.',
    tamanhos: [
      { id: 'p', nome: 'Aro 15, cerca de 15 fatias', preco: 180 },
      { id: 'm', nome: 'Aro 20, cerca de 25 fatias', preco: 260 },
      { id: 'g', nome: 'Aro 25, cerca de 40 fatias', preco: 380 }
    ],
    massas: ['Baunilha', 'Chocolate', 'Cacau negro', 'Red velvet'],
    recheios: ['Ganache belga meio amargo', 'Doce de leite caseiro', 'Frutas vermelhas', 'Limão siciliano', 'Pistache'],
    permiteTexto: true
  },
  {
    id: 'enc-torta-inteira',
    tipo: 'torta_inteira',
    nome: 'Torta inteira',
    desc: 'As tortas da vitrine, inteiras, feitas para a sua data.',
    tamanhos: [
      { id: 'chocolatuda', nome: 'Chocolatuda inteira', preco: 210 },
      { id: 'banoffee', nome: 'Banoffee inteira', preco: 190 },
      { id: 'limao', nome: 'Limão siciliano inteira', preco: 195 },
      { id: 'cheesecake', nome: 'Cheesecake inteira', preco: 190 },
      { id: 'chocroc', nome: 'Chocroc inteira', preco: 220 }
    ],
    permiteTexto: false
  },
  {
    id: 'enc-kit',
    tipo: 'kit',
    nome: 'Kit para presente',
    desc: 'Caixa montada com doces da casa, com cartão escrito à mão.',
    tamanhos: [
      { id: 'doces', nome: 'Caixa de doces, 9 unidades', preco: 120 },
      { id: 'cafe', nome: 'Kit café da manhã para dois', preco: 190 }
    ],
    permiteTexto: true
  }
]
