import { useEffect, useMemo, useState } from 'react'
import Cabecalho from '../components/Cabecalho.jsx'
import Cercadura from '../components/Cercadura.jsx'
import BarraApp from '../components/BarraApp.jsx'
import Vitrine from '../components/Vitrine.jsx'
import Comanda from '../components/Comanda.jsx'
import Encomendas from '../components/Encomendas.jsx'
import Home from './Home.jsx'
import { CATEGORIAS, PRODUTOS } from '../data/catalogo.js'
import { LOJA } from '../lib/config.js'
import { brl, mensagemPedido } from '../lib/formato.js'
import { criarPedido, listarIndisponiveis } from '../lib/db.js'
import { enviarWhatsApp } from '../lib/whatsapp.js'

export default function Loja() {
  // secao: home, cardapio, encomendas, comanda (comanda so aparece no mobile,
  // no desktop ela fica fixa na coluna da direita)
  const [secao, setSecao] = useState('home')
  const [categoria, setCategoria] = useState(CATEGORIAS[0].id)
  const [itens, setItens] = useState([])
  const [indisponiveis, setIndisponiveis] = useState([])
  const [enviando, setEnviando] = useState(false)
  const [ultimoPedido, setUltimoPedido] = useState(null)
  const [ultimaEncomenda, setUltimaEncomenda] = useState(null)
  const [falhaGravacao, setFalhaGravacao] = useState(false)

  useEffect(() => {
    listarIndisponiveis().then(setIndisponiveis).catch(() => setIndisponiveis([]))
  }, [])

  // Toda troca de secao volta ao topo, como um app faz ao trocar de aba.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [secao, categoria])

  const total = useMemo(() => itens.reduce((s, i) => s + i.preco * i.qtd, 0), [itens])
  const qtdTotal = useMemo(() => itens.reduce((s, i) => s + i.qtd, 0), [itens])

  function adicionar(produto, opcao) {
    const chave = opcao ? `${produto.id}::${opcao}` : produto.id
    setItens((atuais) => {
      const achado = atuais.find((i) => i.chave === chave)
      if (achado) return atuais.map((i) => (i.chave === chave ? { ...i, qtd: i.qtd + 1 } : i))
      return [...atuais, { chave, id: produto.id, nome: produto.nome, opcao, preco: produto.preco, qtd: 1 }]
    })
    setUltimoPedido(null)
  }

  function mudarQtd(chave, delta) {
    setItens((atuais) =>
      atuais.map((i) => (i.chave === chave ? { ...i, qtd: i.qtd + delta } : i)).filter((i) => i.qtd > 0)
    )
  }

  async function enviarPedido(pedido) {
    setEnviando(true)
    // A janela do WhatsApp abre AGORA, ainda dentro do clique. Se gravarmos no
    // banco antes, o await quebra o gesto e o Safari do iPhone bloqueia a aba.
    // O codigo do pedido e gerado no navegador, entao a mensagem nao depende do banco.
    try {
      await enviarWhatsApp(LOJA.whatsappLoja, mensagemPedido(pedido))
    } finally {
      if (pedido.tipo === 'encomenda') setUltimaEncomenda(pedido)
      else {
        setUltimoPedido(pedido)
        setItens([])
      }
      setEnviando(false)
      // Gravacao em segundo plano. Se o banco falhar, o pedido ja esta no
      // WhatsApp, entao nada se perde, mas ele nao aparece no painel. Avisamos
      // para que ninguem descubra isso so na hora do balcao.
      setFalhaGravacao(false)
      criarPedido(pedido).catch((e) => {
        console.error('Falha ao gravar o pedido', e)
        setFalhaGravacao(true)
      })
    }
  }

  function irPara(destino) {
    setSecao(destino)
  }

  function abrirCategoria(id) {
    setCategoria(id)
    setSecao('cardapio')
  }

  const catAtual = CATEGORIAS.find((c) => c.id === categoria)

  return (
    <>
      <Cabecalho
        secao={secao}
        categoria={categoria}
        onIrPara={irPara}
        onCategoria={abrirCategoria}
        qtd={qtdTotal}
        total={total}
      />

      <Cercadura lado="topo" />

      <main className="palco">
        <div className="conteudo">
          {secao === 'home' && (
            <Home onVerCardapio={() => setSecao('cardapio')} onEncomendar={() => setSecao('encomendas')} />
          )}

          {secao === 'cardapio' && (
            <Vitrine
              categoria={catAtual}
              produtos={PRODUTOS.filter((p) => p.cat === categoria)}
              indisponiveis={indisponiveis}
              onAdicionar={adicionar}
            />
          )}

          {secao === 'encomendas' && (
            <Encomendas
              onEnviar={enviarPedido}
              enviando={enviando}
              ultimoPedido={ultimaEncomenda}
              onNovoPedido={() => setUltimaEncomenda(null)}
            />
          )}

          {secao === 'comanda' && (
            <div className="tela-comanda">
              <Comanda
                itens={itens}
                onQtd={mudarQtd}
                onLimpar={() => setItens([])}
                onEnviar={enviarPedido}
                enviando={enviando}
                ultimoPedido={ultimoPedido}
                onNovoPedido={() => setUltimoPedido(null)}
                onVerCardapio={() => setSecao('cardapio')}
                falhaGravacao={falhaGravacao}
              />
            </div>
          )}
        </div>
      </main>

      <Cercadura lado="base" />

      <BarraApp secao={secao} onIr={irPara} qtd={qtdTotal} total={total} />

      <footer className="rodape">
        <div>{LOJA.endereco}</div>
        <div>Pedidos e encomendas pelo WhatsApp, para retirar na loja, pagamento em Pix</div>
      </footer>
    </>
  )
}