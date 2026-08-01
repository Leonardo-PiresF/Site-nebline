import { useState } from 'react'
import Foto from './Foto.jsx'
import { fotoDe } from '../data/fotos.js'
import { brl } from '../lib/formato.js'

function Linha({ produto, esgotado, onAdicionar }) {
  const [opcao, setOpcao] = useState(produto.opcoes ? produto.opcoes.valores[0] : null)

  return (
    <article className="item" data-esgotado={esgotado}>
      <Foto
        className="foto-item"
        src={fotoDe(produto.id, produto.cat)}
        alt={produto.nome}
        inicial={produto.nome[0]}
      />

      <div className="item-texto">
        <h3 className="item-nome">
          {produto.nome}
          {produto.peso && <span className="item-peso">{produto.peso}</span>}
        </h3>
        {produto.desc && <p className="item-desc">{produto.desc}</p>}
        {produto.opcoes && !esgotado && (
          <select
            className="escolha"
            value={opcao}
            aria-label={produto.opcoes.rotulo}
            onChange={(e) => setOpcao(e.target.value)}
          >
            {produto.opcoes.valores.map((v) => (
              <option key={v} value={v}>
                {produto.opcoes.rotulo}: {v}
              </option>
            ))}
          </select>
        )}
        {produto.tags?.length > 0 && (
          <div className="item-tags">
            {produto.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="item-lado">
        <span className="preco">{brl(produto.preco)}</span>
        {esgotado ? (
          <span className="selo-esgotado">Acabou hoje</span>
        ) : (
          <button
            className="add"
            aria-label={`Adicionar ${produto.nome} à comanda`}
            onClick={() => onAdicionar(produto, opcao)}
          >
            +
          </button>
        )}
      </div>
    </article>
  )
}

export default function Vitrine({ categoria, produtos, indisponiveis, onAdicionar }) {
  return (
    <section className="secao">
      <div className="secao-cabeca">
        <h2 className="secao-titulo">{categoria.nome}</h2>
        <span className="rotulo">{categoria.linha}</span>
      </div>
      <p className="aviso">Fotos ilustrativas, ainda não são os doces da casa.</p>
      <div className="itens">
        {produtos.map((p) => (
          <Linha
            key={p.id}
            produto={p}
            esgotado={indisponiveis.includes(p.id)}
            onAdicionar={onAdicionar}
          />
        ))}
      </div>
    </section>
  )
}
