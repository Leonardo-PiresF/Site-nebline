import { brl } from '../lib/formato.js'

const Icone = ({ d }) => (
  <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)

const CAMINHOS = {
  // casa
  home: 'M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z',
  // fatia de torta
  cardapio: 'M3 15h18M4.5 15c0-4.7 3.4-8 7.5-8s7.5 3.3 7.5 8M12 4v3',
  // calendario
  encomendas: 'M4 6h16v15H4zM4 10h16M9 3v4M15 3v4',
  // comanda
  comanda: 'M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21zM9 8h6M9 12h6'
}

export default function BarraApp({ secao, onIr, qtd, total }) {
  const abas = [
    ['home', 'Início'],
    ['cardapio', 'Cardápio'],
    ['encomendas', 'Encomendas'],
    ['comanda', 'Comanda']
  ]

  return (
    <nav className="barra-app" aria-label="Navegação principal">
      {abas.map(([id, nome]) => (
        <button key={id} data-ativa={secao === id} onClick={() => onIr(id)} aria-current={secao === id ? 'page' : undefined}>
          <span className="barra-icone">
            <Icone d={CAMINHOS[id]} />
            {id === 'comanda' && qtd > 0 && <span className="selo-qtd">{qtd}</span>}
          </span>
          <span className="barra-nome">{id === 'comanda' && qtd > 0 ? brl(total) : nome}</span>
        </button>
      ))}
    </nav>
  )
}
