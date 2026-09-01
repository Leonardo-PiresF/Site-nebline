import { LOJA, REGRAS_ENCOMENDA } from './config.js'

export const brl = (v) =>
  (Number(v) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const dataHora = (iso) =>
  new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

export const dataCurta = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

// Codigo curto e legivel no balcao: NB-DDMM-XXX
export function gerarCodigo(prefixo = 'NB') {
  const d = new Date()
  const dia = String(d.getDate()).padStart(2, '0')
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let sufixo = ''
  for (let i = 0; i < 3; i++) sufixo += letras[Math.floor(Math.random() * letras.length)]
  return `${prefixo}-${dia}${mes}-${sufixo}`
}

const LARGURA = 34
const regua = (c = '-') => c.repeat(LARGURA)

// Linha com preenchimento de pontos, alinhada a direita.
function linhaValor(rotulo, valor) {
  const dir = String(valor)
  const esq = String(rotulo)
  const espaco = Math.max(1, LARGURA - esq.length - dir.length - 1)
  return `${esq} ${'.'.repeat(espaco)} ${dir}`.slice(0, LARGURA + 2)
}

export function somenteDigitos(str) {
  return String(str || '').replace(/\D/g, '')
}

export function telefoneInternacional(str) {
  const d = somenteDigitos(str)
  if (!d) return ''
  return d.startsWith('55') ? d : `55${d}`
}

export function linkWhatsApp(numero, mensagem) {
  return `https://wa.me/${telefoneInternacional(numero)}?text=${encodeURIComponent(mensagem)}`
}

// ---------------------------------------------------------------
// Mensagem do pedido, em formato de nota
// ---------------------------------------------------------------
export function mensagemPedido(pedido) {
  const L = []
  L.push(`*${LOJA.nome.toUpperCase()}*`)
  L.push(pedido.tipo === 'encomenda' ? '_Encomenda pelo site_' : '_Pedido pelo site_')
  L.push('')
  L.push(`*Pedido ${pedido.codigo}*`)
  L.push(`Aberto em ${dataHora(pedido.criado_em)}`)
  L.push('')
  L.push('*CLIENTE*')
  L.push(`${pedido.cliente.nome}`)
  L.push(`${pedido.cliente.telefone}`)

  L.push('')
  L.push('*RETIRADA NA LOJA*')
  L.push(LOJA.endereco)

  if (pedido.tipo === 'encomenda' && pedido.encomenda) {
    const e = pedido.encomenda
    L.push('')
    L.push('*DETALHES DA ENCOMENDA*')
    L.push(`Data desejada: ${dataCurta(e.dataDesejada)} às ${e.hora}`)
    if (e.massa) L.push(`Massa: ${e.massa}`)
    if (e.recheio) L.push(`Recheio: ${e.recheio}`)
    if (e.texto) L.push(`Escrita: "${e.texto}"`)
    if (e.tema) L.push(`Tema ou referência: ${e.tema}`)
    if (e.restricoes) L.push(`Restrições: ${e.restricoes}`)
  }

  L.push('')
  L.push('*ITENS*')
  L.push('```')
  L.push(regua('='))
  pedido.itens.forEach((it) => {
    const nome = it.opcao ? `${it.nome} (${it.opcao})` : it.nome
    L.push(`${it.qtd}x ${nome}`)
    L.push(linhaValor(`   ${brl(it.preco)} un`, brl(it.preco * it.qtd)))
  })
  L.push(regua('='))
  L.push(linhaValor('Subtotal', brl(pedido.totais.subtotal)))
  L.push(linhaValor('Retirada na loja', brl(0)))
  if (pedido.totais.sinal) {
    L.push(linhaValor('TOTAL', brl(pedido.totais.total)))
    L.push(linhaValor(`Sinal ${REGRAS_ENCOMENDA.percentualSinal}% agora`, brl(pedido.totais.sinal)))
    L.push(linhaValor('Restante na retirada', brl(pedido.totais.total - pedido.totais.sinal)))
  } else {
    L.push(linhaValor('TOTAL', brl(pedido.totais.total)))
  }
  L.push(regua('='))
  L.push('```')

  L.push('')
  L.push('*PAGAMENTO*')
  L.push(`${pedido.pagamento.forma}`)
  if (pedido.pagamento.forma === 'Pix') {
    L.push(`Chave ${LOJA.pix.tipo}: ${LOJA.pix.chave}`)
    L.push(`Favorecido: ${LOJA.pix.favorecido}`)
  }
  if (pedido.observacoes) {
    L.push('')
    L.push(`*OBSERVAÇÕES*`)
    L.push(pedido.observacoes)
  }
  L.push('')
  L.push('Aguardo a confirmação de vocês. Obrigado!')
  return L.join('\n')
}

// ---------------------------------------------------------------
// Mensagens que a loja envia de volta ao cliente
// ---------------------------------------------------------------
export function mensagemAceite(pedido) {
  const L = []
  L.push(`*${LOJA.nome.toUpperCase()}*`)
  L.push('')
  L.push(`Olá, ${pedido.cliente.nome.split(' ')[0]}. Seu pedido *${pedido.codigo}* foi confirmado.`)
  L.push('')
  if (pedido.tipo === 'encomenda' && pedido.encomenda) {
    L.push(`Reservamos a data ${dataCurta(pedido.encomenda.dataDesejada)}, às ${pedido.encomenda.hora}.`)
    L.push(`Total: ${brl(pedido.totais.total)}`)
    L.push(`Sinal de ${REGRAS_ENCOMENDA.percentualSinal}% para garantir a agenda: ${brl(pedido.totais.sinal)}`)
    L.push(`Chave Pix (${LOJA.pix.tipo}): ${LOJA.pix.chave}`)
    L.push('')
    L.push('Assim que o comprovante do sinal chegar aqui, a encomenda entra na produção.')
  } else {
    L.push(`Total: ${brl(pedido.totais.total)}`)
    L.push(`Chave Pix (${LOJA.pix.tipo}): ${LOJA.pix.chave}`)
    L.push('')
    L.push(`Já estamos preparando. É só retirar em ${LOJA.endereco}.`)
  }
  L.push('')
  L.push('Qualquer coisa, é só responder por aqui.')
  return L.join('\n')
}

export function mensagemRecusa(pedido, motivo) {
  const L = []
  L.push(`*${LOJA.nome.toUpperCase()}*`)
  L.push('')
  L.push(`Olá, ${pedido.cliente.nome.split(' ')[0]}. Sobre o pedido *${pedido.codigo}*:`)
  L.push('')
  L.push(motivo)
  L.push('')
  L.push('Nada foi cobrado. Se quiser, sugerimos outra data ou outro item da vitrine, é só me dizer.')
  return L.join('\n')
}

export function mensagemPronto(pedido) {
  return `*${LOJA.nome.toUpperCase()}*\n\nSeu pedido *${pedido.codigo}* está pronto para retirada em ${LOJA.endereco}. Bom apetite!`
}
