import { useMemo, useState } from 'react'
import { RETIRADA } from '../data/entrega.js'
import { LOJA } from '../lib/config.js'
import { brl, gerarCodigo, somenteDigitos } from '../lib/formato.js'

const vazio = {
  nome: '',
  telefone: '',
  observacoes: ''
}

export default function Comanda({ itens, onQtd, onLimpar, onEnviar, enviando, ultimoPedido, onNovoPedido, onVerCardapio, falhaGravacao }) {
  const [f, setF] = useState(vazio)
  const [erro, setErro] = useState('')

  const set = (campo) => (e) => setF({ ...f, [campo]: e.target.value })

  // So retirada no balcao: o total e o proprio subtotal, sem taxa.
  const total = useMemo(() => itens.reduce((s, i) => s + i.preco * i.qtd, 0), [itens])

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
      entrega: { modo: 'retirada', prazo: RETIRADA.prazo },
      totais: { subtotal: total, taxa: 0, total, sinal: 0 },
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
              <span>Retirada na loja</span>
              <span>{RETIRADA.prazo}</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>{brl(total)}</span>
            </div>
          </div>
        </>
      )}

      <p className="aviso">
        Pedido para <strong>retirada na loja</strong>, em {LOJA.endereco}.
      </p>

      <label className="campo">
        <span>Nome</span>
        <input value={f.nome} onChange={set('nome')} placeholder="Como podemos te chamar" />
      </label>

      <label className="campo">
        <span>WhatsApp com DDD</span>
        <input value={f.telefone} onChange={set('telefone')} placeholder="(19) 99999-9999" inputMode="tel" />
      </label>

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