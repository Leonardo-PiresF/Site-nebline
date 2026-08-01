import Foto from '../components/Foto.jsx'
import { fotoDe, fotoHero, fotoSobre } from '../data/fotos.js'
import { LOJA } from '../lib/config.js'
import { brl } from '../lib/formato.js'

const QUERIDINHOS = [
  { id: 'tor-chocolatuda', cat: 'tortas', nome: 'Torta Chocolatuda', nota: 'A vencedora do programa', preco: 28 },
  { id: 'tor-banoffee', cat: 'tortas', nome: 'Torta Banoffee', nota: 'A queridinha da casa', preco: 25 },
  { id: 'doc-vasinho', cat: 'doces', nome: 'Vasinho', nota: 'Pavê belga com flores comestíveis', preco: 32 },
  { id: 'sal-croissant-ganache', cat: 'salgados', nome: 'Croissant de ganache belga', nota: 'Sai quente à tarde', preco: 23 }
]

const PILARES = [
  {
    titulo: 'Uma casa, não uma loja',
    texto:
      'Funcionamos em uma casa de família no Cambuí, com deck coberto por uma trepadeira de jasmim. Cachorro é bem-vindo no jardim.'
  },
  {
    titulo: 'Feito à mão, todo dia',
    texto:
      'Massa de fermentação natural, ganache belga, doce de leite caseiro. O bolo do dia e a verrine mudam conforme o que está bom na semana.'
  },
  {
    titulo: 'Cardápio para todo mundo',
    texto:
      'Há opções veganas, sem lactose, sem glúten e zero açúcar em quase todas as seções, marcadas item por item.'
  },
  {
    titulo: 'Encomenda com data marcada',
    texto:
      'Bolo festivo, torta inteira e caixa de presente saem por agenda, com sinal de 50% para reservar o lugar na bancada.'
  }
]

export default function Home({ onVerCardapio, onEncomendar }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-texto-col">
          <p className="rotulo">Cambuí, Campinas, desde 2020</p>
          <h2 className="hero-frase">
            A torta que ganhou o <em>Que Seja Doce</em> está a alguns quarteirões de você.
          </h2>
          <p className="hero-linha">
            Doces feitos à mão, café, brunch e encomendas com data marcada. Monte seu pedido por
            aqui e finalize no WhatsApp, sem baixar aplicativo e sem taxa de plataforma.
          </p>
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
              <Foto className="foto-destaque" src={fotoDe(q.id, q.cat, 500, 500)} alt={q.nome} inicial={q.nome[0]} />
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

      <section className="secao sobre">
        <figure className="sobre-foto">
          <Foto src={fotoSobre()} alt="O deck coberto de jasmim da Nebline" inicial="N" />
        </figure>

        <div>
          <div className="secao-cabeca">
            <h2 className="secao-titulo">Sobre a Nebline</h2>
            <span className="rotulo">Quem faz</span>
          </div>

          <p className="sobre-texto">
            A Nebline nasceu em 2020, em uma casa de família no Cambuí, das mãos do chef Heeid
            Albuquerque, formado em gastronomia e especializado em confeitaria na Le Cordon Bleu,
            ao lado do sócio Michel Lebedka.
          </p>
          <p className="sobre-texto">
            Em dezembro daquele mesmo ano, a torta Chocolatuda venceu o Que Seja Doce, do GNT, e o
            Vasinho, um pavê belga com flores comestíveis, levou a prova técnica do programa. Os
            dois continuam na vitrine, feitos do mesmo jeito, todos os dias.
          </p>
          <p className="sobre-texto">
            O resto da casa cresceu em volta disso: croissant de fermentação natural, brunch no
            deck de jasmim, café de máquina, massas no almoço e uma vitrine que muda conforme a
            semana. Quem chega com restrição alimentar encontra opção em quase toda seção do
            cardápio, e quem chega com cachorro encontra lugar no jardim.
          </p>

          <div className="pilares">
            {PILARES.map((p) => (
              <article className="pilar" key={p.titulo}>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="secao-cabeca">
          <h2 className="secao-titulo">Onde estamos</h2>
          <span className="rotulo">Cambuí</span>
        </div>
        <p className="endereco-grande">{LOJA.endereco}</p>
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
