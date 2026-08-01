import { useState } from 'react'
import { entrar } from '../lib/db.js'
import { temSupabase } from '../lib/supabase.js'

// Duas portas: com Supabase configurado, login de verdade por email e senha.
// Sem Supabase, uma senha local so para demonstrar o painel.
export default function Entrar({ onEntrou }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const senhaDemo = import.meta.env.VITE_ADMIN_SENHA || 'nebline'

  async function submeter() {
    setErro('')

    if (!temSupabase) {
      if (senha !== senhaDemo) return setErro('Senha incorreta.')
      window.sessionStorage.setItem('nebline:admin', 'ok')
      return onEntrou()
    }

    setCarregando(true)
    try {
      await entrar(email.trim(), senha)
      onEntrou()
    } catch (e) {
      setErro(
        e.message?.includes('Invalid login')
          ? 'Email ou senha incorretos.'
          : 'Não foi possível entrar. Tente de novo.'
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="entrar">
      <img className="marca-img" src="/logo-nebline.png" alt="Nebline" style={{ margin: '0 auto' }} />
      <div className="rotulo" style={{ marginTop: 14 }}>
        Painel de pedidos
      </div>

      {temSupabase && (
        <label className="campo" style={{ textAlign: 'left', marginTop: 22 }}>
          <span>Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      )}

      <label className="campo" style={{ textAlign: 'left', marginTop: temSupabase ? 12 : 22 }}>
        <span>Senha</span>
        <input
          type="password"
          autoComplete="current-password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submeter()}
        />
      </label>

      {erro && (
        <p className="aviso" style={{ color: 'var(--carimbo)' }}>
          {erro}
        </p>
      )}

      <button className="botao" onClick={submeter} disabled={carregando}>
        {carregando ? 'Entrando' : 'Entrar'}
      </button>

      {!temSupabase && (
        <p className="aviso">
          Modo demonstração. Sem Supabase configurado, o painel usa uma senha local e os pedidos
          ficam só neste navegador.
        </p>
      )}
    </div>
  )
}
