// ---------------------------------------------------------------
// DESENHOS
// ---------------------------------------------------------------
// Traços no estilo dos cardápios impressos da Nebline, enviados pela
// cliente. Entram como decoração, nunca como foto de produto: todo uso
// é aria-hidden, com alt vazio, e nenhum deles carrega informação que
// o texto ao lado já não diga.
//
// Os arquivos são WebP de fundo transparente, gerados a partir dos PNG
// originais (que continuam na pasta) no tamanho em que aparecem na tela:
// 1,4 MB de PNG viraram 274 KB, e a decoração deixou de pesar mais que
// as fotos dos doces. Para trocar um desenho, ponha o PNG novo na pasta
// e gere o WebP no lugar do antigo.
//
// Os limões vêm com o miolo branco, então na tela eles aparecem com
// mix-blend-mode: multiply, que apaga o branco contra o papel e deixa
// só o traço.

export const DESENHOS = {
  // Ramos de limão, do mais largo ao mais estreito.
  ramoLargo: '/fotos/desenhos/limoes-2.webp',
  ramoAlto: '/fotos/desenhos/limoes-3.webp',
  ramoCurto: '/fotos/desenhos/limoes-1.webp',
  // Limão cortado: a rodela fecha seção, o gomo é o menor de todos.
  rodela: '/fotos/desenhos/limao-rodela.webp',
  gomo: '/fotos/desenhos/limao-gomo.webp',
  // Menino levando um bolo de presente, com o cachorro na coleira.
  meninoBolo: '/fotos/desenhos/menino-bolo.webp'
}

// Fora de uso por enquanto:
// - limoes-4.png ... mesma composição do ramoLargo, com 2 MB e um halo
//   branco em volta do traço, que aparece contra o papel do site.
