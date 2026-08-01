import { useMemo, useState } from 'react'
import { BAIRROS, RETIRADA } from '../data/entrega.js'
import { LOJA } from '../lib/config.js'
import { brl, gerarCodigo, somenteDigitos } from '../lib/formato.js'

const vazio = {
  nome: '',
  telefone: '',
  modo: 'entrega',
  bairroId: BAIRROS[0].id,
  endereco: '',
  complemento: '',
  referencia: '',
  observacoes: ''
}

export default function Comanda({ itens, onQtd, onLimpar, onEnviar, enviando, ultimoPedido, onNovoPedido, onVerCardapio, falhaGravacao }) {
  const [f, setF] = useState(vazio)
  const [erro, setErro] = useState('')

  const set = (campo) => (e) => setF({ ...f, [campo]: e.target.value })

  const bairro = BAIRROS.find((b) => b.id === f.bairroId) || BAIRROS[0]
  const subtotal = useMemo(() => itens.reduce((s, i) => s + i.preco * i.qtd, 0), [itens])
  const taxa = f.modo === 'entrega' ? bairro.taxa : 0
  const total = subtotal + taxa
  const faltaMinimo = f.modo === 'entrega' && subtotal < LOJA.pedidoMinimoEntrega

  if (ultimoPedido) {
    return (
      <div className="comanda">
        <div className="comanda-topo">
          <div className="comanda-marca">NEBLINE</div>
          <div className="rotulo" style={{ marginTop: 8 }}>
            Pedido enviado
          </div>
        </div>
        <p className="comanda-linhas" style={{ marginTop: 18, lineHeight: 1.9 }}>
          Seu pedido é o <strong>{ultimoPedido.codigo}</strong>.<br />
          A mensagem abriu no WhatsApp da Nebline. Toque em enviar por lá para a
          equipe receber, e aguarde a confirmação com a chave Pix.
        </p>
        {falhaGravacao && (
          <p className="aviso" style={{ color: 'var(--carimbo)' }}>
            O pedido não pôde ser registrado no painel da loja, mas a mensagem do WhatsApp está
            correta. Confirme com a equipe pelo WhatsApp.
          </p>
        )}
        <button className="botao botao-linha" onClick={onNovoPedido}>
          Fazer outro pedido
        </button>
      </div>
    )
  }

  function validar() {
    if (itens.length === 0) return 'Escolha ao menos um item da vitrine.'
    if (f.nome.trim().length < 3) return 'Escreva seu nome completo.'
    if (somenteDigitos(f.telefone).length < 10) return 'Confira o telefone, com DDD.'
    if (f.modo === 'entrega' && f.endereco.trim().length < 6) return 'Escreva a rua e o número.'
    if (faltaMinimo) return `Pedido mínimo para entrega: ${brl(LOJA.pedidoMinimoEntrega)}.`
    return ''
  }

  function fechar() {
    const problema = validar()
    setErro(problema)
    if (problema) return

    onEnviar({
      codigo: gerarCodigo(),
      tipo: 'pedido',
      status: 'pendente',
      criado_em: new Date().toISOString(),
      cliente: { nome: f.nome.trim(), telefone: f.telefone.trim() },
      itens: itens.map(({ id, nome, opcao, preco, qtd }) => ({ id, nome, opcao, preco, qtd })),
      entrega:
        f.modo === 'entrega'
          ? {
              modo: 'entrega',
              bairro: bairro.nome,
              prazo: bairro.prazo,
              endereco: f.endereco.trim(),
              complemento: f.complemento.trim(),
              referencia: f.referencia.trim()
            }
          : { modo: 'retirada', prazo: RETIRADA.prazo },
      totais: { subtotal, taxa, total, sinal: 0 },
      pagamento: { forma: 'Pix' },
      encomenda: null,
      observacoes: f.observacoes.trim()
    })
    setF(vazio)
  }

  return (
    <div className="comanda">
      <div className="comanda-topo">
        <div className="comanda-marca">NEBLINE</div>
        <div className="rotulo" style={{ marginTop: 8 }}>
          {itens.length === 0
            ? 'Sua comanda'
            : `Sua comanda, ${itens.reduce((s, i) => s + i.qtd, 0)} ${
                itens.reduce((s, i) => s + i.qtd, 0) === 1 ? 'item' : 'itens'
              }`}
        </div>
      </div>

      {itens.length === 0 ? (
        <>
          <p className="comanda-vazia">
            Nada por aqui ainda.
            <br />
            Toque no + ao lado de um item da vitrine.
          </p>
          {onVerCardapio && (
            <button className="botao botao-linha" onClick={onVerCardapio}>
              Ver o cardápio
            </button>
          )}
        </>
      ) : (
        <>
          <div className="comanda-linhas">
            {itens.map((i) => (
              <div className="comanda-item" key={i.chave}>
                <div>
                  <div className="comanda-item-nome">{i.nome}</div>
                  {i.opcao && <div className="comanda-item-opcao">{i.opcao}</div>}
                  <div className="qtd">
                    <button onClick={() => onQtd(i.chave, -1)} aria-label={`Tirar um ${i.nome}`}>
                      −
                    </button>
                    <span>{i.qtd}</span>
                    <button onClick={() => onQtd(i.chave, 1)} aria-label={`Somar um ${i.nome}`}>
                      +
                    </button>
                  </div>
                </div>
                <span className="preco">{brl(i.preco * i.qtd)}</span>
              </div>
            ))}
          </div>

          <div className="totais">
            <div>
              <span>Subtotal</span>
              <span>{brl(subtotal)}</span>
            </div>
            <div>
              <span>{f.modo === 'entrega' ? `Entrega ${bairro.nome}` : 'Retirada na loja'}</span>
              <span>{brl(taxa)}</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>{brl(total)}</span>
            </div>
          </div>
        </>
      )}

      <div className="modos">
        <button className="modo" data-ativo={f.modo === 'entrega'} onClick={() => setF({ ...f, modo: 'entrega' })}>
          Entrega
        </button>
        <button className="modo" data-ativo={f.modo === 'retirada'} onClick={() => setF({ ...f, modo: 'retirada' })}>
          Retirar na loja
        </button>
      </div>

      <label className="campo">
        <span>Nome</span>
        <input value={f.nome} onChange={set('nome')} placeholder="Como podemos te chamar" />
      </label>

      <label className="campo">
        <span>WhatsApp com DDD</span>
        <input value={f.telefone} onChange={set('telefone')} placeholder="(19) 99999-9999" inputMode="tel" />
      </label>

      {f.modo === 'entrega' && (
        <>
          <label className="campo">
            <span>Bairro</span>
            <select value={f.bairroId} onChange={set('bairroId')}>
              {BAIRROS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nome}, {brl(b.taxa)}, {b.prazo}
                </option>
              ))}
            </select>
          </label>
          <label className="campo">
            <span>Rua e número</span>
            <input value={f.endereco} onChange={set('endereco')} placeholder="Rua Conceição, 942" />
          </label>
          <div className="dupla">
            <label className="campo">
              <span>Complemento</span>
              <input value={f.complemento} onChange={set('complemento')} placeholder="Apto 21" />
            </label>
            <label className="campo">
              <span>Referência</span>
              <input value={f.referencia} onChange={set('referencia')} placeholder="Portão verde" />
            </label>
          </div>
        </>
      )}

      <label className="campo">
        <span>Observações</span>
        <textarea value={f.observacoes} onChange={set('observacoes')} placeholder="Sem açúcar, embalar para presente, alergias" />
      </label>

      {erro && (
        <p className="aviso" style={{ color: 'var(--carimbo)' }}>
          {erro}
        </p>
      )}

      <button className="botao" onClick={fechar} disabled={enviando || itens.length === 0}>
        {enviando ? 'Enviando' : 'Fechar pedido no WhatsApp'}
      </button>

      {itens.length > 0 && (
        <button className="botao botao-linha" onClick={onLimpar}>
          Limpar comanda
        </button>
      )}

      <p className="aviso">
        Pagamento em Pix após a confirmação da equipe. Chave {LOJA.pix.tipo}: {LOJA.pix.chave}.
        Nada é cobrado pelo site.
      </p>
    </div>
  )
}