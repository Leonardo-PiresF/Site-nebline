import Foto from '../components/Foto.jsx'
import { PRODUTOS } from '../data/catalogo.js'
import { DESENHOS } from '../data/desenhos.js'
import { fotoDe, fotoHero } from '../data/fotos.js'
import { LOJA } from '../lib/config.js'
import { brl } from '../lib/formato.js'

// So o id, a categoria e a nota ficam aqui. Nome e preco saem do catalogo, para
// que um reajuste em catalogo.js chegue sozinho na home.
const DESTAQUES = [
  { id: 'tor-chocolatuda', cat: 'tortas', nota: 'A vencedora do programa' },
  { id: 'tor-banoffee', cat: 'tortas', nota: 'A queridinha da casa' },
  { id: 'doc-vasinho', cat: 'doces', nota: 'Pavê belga com flores comestíveis' },
  { id: 'sal-croissant-ganache', cat: 'salgados', nota: 'Sai quente à tarde' }
]

// Se um id sumir do cardapio, o destaque some da home em vez de quebrar a pagina.
const QUERIDINHOS = DESTAQUES.map((d) => {
  const produto = PRODUTOS.find((p) => p.id === d.id)
  return produto ? { ...d, nome: produto.nome, preco: produto.preco } : null
}).filter(Boolean)

const PILARES = [
  {
    titulo: 'Acolhedor e encantador',
    texto:
      'Um ambiente acolhedor e encantador, com espaço pet para você aproveitar ao lado de quem ama.'
  },
  {
    titulo: 'Feito com carinho',
    texto:
      'Aqui você encontra doces artesanais feitos com carinho, além de deliciosas opções vegetarianas e veganas.'
  },
  {
    titulo: 'Espaço para comemorar',
    texto:
      'Para tornar suas comemorações ainda mais especiais, temos o espaço perfeito para aniversários, encontros, confraternizações e eventos.'
  },
  {
    titulo: 'Tortas e bolos sob encomenda',
    texto:
      'Faça seu pedido pelo nosso WhatsApp e deixe a Nebline fazer parte do seu momento.'
  }
]

export default function Home({ onVerCardapio, onEncomendar }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-texto-col">
          <p className="rotulo">Cambuí, Campinas, desde 2020</p>
          <h2 className="hero-frase">
            Na Nebline, cada momento merece ser <em>especial</em>.
          </h2>
          <p className="hero-linha">Vem ter uma doce experiência conosco.</p>
          <div className="hero-acoes">
            <button className="botao" onClick={onVerCardapio}>
              Ver o cardápio
            </button>
            <button className="botao botao-linha" onClick={onEncomendar}>
              Encomendar um bolo
            </button>
          </div>
        </div>

        <figure className="hero-foto">
          <Foto src={fotoHero()} alt="A casa da Nebline, no Cambuí" inicial="N" />
        </figure>
      </section>

      <section className="secao">
        <div className="secao-cabeca">
          <h2 className="secao-titulo">Os queridinhos</h2>
          <span className="rotulo">O que mais sai da vitrine</span>
        </div>
        <div className="destaques">
          {QUERIDINHOS.map((q) => (
            <article className="destaque" key={q.id}>
              <Foto className="foto-destaque" src={fotoDe(q.id)} alt={q.nome} inicial={q.nome[0]} />
              <h3>{q.nome}</h3>
              <p>{q.nota}</p>
              <span className="preco">{brl(q.preco)}</span>
            </article>
          ))}
        </div>
        <button className="botao botao-linha botao-largo" onClick={onVerCardapio}>
          Ver o cardápio inteiro
        </button>
      </section>

      <section className="secao">
        <div className="pilares">
          {PILARES.map((p) => (
            <article className="pilar" key={p.titulo}>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="secao">
        <div className="secao-cabeca">
          <h2 className="secao-titulo">Onde estamos</h2>
          <span className="rotulo">Cambuí</span>
        </div>
        <div className="endereco-linha">
          <p className="endereco-grande">{LOJA.endereco}</p>
          <img className="desenho desenho-endereco" src={DESENHOS.ramoCurto} alt="" aria-hidden="true" />
        </div>
        <div className="faixa-horarios">
          {LOJA.horarios.map(([dia, hora]) => (
            <div key={dia}>
              <span className="rotulo">{dia}</span>
              <strong>{hora}</strong>
            </div>
          ))}
        </div>
        <div className="hero-acoes">
          <a
            className="botao botao-linha"
            href="https://www.google.com/maps/search/?api=1&query=Nebline+Confeitaria+Campinas"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir no mapa
          </a>
          <a
            className="botao botao-linha"
            href="https://www.instagram.com/neblineconfeitaria/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver o Instagram
          </a>
        </div>
      </section>

    </div>
  )
}
