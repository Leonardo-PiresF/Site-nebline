import { linkWhatsApp } from './formato.js'

// IMPORTANTE
// Link wa.me nao envia mensagem sozinho, ele abre a conversa com o texto pronto
// e alguem precisa tocar em enviar. Envio realmente automatico so com a
// WhatsApp Business Cloud API da Meta, que exige conta business verificada e
// modelos de mensagem aprovados.
//
// Toda a loja chama SO esta funcao. Quando a Cloud API estiver contratada,
// troque o corpo dela por uma chamada a uma serverless function e o resto
// do sistema continua igual.

export async function enviarWhatsApp(numero, mensagem, { auto = false } = {}) {
  if (auto && import.meta.env.VITE_WHATSAPP_API_URL) {
    // Caminho automatico. A serverless guarda o token, nunca o front.
    const resp = await fetch(import.meta.env.VITE_WHATSAPP_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ para: numero, texto: mensagem })
    })
    if (!resp.ok) throw new Error('Falha ao enviar pela API do WhatsApp')
    return { modo: 'api' }
  }

  window.open(linkWhatsApp(numero, mensagem), '_blank', 'noopener')
  return { modo: 'link' }
}
