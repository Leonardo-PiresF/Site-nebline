import { useState } from 'react'

// Foto com queda elegante: se a imagem nao carregar, sobra uma placa com a
// inicial do item, no lugar de um icone quebrado.
export default function Foto({ src, alt, inicial, className = '' }) {
  const [falhou, setFalhou] = useState(false)

  if (falhou || !src) {
    return (
      <div className={`foto foto-vazia ${className}`} aria-hidden="true">
        <span>{inicial}</span>
      </div>
    )
  }

  return (
    <img
      className={`foto ${className}`}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFalhou(true)}
    />
  )
}
