import { supabase, temSupabase } from './supabase.js'

// Camada unica de dados. Se as variaveis do Supabase existirem, usa o banco.
// Se nao, cai para armazenamento local do navegador, o que serve para
// desenvolver e demonstrar a loja sem precisar de backend.

const CHAVE_PEDIDOS = 'nebline:pedidos'
const CHAVE_INDISPONIVEIS = 'nebline:indisponiveis'

const lerLocal = (chave, padrao) => {
  try {
    return JSON.parse(window.localStorage.getItem(chave)) ?? padrao
  } catch {
    return padrao
  }
}
const gravarLocal = (chave, valor) => {
  window.localStorage.setItem(chave, JSON.stringify(valor))
}

// ---------------------------------------------------------------
// Disponibilidade dos produtos (falta temporaria)
// ---------------------------------------------------------------
export async function listarIndisponiveis() {
  if (!temSupabase) return lerLocal(CHAVE_INDISPONIVEIS, [])
  const { data, error } = await supabase
    .from('disponibilidade')
    .select('produto_id')
    .eq('disponivel', false)
  if (error) throw error
  return data.map((r) => r.produto_id)
}

export async function definirDisponibilidade(produtoId, disponivel) {
  if (!temSupabase) {
    const atuais = lerLocal(CHAVE_INDISPONIVEIS, [])
    const novos = disponivel
      ? atuais.filter((id) => id !== produtoId)
      : [...new Set([...atuais, produtoId])]
    gravarLocal(CHAVE_INDISPONIVEIS, novos)
    return novos
  }
  const { error } = await supabase
    .from('disponibilidade')
    .upsert({ produto_id: produtoId, disponivel, atualizado_em: new Date().toISOString() })
  if (error) throw error
  return listarIndisponiveis()
}

// ---------------------------------------------------------------
// Pedidos
// ---------------------------------------------------------------
export async function criarPedido(pedido) {
  if (!temSupabase) {
    const atuais = lerLocal(CHAVE_PEDIDOS, [])
    const novo = { ...pedido, id: crypto.randomUUID() }
    gravarLocal(CHAVE_PEDIDOS, [novo, ...atuais])
    return novo
  }
  // Sem .select() de proposito: o visitante anonimo tem permissao de INSERT,
  // mas nao de SELECT. Pedir os dados de volta faria o RLS recusar e o site
  // acusaria erro em um pedido que na verdade entrou.
  const { error } = await supabase.from('pedidos').insert(pedido)
  if (error) throw error
  return pedido
}

export async function listarPedidos() {
  if (!temSupabase) return lerLocal(CHAVE_PEDIDOS, [])
  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .order('criado_em', { ascending: false })
    .limit(300)
  if (error) throw error
  return data
}

export async function atualizarPedido(id, campos) {
  if (!temSupabase) {
    const atuais = lerLocal(CHAVE_PEDIDOS, [])
    const novos = atuais.map((p) => (p.id === id ? { ...p, ...campos } : p))
    gravarLocal(CHAVE_PEDIDOS, novos)
    return novos.find((p) => p.id === id)
  }
  const { data, error } = await supabase.from('pedidos').update(campos).eq('id', id).select().single()
  if (error) throw error
  return data
}

// Assina novos pedidos em tempo real, para o painel tocar quando entrar pedido.
export function assinarPedidos(callback) {
  if (!temSupabase) return () => {}
  const canal = supabase
    .channel('pedidos-ao-vivo')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'pedidos' }, callback)
    .subscribe()
  return () => supabase.removeChannel(canal)
}

// ---------------------------------------------------------------
// Sessao da equipe
// ---------------------------------------------------------------
export async function entrar(email, senha) {
  if (!temSupabase) throw new Error('Supabase não configurado')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
  if (error) throw error
  return data.session
}

export async function sair() {
  if (!temSupabase) return
  await supabase.auth.signOut()
}

export async function sessaoAtual() {
  if (!temSupabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

// Avisa quando a sessao entra ou expira, para o painel reagir sozinho.
export function aoMudarSessao(callback) {
  if (!temSupabase) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_evento, sessao) => callback(sessao))
  return () => data.subscription.unsubscribe()
}
