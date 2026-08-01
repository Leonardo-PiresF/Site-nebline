// Bairros atendidos e taxa de entrega, em reais.
// VALORES PROVISORIOS: feche a tabela com a Nebline antes de publicar.
// Para tirar um bairro do ar, basta apagar a linha.

export const BAIRROS = [
  { id: 'cambui', nome: 'Cambuí', taxa: 8, prazo: '30 a 45 min' },
  { id: 'centro', nome: 'Centro', taxa: 10, prazo: '35 a 50 min' },
  { id: 'bosque', nome: 'Bosque', taxa: 10, prazo: '35 a 50 min' },
  { id: 'guanabara', nome: 'Jardim Guanabara', taxa: 10, prazo: '35 a 50 min' },
  { id: 'botafogo', nome: 'Botafogo', taxa: 10, prazo: '35 a 50 min' },
  { id: 'vila-itapura', nome: 'Vila Itapura', taxa: 10, prazo: '35 a 50 min' },
  { id: 'taquaral', nome: 'Taquaral', taxa: 14, prazo: '45 a 60 min' },
  { id: 'nova-campinas', nome: 'Nova Campinas', taxa: 14, prazo: '45 a 60 min' },
  { id: 'chapadao', nome: 'Jardim Chapadão', taxa: 14, prazo: '45 a 60 min' },
  { id: 'proenca', nome: 'Vila Proença', taxa: 14, prazo: '45 a 60 min' },
  { id: 'mansoes-sto-antonio', nome: 'Mansões Santo Antônio', taxa: 18, prazo: '50 a 70 min' },
  { id: 'barao-geraldo', nome: 'Barão Geraldo', taxa: 22, prazo: '60 a 80 min' }
]

export const RETIRADA = {
  id: 'retirada',
  nome: 'Retirar na loja',
  taxa: 0,
  prazo: 'Pronto em cerca de 20 min'
}
