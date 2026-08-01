import { CATEGORIAS } from '../data/catalogo.js'
import { brl } from '../lib/formato.js'

export default function Cabecalho({ secao, categoria, onIrPara, onCategoria, qtd, total }) {
  return (
    <>
      <header className="topo">
        <div className="topo-interno">
          <button className="marca-botao" onClick={() => onIrPara('home')} aria-label="Ir para o início">
            <img className="marca-img" src="/logo-nebline.png" alt="Nebline, handmade sweets and more" />
          </button>

          <button
            className="botao-comanda"
            data-ativa={secao === 'comanda'}
            onClick={() => onIrPara('comanda')}
          >
            <span>Comanda</span>
            <span className="botao-comanda-valor">
              {qtd > 0 ? `${qtd} ${qtd === 1 ? 'item' : 'itens'}, ${brl(total)}` : 'vazia'}
            </span>
          </button>
        </div>
      </header>

      <nav className="nav-cats" data-secao={secao} aria-label="Seções">
        <div className="nav-cats-interno">
          <button className="aba aba-principal" data-ativa={secao === 'home'} onClick={() => onIrPara('home')}>
            Início
          </button>
          {CATEGORIAS.map((c) => (
            <button
              key={c.id}
              className="aba"
              data-ativa={secao === 'cardapio' && categoria === c.id}
              onClick={() => onCategoria(c.id)}
            >
              {c.nome}
            </button>
          ))}
          <button
            className="aba aba-principal"
            data-ativa={secao === 'encomendas'}
            onClick={() => onIrPara('encomendas')}
          >
            Encomendas
          </button>
        </div>
      </nav>
    </>
  )
}
