// Tudo que muda de cliente para cliente fica aqui.
// Confirme estes dados com a Nebline antes de publicar.

export const LOJA = {
  nome: 'Nebline Confeitaria',
  assinatura: 'Handmade sweets and more',
  endereco: 'Rua Conceição, 942, Cambuí, Campinas/SP',
  // Numero que RECEBE os pedidos, formato internacional, so digitos.
  whatsappLoja: '5575988472549',
  // Chave Pix exibida no checkout e na mensagem do pedido.
  pix: {
    chave: '35.912.174/0001-05',
    tipo: 'CNPJ',
    favorecido: 'Nebline Comercio de Alimentos LTDA'
  },
  horarios: [
    ['Domingo', '08h às 18h'],
    ['Segunda', '11h às 18h'],
    ['Terça a sábado', '08h às 19h']
  ]
}

export const REGRAS_ENCOMENDA = {
  // Antecedencia minima em horas, por tipo de encomenda.
  antecedenciaHoras: {
    bolo_festivo: 72,
    torta_inteira: 48,
    kit: 24
  },
  percentualSinal: 50
}
