# Nebline Confeitaria, loja virtual

Loja com catálogo, comanda, encomendas sob agenda e painel de pedidos.
Sem gateway de pagamento: o pagamento é Pix manual, combinado no WhatsApp.

React + Vite + Supabase. Deploy pensado para a Vercel.

## Rodar

```bash
npm install
cp .env.example .env
npm run dev
```

Loja: `http://localhost:5173`
Painel: `http://localhost:5173/#/admin` (senha padrão `nebline`)

Sem as variáveis do Supabase, o sistema entra em **modo demonstração**: os pedidos
e a disponibilidade ficam no `localStorage` do navegador. Serve para mostrar para a
cliente, não para operar.

## Ligar o banco e publicar

Passo a passo completo em **[DEPLOY.md](DEPLOY.md)**, do projeto vazio no Supabase até o link
na Vercel.

Resumo: criar projeto no Supabase, rodar `supabase/schema.sql` no SQL Editor, criar o usuário da
equipe em Authentication, e preencher `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

## Estrutura das telas

**Home** (`src/pages/Home.jsx`): história da casa, horários, os queridinhos da vitrine, chamada
para o cardápio e para as encomendas, endereço e links para mapa e Instagram. O texto foi escrito
a partir de material público sobre a confeitaria, então **peça para a cliente ler e corrigir**
antes de publicar. É o arquivo mais fácil de editar do projeto, é tudo texto no topo do arquivo.

**Cardápio**, **Encomendas** e **Comanda**: as três telas do fluxo de pedido. A comanda é uma
tela própria, não uma barra lateral. No desktop chega-se a ela pelo botão no canto do cabeçalho,
que mostra a quantidade e o total; no celular, pela barra de abas.

Cada seção é uma tela inteira, com barra de abas fixa embaixo no celular
(`src/components/BarraApp.jsx`), como um aplicativo.
Há um `manifest.webmanifest`, então dá para adicionar à tela de início do celular e abrir sem
barra de navegador. Vale sugerir isso para a cliente divulgar no Instagram.

## Como o fluxo funciona

**Pedido normal**
Cliente monta a comanda, escolhe entrega ou retirada, preenche os dados.
Ao fechar, o pedido é gravado no banco e abre o WhatsApp da loja com a mensagem
já formatada como nota, com código, valor unitário, subtotal, taxa do bairro e total.

**Encomenda**
Fluxo separado, porque encomenda é agenda e não estoque. O cliente escolhe o produto,
o tamanho, massa e recheio quando for bolo festivo, escrita, data e horário.
O sistema bloqueia datas dentro da antecedência mínima (72h para bolo festivo,
48h para torta inteira, 24h para kit, configurável em `src/lib/config.js`).
A nota inclui o sinal de 50%, que é o que reserva a data.

**Painel**
Abas de Pedidos e Encomendas, separadas. Cada card mostra tudo que a produção precisa.
Aceitar dispara a mensagem de confirmação com a chave Pix. Recusar pede um motivo,
com três motivos prontos, e envia junto. A aba Disponibilidade liga e desliga qualquer
item do cardápio na hora, para quando acabar a torta do dia.

## Sobre as fotos

Tudo passa por `src/data/fotos.js`.

**Hero e seção "sobre"**: já são fotos reais, enviadas pela cliente, em `public/fotos/`.

**Fotos dos produtos**: ainda provisórias. Vêm do Unsplash, são fotos de confeitaria de verdade
(bolo, cheesecake, croissant, café), agrupadas por tipo para não cair foto de café da manhã em
uma torta, e cada item mantém sempre a mesma foto. Mas **não são os doces da Nebline** e precisam
sair antes de ir ao ar. A vitrine avisa isso em uma linha, para ninguém se confundir na demo.

Para trocar, coloque os arquivos em `public/fotos/` e preencha `FOTOS_REAIS`, usando o id do
produto que está em `src/data/catalogo.js`:

```js
export const FOTOS_REAIS = {
  'tor-chocolatuda': '/fotos/chocolatuda.jpg',
  'tor-banoffee': '/fotos/banoffee.jpg'
}
```

Item com foto real usa a real, o resto continua no banco de imagens, então dá para ir trocando aos
poucos. Se uma imagem falhar ao carregar, aparece uma placa com a inicial do item em vez de ícone
quebrado.

Sugestão comercial: foto é o que mais separa uma loja de confeitaria boa de uma amadora, e a
Nebline já tem bastante material no Instagram. Vale combinar uma tarde de fotos da vitrine como
item à parte do orçamento, ou pedir autorização para usar o que já existe no perfil.

## O que precisa ser confirmado com a cliente

Está tudo marcado com comentário no código:

- `src/data/entrega.js`: os bairros e as taxas são **provisórios**, precisam da tabela real.
- `src/data/catalogo.js`, bloco `ENCOMENDAS`: os preços de bolo festivo, torta inteira e kit
  são **provisórios**. O cardápio manda consultar a equipe, então não há valor público.
- `src/lib/config.js`: chave Pix, número que recebe os pedidos e pedido mínimo para entrega.
- `src/pages/Home.jsx`: os textos da home e da seção "Sobre a Nebline" foram escritos a partir de
  material público. Peça para a cliente ler e corrigir, principalmente a menção ao sócio e à
  história da casa.

## Como o envio pelo WhatsApp funciona

O sistema usa `wa.me`: um clique no botão abre a conversa com a mensagem inteira montada,
e a pessoa toca em enviar. Vale para o pedido que sai do site e para a confirmação ou recusa
que sai do painel.

Um detalhe importante de manutenção: a janela do WhatsApp **precisa abrir antes** de qualquer
`await`. Se a gravação no banco vier primeiro, o navegador perde o vínculo com o clique e o
Safari do iPhone bloqueia a aba como popup. Por isso `Loja.jsx` e `Admin.jsx` abrem a conversa
primeiro e gravam depois. Se for mexer nessa ordem, teste no iPhone.

Todo o sistema chama uma única função, `enviarWhatsApp()` em `src/lib/whatsapp.js`. Se um dia a
Nebline contratar a WhatsApp Business Cloud API e quiser envio sem clique nenhum, é só trocar o
corpo dessa função e o resto continua igual.

## Acesso ao painel

Com Supabase configurado, o login é por email e senha, via Supabase Auth, e a sessão vale entre
recarregamentos. Se expirar, o painel volta sozinho para a tela de login. O usuário é criado à mão
em Authentication, e o cadastro público fica desligado.

Sem Supabase, o painel cai numa senha local (`VITE_ADMIN_SENHA`) só para demonstrar a interface.
Isso não é segurança, é conveniência de desenvolvimento, e a tela avisa isso.

As políticas de RLS em `schema.sql` seguem a mesma lógica: visitante só cria pedido e lê a
disponibilidade; ler e alterar pedido exige login.

## Deploy na Vercel

Framework Vite, build `npm run build`, saída `dist`.
Cadastre as variáveis de ambiente no painel da Vercel antes do primeiro deploy.
