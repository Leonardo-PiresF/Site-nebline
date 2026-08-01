import { useEffect, useState } from 'react'
import Loja from './pages/Loja.jsx'
import Admin from './pages/Admin.jsx'

// Roteamento simples por hash: a loja em / e o painel em /#/admin.
export default function App() {
  const [rota, setRota] = useState(window.location.hash)

  useEffect(() => {
    const aoMudar = () => setRota(window.location.hash)
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [])

  return rota.startsWith('#/admin') ? <Admin /> : <Loja />
}
