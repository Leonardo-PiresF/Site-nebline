import { useEffect, useMemo, useState } from 'react'
import { CATEGORIAS, PRODUTOS } from '../data/catalogo.js'
import { fotoDe } from '../data/fotos.js'
import Foto from '../components/Foto.jsx'
import {
  aoMudarSessao,
  assinarPedidos,
  atualizarPedido,
  definirDisponibilidade,
  listarIndisponiveis,
  listarPedidos,
  sair,
  sessaoAtual
} from '../lib/db.js'
import Entrar from '../components/Entrar.jsx'
import { temSupabase } from '../lib/supabase.js'
import { enviarWhatsApp } from '../lib/whatsapp.js'
import {
  brl,
  dataCurta,
  dataHora,
  mensagemAceite,
  mensagemPronto,
  mensagemRecusa
} from '../lib/formato.js'

const MOTIVOS = [
  'A agenda desta data já está fechada. Consigo produzir em outra data próxima.',
  'Este item acabou hoje na vitrine.',
  'Não entregamos neste endereço no horário pedido.'
]

function Pedido({ pedido, onAceitar, onRecusar, onConcluir }) {
  const [recusando, setRecusando] = useState(false)
  const [motivo, setMotivo] = useState(MOTIVOS[0])

  return (
    <article className="pedido" data-status={pedido.status}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
        <span className="pedido-codigo">{pedido.codigo}</span>
        <span className="status" data-s={pedido.status}>
          {pedido.status}
        </span>
      </div>

      <div className="rotulo" style={{ marginTop: 8 }}>
        {dataHora(pedido.criado_em)}
      </div>

      <div style={{ marginTop: 12, fontSize: 13 }}>
        <strong>{pedido.cliente.nome}</strong>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{pedido.cliente.telefone}</div>
        <div style={{ fontSize: 12, color: 'var(--tinta-70)', marginTop: 6 }}>
          {pedido.entrega.modo === 'entrega'
            ? `${pedido.entrega.endereco}, ${pedido.entrega.bairro}${
                pedido.entrega.complemento ? `, ${pedido.entrega.complemento}` : ''
              }`
            : 'Retirada na loja'}
        </div>
      </div>

      {pedido.encomenda && (
        <div style={{ marginTop: 12, fontSize: 12, borderLeft: '2px solid var(--jasmim)', paddingLeft: 10 }}>
          <div>
            <strong>
              {dataCurta(pedido.encomenda.dataDesejada)} às {pedido.encomenda.hora}
            </strong>
          </div>
          <div>{pedido.encomenda.tamanho}</div>
          {pedido.encomenda.massa && <div>Massa: {pedido.encomenda.massa}</div>}
          {pedido.encomenda.recheio && <div>Recheio: {pedido.encomenda.recheio}</div>}
          {pedido.encomenda.texto && <div>Escrita: "{pedido.encomenda.texto}"</div>}
          {pedido.encomenda.tema && <div>Tema: {pedido.encomenda.tema}</div>}
          {pedido.encomenda.restricoes && <div>Restrições: {pedido.encomenda.restricoes}</div>}
        </div>
      )}

      <div className="pedido-linhas">
        {pedido.itens.map((i, idx) => (
          <div key={idx}>
            <span>
              {i.qtd}x {i.nome}
              {i.opcao ? ` (${i.opcao})` : ''}
            </span>
            <span>{brl(i.preco * i.qtd)}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--tinta)', marginTop: 6, paddingTop: 6, fontWeight: 700 }}>
          <span>Total</span>
          <span>{brl(pedido.totais.total)}</span>
        </div>
        {pedido.totais.sinal > 0 && (
          <div>
            <span>Sinal</span>
            <span>{brl(pedido.totais.sinal)}</span>
          </div>
        )}
      </div>

      {pedido.observacoes && (
        <p className="aviso" style={{ marginTop: 0 }}>
          Observações: {pedido.observacoes}
        </p>
      )}

      {pedido.motivo_recusa && (
        <p className="aviso" style={{ color: 'var(--carimbo)' }}>
          Recusado: {pedido.motivo_recusa}
        </p>
      )}

      {pedido.status === 'pendente' && !recusando && (
        <div className="acoes">
          <button className="botao" onClick={() => onAceitar(pedido)}>
            Aceitar e avisar
          </button>
          <button className="botao botao-perigo" onClick={() => setRecusando(true)}>
            Recusar
          </button>
        </div>
      )}

      {pedido.status === 'pendente' && recusando && (
        <div style={{ marginTop: 12 }}>
          <label className="campo">
            <span>Motivo enviado ao cliente</span>
            <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} />
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {MOTIVOS.map((m) => (
              <button key={m} className="chave" onClick={() => setMotivo(m)}>
                {m.slice(0, 26)}
              </button>
            ))}
          </div>
          <div className="acoes">
            <button className="botao botao-perigo" onClick={() => onRecusar(pedido, motivo)}>
              Recusar e avisar
            </button>
            <button className="botao botao-linha" onClick={() => setRecusando(false)}>
              Voltar
            </button>
          </div>
        </div>
      )}

      {pedido.status === 'aceito' && (
        <div className="acoes">
          <button className="botao botao-linha" onClick={() => onConcluir(pedido)}>
            {pedido.entrega.modo === 'entrega' ? 'Saiu para entrega' : 'Pronto para retirada'}
          </button>
        </div>
      )}
    </article>
  )
}

export default function Admin() {
  const [autenticado, setAutenticado] = useState(
    () => (temSupabase ? null : window.sessionStorage.getItem('nebline:admin') === 'ok')
  )
  const [visao, setVisao] = useState('pedido')
  const [pedidos, setPedidos] = useState([])
  const [indisponiveis, setIndisponiveis] = useState([])
  const [carregando, setCarregando] = useState(true)

  async function recarregar() {
    const [p, i] = await Promise.all([listarPedidos(), listarIndisponiveis()])
    setPedidos(p)
    setIndisponiveis(i)
    setCarregando(false)
  }

  // Com Supabase, a sessao manda. Se ela expirar em outra aba, o painel
  // volta sozinho para a tela de login.
  useEffect(() => {
    if (!temSupabase) return
    sessaoAtual().then((s) => setAutenticado(Boolean(s)))
    return aoMudarSessao((s) => setAutenticado(Boolean(s)))
  }, [])

  useEffect(() => {
    if (!autenticado) return
    recarregar().catch(() => setCarregando(false))
    const cancelar = assinarPedidos(() => recarregar())
    return cancelar
  }, [autenticado])

  const lista = useMemo(
    () => pedidos.filter((p) => (visao === 'encomenda' ? p.tipo === 'encomenda' : p.tipo === 'pedido')),
    [pedidos, visao]
  )
  const pendentes = pedidos.filter((p) => p.status === 'pendente').length

  // Em todas as acoes o WhatsApp abre primeiro, ainda dentro do clique,
  // e o status e gravado logo em seguida. Invertido, o navegador do celular
  // trata a aba como popup e bloqueia.
  async function responder(p, mensagem, campos) {
    await enviarWhatsApp(p.cliente.telefone, mensagem)
    await atualizarPedido(p.id, campos)
    recarregar()
  }

  const aceitar = (p) => responder(p, mensagemAceite(p), { status: 'aceito' })

  const recusar = (p, motivo) =>
    responder(p, mensagemRecusa(p, motivo), { status: 'recusado', motivo_recusa: motivo })

  const concluir = (p) => responder(p, mensagemPronto(p), { status: 'concluido' })

  async function alternarItem(id, esgotado) {
    const novos = await definirDisponibilidade(id, esgotado)
    setIndisponiveis(Array.isArray(novos) ? novos : await listarIndisponiveis())
  }

  if (autenticado === null) {
    return <p className="vazio" style={{ margin: '18vh auto', maxWidth: 340 }}>Carregando</p>
  }

  if (!autenticado) {
    return <Entrar onEntrou={() => setAutenticado(true)} />
  }

  return (
    <>
      {!temSupabase && (
        <div className="faixa-demo">
          Modo demonstração: os pedidos ficam só neste navegador. Configure o Supabase para valer de verdade.
        </div>
      )}

      <div className="admin">
        <div className="admin-topo">
          <div>
            <img className="marca-img" src="/logo-nebline.png" alt="Nebline" />
            <div className="rotulo" style={{ marginTop: 8 }}>
              Painel de pedidos, {pendentes} aguardando resposta
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              ['pedido', 'Pedidos'],
              ['encomenda', 'Encomendas'],
              ['estoque', 'Disponibilidade']
            ].map(([id, nome]) => (
              <button key={id} className="aba" data-ativa={visao === id} onClick={() => setVisao(id)}>
                {nome}
              </button>
            ))}
            <button
              className="aba"
              onClick={async () => {
                await sair()
                window.sessionStorage.removeItem('nebline:admin')
                setAutenticado(false)
              }}
            >
              Sair
            </button>
          </div>
        </div>

        {visao === 'estoque' ? (
          <>
            <p className="aviso">
              Desligar um item some com ele da vitrine na hora. Ligue de novo quando voltar a ter.
            </p>
            {CATEGORIAS.map((c) => (
              <section key={c.id} style={{ marginTop: 26 }}>
                <div className="secao-cabeca">
                  <h2 className="secao-titulo" style={{ fontSize: 22 }}>
                    {c.nome}
                  </h2>
                </div>
                <div className="estoque">
                  {PRODUTOS.filter((p) => p.cat === c.id).map((p) => {
                    const esgotado = indisponiveis.includes(p.id)
                    return (
                      <div className="estoque-linha" key={p.id}>
                        <span
                          style={{
                            opacity: esgotado ? 0.5 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10
                          }}
                        >
                          <Foto
                            className="foto-mini"
                            src={fotoDe(p.id, p.cat, 80, 80)}
                            alt=""
                            inicial={p.nome[0]}
                          />
                          {p.nome}
                        </span>
                        <button
                          className="chave"
                          data-esgotado={esgotado}
                          onClick={() => alternarItem(p.id, esgotado)}
                        >
                          {esgotado ? 'Acabou' : 'Na vitrine'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </>
        ) : carregando ? (
          <p className="vazio">Carregando</p>
        ) : lista.length === 0 ? (
          <p className="vazio">
            Nenhum{visao === 'encomenda' ? 'a encomenda' : ' pedido'} por aqui ainda.
            <br />
            Assim que alguém fechar pelo site, aparece nesta tela.
          </p>
        ) : (
          <div className="pedidos">
            {lista.map((p) => (
              <Pedido key={p.id} pedido={p} onAceitar={aceitar} onRecusar={recusar} onConcluir={concluir} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
