import { DESENHOS as D } from '../data/desenhos.js'

// Cercadura de limões, no espírito da capa do cardápio de bolos: uma fileira
// de ramos que sangra pela borda da faixa, como se o desenho continuasse para
// fora da página.
//
// Só ramos. A rodela e o gomo ficaram de fora porque, soltos entre os galhos,
// um atravessava o outro e a fileira perdia a leitura.
//
// Cada peça diz o desenho, a largura em pixels, quanto gira, quanto sobe (y
// negativo sobe, e é o que faz a peça ser cortada pela borda) e se entra
// espelhada. A ordem é a da esquerda para a direita.
//
// As medidas valem para o desktop: na tela do celular a variável
// --escala-cerca encolhe a fileira inteira, para caber mais ramo e manter o
// traço nítido em vez de esticar poucas peças gigantes.
const PECAS = [
  { src: D.ramoLargo, w: 238, rot: -12, y: -58, espelho: true },
  { src: D.ramoAlto, w: 152, rot: 16, y: -78 },
  { src: D.ramoCurto, w: 210, rot: 5, y: -44 },
  { src: D.ramoLargo, w: 226, rot: 9, y: -56 },
  { src: D.ramoAlto, w: 158, rot: -15, y: -74, espelho: true },
  { src: D.ramoCurto, w: 218, rot: -5, y: -40, espelho: true },
  { src: D.ramoLargo, w: 244, rot: -8, y: -62 },
  { src: D.ramoAlto, w: 148, rot: 14, y: -76, espelho: true },
  { src: D.ramoCurto, w: 206, rot: 7, y: -42 },
  { src: D.ramoLargo, w: 232, rot: 11, y: -54, espelho: true },
  { src: D.ramoAlto, w: 154, rot: -17, y: -80 },
  { src: D.ramoCurto, w: 214, rot: -4, y: -46 }
]

// Quanto de cada PNG é fundo transparente nas laterais, medido no arquivo e
// guardado como fração da largura. Sem isso o espaçamento seria calculado
// pela caixa da imagem, que é maior que o traço: uns pares ficariam com um
// vão à toa e outros com um ramo passando por cima do vizinho.
const FOLGA = {
  [D.ramoLargo]: { esq: 0.052, dir: 0.073 },
  [D.ramoAlto]: { esq: 0.041, dir: 0.059 },
  [D.ramoCurto]: { esq: 0.059, dir: 0.011 }
}

// Distância que deve sobrar entre o traço de um ramo e o do vizinho. É o
// número a mexer para abrir ou fechar a fileira: subir afasta os ramos,
// descer aproxima, e no negativo eles voltam a se cruzar.
const RESPIRO = 2

// Fundo transparente de um lado da peça, em pixels. Peça espelhada troca a
// folga da esquerda com a da direita.
function vazioLateral(peca, lado) {
  const folga = FOLGA[peca.src]
  const real = peca.espelho ? (lado === 'esq' ? folga.dir : folga.esq) : folga[lado]
  return real * peca.w
}

// Encosta a peça no vizinho pelo desenho, não pela caixa: desconta o fundo
// transparente dos dois lados e deixa o respiro no meio.
function margemAntes(i) {
  if (i === 0) return 0
  const vazio = vazioLateral(PECAS[i - 1], 'dir') + vazioLateral(PECAS[i], 'esq')
  return Math.round(RESPIRO - vazio)
}

// lado: 'topo' encosta a fileira no alto da faixa; 'base' é a mesma faixa
// virada de cabeça para baixo, para fechar a página como a contracapa.
export default function Cercadura({ lado = 'topo' }) {
  return (
    <div className={`cercadura cercadura-${lado}`} aria-hidden="true">
      <div className="cercadura-fila">
        {PECAS.map((p, i) => (
          <img
            key={i}
            className="desenho cercadura-peca"
            src={p.src}
            alt=""
            style={{
              width: `calc(${p.w}px * var(--escala-cerca))`,
              marginLeft: `calc(${margemAntes(i)}px * var(--escala-cerca))`,
              transform: `translateY(calc(${p.y}px * var(--escala-cerca))) rotate(${p.rot}deg)${
                p.espelho ? ' scaleX(-1)' : ''
              }`
            }}
          />
        ))}
      </div>
    </div>
  )
}
