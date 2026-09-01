import { useMemo, useState } from 'react'
import { ENCOMENDAS } from '../data/catalogo.js'
import { RETIRADA } from '../data/entrega.js'
import { REGRAS_ENCOMENDA, LOJA } from '../lib/config.js'
import { brl, gerarCodigo, somenteDigitos } from '../lib/formato.js'

// Data minima aceita, conforme a antecedencia do tipo de encomenda.
function dataMinima(tipo) {
  const horas = REGRAS_ENCOMENDA.antecedenciaHoras[tipo] ?? 48
  const d = new Date(Date.now() + horas * 3600 * 1000)
  return d.toISOString().slice(0, 10)
}

const HORARIOS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export default function Encomendas({ onEnviar, enviando, ultimoPedido, onNovoPedido }) {
  const [encId, setEncId] = useState(ENCOMENDAS[0].id)
  const [tamanhoId, setTamanhoId] = useState(ENCOMENDAS[0].tamanhos[0].id)
  const [f, setF] = useState({
    massa: '',
    recheio: '',
    texto: '',
    tema: '',
    restricoes: '',
    dataDesejada: '',
    hora: '15:00',
    nome: '',
    telefone: '',
    observacoes: ''
  })
  const [erro, setErro] = useState('')

  const enc = ENCOMENDAS.find((e) => e.id === encId)
  const tamanho = enc.tamanhos.find((t) => t.id === tamanhoId) || enc.tamanhos[0]
  const set = (campo) => (e) => setF({ ...f, [campo]: e.target.value })

  const minima = useMemo(() => dataMinima(enc.tipo), [enc.tipo])
  // Encomenda tambem sai so por retirada no balcao, sem taxa.
  const total = tamanho.preco
  const sinal = Math.round((total * REGRAS_ENCOMENDA.percentualSinal) / 100)

  function escolherEncomenda(id) {
    const alvo = ENCOMENDAS.find((e) => e.id === id)
    setEncId(id)
    setTamanhoId(alvo.tamanhos[0].id)
    setF((atual) => ({ ...atual, massa: '', recheio: '', dataDesejada: '' }))
  }

  if (ultimoPedido) {
    return (
      <section className="secao">
        <div className="secao-cabeca">
          <h2 className="secao-titulo">Encomenda enviada</h2>
          <span className="rotulo">{ultimoPedido.codigo}</span>
        </div>
        <p className="item-desc" style={{ maxWidth: '58ch', marginTop: 16 }}>
          A mensagem abriu no WhatsApp da Nebline com todos os detalhes. Toque em enviar por lá.
          A equipe confere a agenda da data pedida e responde confirmando, junto com a chave Pix do
          sinal de {REGRAS_ENCOMENDA.percentualSinal}%. A data só fica reservada depois do sinal.
        </p>
        <button className="botao botao-linha" style={{ maxWidth: 280 }} onClick={onNovoPedido}>
          Fazer outra encomenda
        </button>
      </section>
    )
  }

  function validar() {
    if (!f.dataDesejada) return 'Escolha a data da retirada.'
    if (f.dataDesejada < minima)
      return `Esta encomenda precisa de ${REGRAS_ENCOMENDA.antecedenciaHoras[enc.tipo]} horas de antecedência. A primeira data possível é ${minima.split('-').reverse().join('/')}.`
    if (enc.tipo === 'bolo_festivo' && (!f.massa || !f.recheio)) return 'Escolha a massa e o recheio do bolo.'
    if (f.nome.trim().length < 3) return 'Escreva seu nome completo.'
    if (somenteDigitos(f.telefone).length < 10) return 'Confira o telefone, com DDD.'
    return ''
  }

  function fechar() {
    const problema = validar()
    setErro(problema)
    if (problema) return

    onEnviar({
      codigo: gerarCodigo('EN'),
      tipo: 'encomenda',
      status: 'pendente',
      criado_em: new Date().toISOString(),
      cliente: { nome: f.nome.trim(), telefone: f.telefone.trim() },
      itens: [
        {
          id: `${enc.id}:${tamanho.id}`,
          nome: `${enc.nome}, ${tamanho.nome}`,
          opcao: null,
          preco: tamanho.preco,
          qtd: 1
        }
      ],
      entrega: { modo: 'retirada', prazo: RETIRADA.prazo },
      totais: { subtotal: tamanho.preco, taxa: 0, total, sinal },
      pagamento: { forma: 'Pix' },
      encomenda: {
        tipo: enc.tipo,
        produto: enc.nome,
        tamanho: tamanho.nome,
        massa: f.massa || null,
        recheio: f.recheio || null,
        texto: f.texto.trim() || null,
        tema: f.tema.trim() || null,
        restricoes: f.restricoes.trim() || null,
        dataDesejada: f.dataDesejada,
        hora: f.hora
      },
      observacoes: f.observacoes.trim()
    })
  }

  return (
    <section className="secao">
      <div className="secao-cabeca">
        <h2 className="secao-titulo">Encomendas</h2>
        <span className="rotulo">Bolos festivos, tortas inteiras e kits</span>
      </div>

      <p className="item-desc" style={{ maxWidth: '62ch', margin: '14px 0 22px' }}>
        Encomenda funciona por agenda, não por estoque. Você escolhe o que quer e a data, a Nebline
        confere se cabe na produção daquele dia e confirma pelo WhatsApp. A data fica reservada
        quando o sinal de {REGRAS_ENCOMENDA.percentualSinal}% é pago em Pix.
      </p>

      <div className="encomendas">
        {ENCOMENDAS.map((e) => (
          <div className="cartao-enc" key={e.id}>
            <h3>{e.nome}</h3>
            <p className="item-desc">{e.desc}</p>
            <p className="rotulo" style={{ marginTop: 10 }}>
              Antecedência mínima de {REGRAS_ENCOMENDA.antecedenciaHoras[e.tipo]} horas
            </p>
            <div className="tamanhos">
              {e.tamanhos.map((t) => (
                <button
                  className="tamanho"
                  key={t.id}
                  data-ativo={encId === e.id && tamanhoId === t.id}
                  onClick={() => {
                    escolherEncomenda(e.id)
                    setTamanhoId(t.id)
                  }}
                >
                  <span>{t.nome}</span>
                  <span className="preco">{brl(t.preco)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="cartao-enc" style={{ marginTop: 26 }}>
        <h3>Detalhes da sua {enc.nome.toLowerCase()}</h3>
        <p className="rotulo">{tamanho.nome}</p>

        {enc.tipo === 'bolo_festivo' && (
          <div className="dupla">
            <label className="campo">
              <span>Massa</span>
              <select value={f.massa} onChange={set('massa')}>
                <option value="">Escolha a massa</option>
                {enc.massas.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="campo">
              <span>Recheio</span>
              <select value={f.recheio} onChange={set('recheio')}>
                <option value="">Escolha o recheio</option>
                {enc.recheios.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {enc.permiteTexto && (
          <div className="dupla">
            <label className="campo">
              <span>Escrita no bolo ou cartão</span>
              <input value={f.texto} onChange={set('texto')} placeholder="Parabéns, Helena" />
            </label>
            <label className="campo">
              <span>Tema ou link de referência</span>
              <input value={f.tema} onChange={set('tema')} placeholder="Flores em tons de verde" />
            </label>
          </div>
        )}

        <div className="dupla">
          <label className="campo">
            <span>Data da retirada</span>
            <input type="date" min={minima} value={f.dataDesejada} onChange={set('dataDesejada')} />
          </label>
          <label className="campo">
            <span>Horário</span>
            <select value={f.hora} onChange={set('hora')}>
              {HORARIOS.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="campo">
          <span>Restrições alimentares</span>
          <input value={f.restricoes} onChange={set('restricoes')} placeholder="Sem lactose, sem glúten, alergias" />
        </label>

        <p className="aviso">
          A encomenda fica reservada para <strong>retirada na loja</strong>, em {LOJA.endereco}, na
          data e no horário escolhidos acima.
        </p>

        <div className="dupla">
          <label className="campo">
            <span>Nome</span>
            <input value={f.nome} onChange={set('nome')} placeholder="Nome completo" />
          </label>
          <label className="campo">
            <span>WhatsApp com DDD</span>
            <input value={f.telefone} onChange={set('telefone')} placeholder="(19) 99999-9999" inputMode="tel" />
          </label>
        </div>

        <label className="campo">
          <span>Observações</span>
          <textarea value={f.observacoes} onChange={set('observacoes')} placeholder="Qualquer detalhe que ajude a produção" />
        </label>

        <div className="totais">
          <div>
            <span>{enc.nome}</span>
            <span>{brl(tamanho.preco)}</span>
          </div>
          <div>
            <span>Retirada na loja</span>
            <span>{brl(0)}</span>
          </div>
          <div className="total">
            <span>Total</span>
            <span>{brl(total)}</span>
          </div>
          <div>
            <span>Sinal de {REGRAS_ENCOMENDA.percentualSinal}% para reservar</span>
            <span>{brl(sinal)}</span>
          </div>
        </div>

        {erro && (
          <p className="aviso" style={{ color: 'var(--carimbo)' }}>
            {erro}
          </p>
        )}

        <button className="botao" onClick={fechar} disabled={enviando}>
          {enviando ? 'Enviando' : 'Enviar encomenda no WhatsApp'}
        </button>
        <p className="aviso">
          Sinal em Pix após a confirmação da equipe. Chave {LOJA.pix.tipo}: {LOJA.pix.chave}.
          Nada é cobrado pelo site.
        </p>
      </div>
    </section>
  )
}
